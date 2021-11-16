import { createDefaultOrderTypeIfNeed } from "./createDefaultOrderType";
import { createDefaultIntroIfNeed } from "./createDefaultIntro";
import { createDefaultServiceUnavailableScreensaverIfNeed } from "./createDefaultServiceUnavailableScreensaver";
import { createRootNode } from "./createRootNode";
import { deleteUnnecessaryTagsFromProducts } from "./deleteUnnecessaryTagsFromProducts";
import { mergeDefaultThemes } from "./mergeDefaultThemes";
import { mergeDefaultTranslations } from "./mergeDefaultTranslations";
import { createDefaultCurrencyFromTemplate } from "./createDefaultCurrencyFromTemplate";
import { initEnvironment } from "./initEnvironment";
import { initRefs } from "./initRefs";
import { createServerInfoIfNeed } from "./createServerInfo";
import { createDefaultWeightUnits } from "./createDefaultWeightInits";

export const initDB = async (client: string): Promise<void> => {
    // env
    await initEnvironment(client);

    // refs
    await initRefs(client);

    // create server info
    await createServerInfoIfNeed(client);

    // splash screens
    await createDefaultIntroIfNeed(client);

    // splash screens (unavailable)
    await createDefaultServiceUnavailableScreensaverIfNeed(client);

    // root node
    await createRootNode(client);

    // themes
    await mergeDefaultThemes(client);

    // translations
    await mergeDefaultTranslations(client);

    // order type
    await createDefaultOrderTypeIfNeed(client);

    // default currency
    await createDefaultCurrencyFromTemplate(client);

    // bug fix
    await deleteUnnecessaryTagsFromProducts(client);

    // weight units
    await createDefaultWeightUnits(client);

    console.info(`Refs for client "${client}" are initialized.`);
};