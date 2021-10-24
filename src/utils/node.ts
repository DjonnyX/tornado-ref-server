import { INode } from "@djonnyx/tornado-types";
import { INodeDocument, NodeModel } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IDictionary<T = any> {
    [_id: string]: T;
}

const getMapOfCollection = <T extends INodeDocument>(collection: Array<T>): IDictionary<T> => {
    const result: IDictionary<T> = {};

    collection.forEach(item => {
        result[item._id] = item;
    });

    return result;
};

const extractNodeChain = <T extends INodeDocument>(dictionary: IDictionary<T>, item: T): Array<T> => {
    let result = new Array<T>();

    if (!item) {
        return result;
    }

    item.children.forEach(id => {
        result = [...result, ...extractNodeChain<T>(dictionary, dictionary[id])];
    });

    result.push(item);

    return result;
};

const extractNodeInvokeChain = <T extends INodeDocument>(dictionary: IDictionary<T>, id: string): Array<T> => {
    let result = new Array<T>();

    const entity = dictionary[id];

    if (!!entity) {
        result.push(entity);
        if (!!entity.parentId) {
            result = [...result, ...extractNodeInvokeChain(dictionary, entity.parentId)];
        }
    }

    return result;
};

/**
 * Возвращает список всех дочерних нодов.
 * Сбор нодов происходит от последних элементов в цепи.
 */
export const getNodesChain = async (client: string, id: string): Promise<Array<INodeDocument>> => {
    if (id === undefined) {
        return [];
    }

    let items: Array<INodeDocument>;
    try {
        items = await NodeModel.find({ client });
    } catch (err) {
        throw Error(`Could not find nodes. ${err}`);
    }

    const dictionary = getMapOfCollection(items);

    const rootChainNode = dictionary[id];
    const result = extractNodeChain(dictionary, rootChainNode);

    return result;
};

/**
 * Возвращает список id's удаленных нодов (с учетом детей).
 * Удаление происходит от последних элементов в цепи, тем самым,
 * если в процессе возникнет exception, то "открепленных" от цепи нодов не образуется!
 */
export const deleteNodesChain = async (client: string, id: string): Promise<Array<string>> => {
    const nodes = await getNodesChain(client, id);

    const ids = nodes.map(item => item.id);

    try {
        await NodeModel.deleteMany({ _id: ids });
    } catch (err) {
        throw Error(`Could not deleted nod with id. ${err}`);
    }

    return ids;
};

export const checkOnRecursion = async (client: string, id: string, contentId: string): Promise<boolean> => {
    let items: Array<INodeDocument>;
    try {
        items = await NodeModel.find({ client });
    } catch (err) {
        throw Error(`Could not find nodes. ${err}`);
    }

    const dictionary = getMapOfCollection(items);

    const nodeChain = extractNodeInvokeChain(dictionary, id);

    return !!nodeChain.find(item => item._id == contentId);
};

export const formatModel = (model: INodeDocument): INode => ({
    id: model._id,
    active: model.active,
    type: model.type,
    parentId: model.parentId,
    contentId: model.contentId,
    children: model.children || [],
    scenarios: model.scenarios.map(scenario => {
        return {
            active: scenario.active,
            lock: scenario.lock,
            action: scenario.action,
            value: scenario.value,
            extra: scenario.extra,
        }
    }) || [],
    extra: model.extra,
});