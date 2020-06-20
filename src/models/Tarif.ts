import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITarif extends Document {
    name: string;
    description?: string;
    price: number;
}

const TarifSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: [{ type: Number, required: true }]
});

const TarifModel = mongoose.model<ITarif>("Tarif", TarifSchema);

export { TarifModel, ITarif };
