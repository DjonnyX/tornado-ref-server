import { IVisualEntityContentsItem } from "./IVisualEntityContentsItem";

export interface IVisualEntityContents {
    [lang: string]: IVisualEntityContentsItem | any;
}