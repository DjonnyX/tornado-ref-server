import { TerminalTypes } from "@djonnyx/tornado-types";
import { THEMES_EQ_TEMPLATE_PATH, THEMES_KIOSK_TEMPLATE_PATH, THEMES_ORDER_PICKER_TEMPLATE_PATH } from "../config";
import { mergeDefaultTheme } from "./mergeDefaultTheme";

export const mergeDefaultThemes = async (client: string) => {
    try {
        await mergeDefaultTheme(client, THEMES_KIOSK_TEMPLATE_PATH, TerminalTypes.KIOSK);
    } catch (err) {
        console.error(err);
    }

    try {
        await mergeDefaultTheme(client, THEMES_ORDER_PICKER_TEMPLATE_PATH, TerminalTypes.ORDER_PICKER);
    } catch (err) {
        console.error(err);
    }

    try {
        await mergeDefaultTheme(client, THEMES_EQ_TEMPLATE_PATH, TerminalTypes.EQUEUE);
    } catch (err) {
        console.error(err);
    }
};