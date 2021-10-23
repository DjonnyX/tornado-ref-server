import { IServerInfoDocument, ServerInfoModel } from "../models";

export const createServerInfoIfNeed = async (client: string): Promise<IServerInfoDocument> => {
    try {
        const existsServerInfo = await ServerInfoModel.findOne({ client });
        if (!!existsServerInfo) {
            return existsServerInfo;
        }

        const serverInfo = new ServerInfoModel({
            client,
            backup: {
                name: null,
                size: 0,
                lastCreate: null,
            }
        });
        await serverInfo.save();
        return serverInfo;
    } catch (err) {
        console.error(`Error in creating ServerInfo. ${err}`);
    }
}