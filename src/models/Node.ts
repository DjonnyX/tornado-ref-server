import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { NodeTypes } from "./enums";

interface INode extends Document {
    /**
     * Тип нода
     */
    type: NodeTypes;
    /**
     * Идентификатор родительского нода
     */
    parentId: string;
    /**
     * Идентификатор Selector или Product
     */
    contentId: string;
    /**
     * Список дочерних нодов
     */
    children: Array<string>;
}

const NodeSchema = new Schema({
    type: {
        type: String, enum: [
            NodeTypes.SELECTOR,
            NodeTypes.PRODUCT,
            NodeTypes.KIOSK_ROOT,
            NodeTypes.SELECTOR_JOINT,
            NodeTypes.PRODUCT_JOINT,
            NodeTypes.SELECTOR_NODE
        ], required: true
    },
    parentId: { type: Schema.Types.ObjectId },
    contentId: { type: Schema.Types.ObjectId },
    children: [{ type: Schema.Types.ObjectId }],
});

const NodeModel = mongoose.model<INode>("Node", NodeSchema);

export { NodeModel, INode };
