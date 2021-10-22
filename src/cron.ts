import { CronJob } from "cron";
import { TerminalStatusTypes } from "@djonnyx/tornado-types";
import { ITerminalDocument, TerminalModel } from "./models";

const terminalsStatusJob = new CronJob('0-59/2 0-23 * * *', async () => {
    let terminals: Array<ITerminalDocument>;
    try {
        terminals = await TerminalModel.find();
    } catch (err) {
        console.warn("Found terminal error on \"terminalsStatusJob\".");
    }

    const promises = new Array<Promise<ITerminalDocument>>();
    try {
        for (const terminal of terminals) {
            if (terminal.lastwork?.getTime() + 60000 < new Date().getTime()) {
                terminal.status = TerminalStatusTypes.UNAVAILABLE;
                promises.push(terminal.save());
            }
        }
    } catch (err) {
        console.warn("\"TerminalsStatusJob is failed.\".");
    }

    await Promise.all(promises);
});

export const run = () => {
    if (!terminalsStatusJob.running) {
        terminalsStatusJob.start();
    }
}