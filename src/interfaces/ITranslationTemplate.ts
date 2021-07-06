export interface ILanguageTranslation {
    isDefault?: boolean;
    code: string;
    name: string;
    preview: string;
    translations: Array<{
        [key: string]: string;
    }>;
}

export interface ITranslationTemplate {
    languages: Array<ILanguageTranslation>;
}