import { IAppTheme } from '@djonnyx/tornado-types';
import * as Color from "color";

export enum ThemeDescriptiorKeyTypes {
    STRING,
    BOOL,
    NUMBER,
    ARRAY_PROP,
    COLOR,
    GRADIENT_COLOR,
    ASSET,
}

export interface IThemeDescriptorValue {
    value: string;
    type: ThemeDescriptiorKeyTypes,
}

interface IThemeDescriptorOutputData {
    prop: string;
    value: IThemeDescriptorValue,
}

export interface IThemeDescriptior {
    [key: string]: IThemeDescriptorValue;
}

export interface ICompiledTheme {
    theme: IAppTheme,
    descriptor: IThemeDescriptior,
}

const ASSET_PATTERN = /(\.backgroundImage)$/;

const COLOR_PATTERN = /(color|Color)/;

const NUMBER_PATTERN = /(fontSize|FontSize)/;

const isAsset = (prop: string): boolean => {
    return ASSET_PATTERN.test(prop);
}

const isColor = (prop: string): boolean => {
    return COLOR_PATTERN.test(prop);
}

const isNumber = (prop: string): boolean => {
    return NUMBER_PATTERN.test(prop);
}

type TOutputData = string | IThemeDescriptorOutputData | any;

const compileThemeDescriptorProp = (data: any, lastProp?: string, result: IThemeDescriptior = {}): TOutputData | undefined => {
    if (isAsset(lastProp)) {
        const type = ThemeDescriptiorKeyTypes.ASSET;
        return {
            prop: lastProp,
            value: {
                value: data,
                type,
            },
        };
    } else if (typeof data === "boolean") {
        return {
            prop: lastProp,
            value: {
                value: data,
                type: ThemeDescriptiorKeyTypes.BOOL,
            },
        };
    } else if (typeof data === "string") {
        let type: ThemeDescriptiorKeyTypes;
        if (isColor(lastProp)) {
            type = ThemeDescriptiorKeyTypes.COLOR;
            if (data === "none") {
                data = "transparent";
            }

            data = Color(data).string(8);
        } else if (isNumber(lastProp)) {
            type = ThemeDescriptiorKeyTypes.NUMBER;
            data = Number(data);
        } else {
            type = ThemeDescriptiorKeyTypes.STRING;
        }
        return {
            prop: lastProp,
            value: {
                value: data,
                type,
            },
        };
    } else if (typeof data === "number") {
        return {
            prop: lastProp,
            value: {
                value: data,
                type: ThemeDescriptiorKeyTypes.NUMBER,
            },
        };
    } else if (data instanceof Array) {
        let type: ThemeDescriptiorKeyTypes;
        if (COLOR_PATTERN.test(lastProp)) {
            type = ThemeDescriptiorKeyTypes.GRADIENT_COLOR;
            data = data.map(c => Color(c).string(8));
        } else {
            type = ThemeDescriptiorKeyTypes.ARRAY_PROP;
        }
        return {
            prop: lastProp,
            value: {
                value: data,
                type,
            },
        };
    }

    for (const propName in data) {
        const subData = data[propName];
        const outputData = compileThemeDescriptorProp(subData, !!lastProp ? `${lastProp}.${propName}` : propName, result);

        if (outputData?.value?.type === ThemeDescriptiorKeyTypes.ASSET
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.GRADIENT_COLOR
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.COLOR
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.NUMBER
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.STRING
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.BOOL
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.ARRAY_PROP) {
            result[outputData.prop] = outputData.value;
        }
    }
}

export const getThemeDescriptor = (theme: IAppTheme) => {
    const descriptor: IThemeDescriptior = {};
    compileThemeDescriptorProp(theme.data, undefined, descriptor);
    return descriptor;
}