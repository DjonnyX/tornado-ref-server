import { QueryWithHelpers } from "mongoose";

const FILTER_PATTERN = /([\w.])*\.(equals|contain|notequals|lt|gt){1,}$/;
const NUM_PATTERN = /^([0-9])+$/;

export function findAllWithFilter<T, D, Q>(document: QueryWithHelpers<Array<T>, any, any>, request: {
    query: any,
}): QueryWithHelpers<Array<T>, any, any> {
    let result = document;
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
                // etc
            } else if (operation === 'lt') {
                result = result.where(id).lt(value);
            } else if (operation === 'gt') {
                result = result.where(id).gt(value);
            }
        }
    }
    return result;
}