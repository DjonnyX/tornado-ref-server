import { IProductDocument, ISystemTagDocument, ProductModel, SystemTagModel } from "../models";

export const deleteUnnecessaryTagsFromProducts = async (client: string) => {
    let products: Array<IProductDocument>;
    try {
        products = await ProductModel.find({ client });
    } catch (err) {
        console.warn("Get products error.")
    }

    let systemTags: Array<ISystemTagDocument>;
    let systemTagsDictionary = {};
    try {
        systemTags = await SystemTagModel.find({ client });
        systemTags?.forEach(st => {
            systemTagsDictionary[String(st.id)] = st;
        });
    } catch (err) {
        console.warn("Get systemTags error.")
    }

    const promises = new Array<Promise<IProductDocument>>();
    products?.forEach(p => {
        if (!!p.systemTag && !systemTagsDictionary[p.systemTag]) {
            p.systemTag = undefined;
            promises.push(new Promise((resolve, reject) => {
                p.save().then(p => {
                    resolve(p);
                }).catch(err => {
                    reject(err);
                })
            }));
        }
    });

    if (promises.length > 0) {
        try {
            await Promise.all(promises);
        } catch (err) {
            console.warn(`Fix systemTag for product fail. Something went wrong. ${err}`);
        }
    }
}