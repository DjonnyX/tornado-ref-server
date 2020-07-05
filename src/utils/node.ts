import { INode, NodeModel } from "../models";

interface IDictionary<T = any> {
    [_id: string]: T;
}

const getMapOfCollection = <T extends INode>(collection: Array<T>): IDictionary<T> => {
    const result: IDictionary<T> = {};

    collection.forEach(item => {
        result[item._id] = item;
    });

    return result;
};

const extractNodeChain = <T extends INode>(dictionary: IDictionary<T>, item: T): Array<T> => {
    let result = new Array<T>();

    item.children.forEach(id => {
        result = [...result, ...extractNodeChain<T>(dictionary, dictionary[id])];
    });

    result.push(item);

    return result;
};

/**
 * Возвращает список всех дочерних нодов.
 * Сбор нодов происходит от последних элементов в цепи.
 */
export const getNodesChain = async (id: string): Promise<Array<INode>> => {
    let items: Array<INode>;
    try {
        items = await NodeModel.find();
    } catch (err) {
        throw Error(`Can not be found nodes. ${err}`);
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
export const deleteNodesChain = async (id: string): Promise<Array<string>> => {
    const nodes = await getNodesChain(id);

    const ids = nodes.map(item => item.id);

    try {
        await NodeModel.deleteMany({ _id: ids });
    } catch (err) {
        throw Error(`Can not be deleted not with id. ${err}`);
    }

    return ids;
};