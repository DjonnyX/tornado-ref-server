import { IEntityContentsItem } from "./IEntityContentsItem";

export interface IEntityContents {
    [lang: string]: IEntityContentsItem | any;
}