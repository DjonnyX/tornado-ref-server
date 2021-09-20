import { QueryWithHelpers } from "mongoose";

const FILTER_PATTERN = /([\w.])*\.(equals|contain|notequals|lt|gt){1,}$/;
const NUM_PATTERN = /^([0-9])+$/;

export function findAllWithFilter<T, D, Q>(document: QueryWithHelpers<Array<T>, any, any>, request: {
    query: any,
}): QueryWithHelpers<Array<T>, any, any> {
    let result = document;
    const notEqualsMap: {
        [id: string]: Array<any>;
    } = {};
    for (const pName in request.query) {
        const pFilterSegments = pName.match(FILTER_PATTERN);
        if (pFilterSegments && pFilterSegments.length > 0) {
            const id = pName.substring(0, pName.lastIndexOf('.'));
            const operation = pName.substr(pName.lastIndexOf('.') + 1);
            const value = request.query[pName];

            if (operation === 'equals') {
                if (NUM_PATTERN.test(value)) {
                    result = result.where(id).equals(Number.parseInt(value));
                } else {
                    result = result.where(id).equals(value);
                }
            } else if (operation === 'contain') {
                // etc
            } else if (operation === 'notequals') {
                const actualValue = value.split(",");
                if (!notEqualsMap[id]) {
                    notEqualsMap[id] = [...actualValue.map(v => {
                        if (NUM_PATTERN.test(v)) {
                            return Number.parseInt(v);
                        }
                        return v;
                    })];
                }
            } else if (operation === 'lt') {
                result = result.where(id).lt(value);
            } else if (operation === 'gt') {
                result = result.where(id).gt(value);
            }
        }
    }
    for (const id in notEqualsMap) {
        const value = notEqualsMap[id];
        result = result.where(id, { $nin: value });
    }
    return result;
}