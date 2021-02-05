import { DocumentQuery } from "mongoose";
import { IAuthRequest } from "../interfaces";

const FILTER_PATTERN = /([\w.])*\.(equals|contain|notequals|lt|gt){1,}$/;

export function findAllWithFilter<T, D, Q>(document: DocumentQuery<T, any, Q>, request: IAuthRequest): DocumentQuery<T, any, Q> {
    let result = document;
    for (const pName in request.query) {
        const pFilterSegments = pName.match(FILTER_PATTERN);
        if (pFilterSegments && pFilterSegments.length > 0) {
            const id = pName.substring(0, pName.lastIndexOf('.'));
            const operation = pName.substr(pName.lastIndexOf('.') + 1);
            const value = request.query[pName];

            if (operation === 'equals') {
                result = result.where(id).equals(value);
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