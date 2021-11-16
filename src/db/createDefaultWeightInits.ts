import { IWeightUnit } from "@djonnyx/tornado-types";
import { IWeightUnitDocument, WeightUnitModel } from "../models";

const DEFAULT_WEIGHT_UNITS: Array<IWeightUnit> = [
    {
        systemName: "pcs",
        contents: {
            ["RU"]: {
                name: "шт",
            },
            ["ENG"]: {
                name: "pcs",
            },
        }
    },
    {
        systemName: "liters",
        contents: {
            ["RU"]: {
                name: "л",
            },
            ["ENG"]: {
                name: "l",
            },
        }
    },
    {
        systemName: "mililiters",
        contents: {
            ["RU"]: {
                name: "мл",
            },
            ["ENG"]: {
                name: "ml",
            },
        }
    },
    {
        systemName: "kilograms",
        contents: {
            ["RU"]: {
                name: "кг",
            },
            ["ENG"]: {
                name: "kg",
            },
        }
    },
    {
        systemName: "grams",
        contents: {
            ["RU"]: {
                name: "г",
            },
            ["ENG"]: {
                name: "g",
            },
        }
    }];

export const createDefaultWeightUnits = async (client: string) => {

    const weightUnits = await WeightUnitModel.find({ client });
    const weightUnitsDictionary: { [systemName: string]: IWeightUnitDocument } = {};

    for (const weightUnit of weightUnits) {
        weightUnitsDictionary[weightUnit.systemName] = weightUnit;
    }

    const promises = new Array<Promise<IWeightUnitDocument>>();
    for (const weightUnit of DEFAULT_WEIGHT_UNITS) {
        if (!weightUnitsDictionary[weightUnit.systemName]) {
            promises.push(
                new Promise(async (resolve, reject) => {
                    let weightUnitDoc: IWeightUnitDocument;
                    try {
                        weightUnitDoc = new WeightUnitModel({
                            client,
                            ...weightUnit,
                        });

                        await weightUnitDoc.save();
                    } catch (err) {
                        console.error(`Default Order Type can not be created. ${err}`);
                    }

                    resolve(weightUnitDoc);
                })
            )
        }
    }

    return Promise.all(promises);
};