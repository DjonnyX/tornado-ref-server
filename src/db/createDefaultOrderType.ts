import { ILanguageDocument, IOrderTypeDocument, LanguageModel, OrderTypeModel } from "../models";

export const createDefaultOrderTypeIfNeed = async (client: string) => {
    const orderTypes = await OrderTypeModel.find({ client });

    if (orderTypes.length > 0) {
        return;
    }

    let defaultLang: ILanguageDocument;

    try {
        defaultLang = await LanguageModel.findOne({ client, isDefault: true });
    } catch (err) {
        console.error(`Default language not found. ${err}`)
    }

    let orderType: IOrderTypeDocument;
    try {
        orderType = new OrderTypeModel({
            client,
            active: true,
            isDefault: true,
            contents: {
                [defaultLang.code]: {
                    name: "In place",
                },
            },
        });

        await orderType.save();
    } catch (err) {
        console.error(`Default Order Type can not be created. ${err}`);
    }
};