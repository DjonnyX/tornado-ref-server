/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RefsController } from './controllers/RefsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RefController } from './controllers/RefsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AssetsController } from './controllers/AssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdsController } from './controllers/AdController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdController } from './controllers/AdController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdAssetsController } from './controllers/AdAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SignupController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SigninController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SignoutController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResetPasswordController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ForgotPasswordController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VerifyResetPasswordTokenController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BusinessPeriodsController } from './controllers/BusinessPeriodsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BusinessPeriodController } from './controllers/BusinessPeriodsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrenciesController } from './controllers/CurrencyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrencyController } from './controllers/CurrencyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguagesController } from './controllers/LanguagesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguageController } from './controllers/LanguagesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguageAssetsController } from './controllers/LanguageAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RootNodesController } from './controllers/NodeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NodesController } from './controllers/NodeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NodeController } from './controllers/NodeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrderTypesController } from './controllers/OrderTypesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrderTypeController } from './controllers/OrderTypesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrderTypeAssetsController } from './controllers/OrderTypesAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductsController } from './controllers/ProductsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductController } from './controllers/ProductsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductAssetsController } from './controllers/ProductAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SelectorsController } from './controllers/SelectorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SelectorController } from './controllers/SelectorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SelectorAssetsController } from './controllers/SelectorAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoresController } from './controllers/StoresController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreController } from './controllers/StoresController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TagsController } from './controllers/TagsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TagController } from './controllers/TagsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TagAssetsController } from './controllers/TagsAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TerminalsController } from './controllers/TerminalController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TerminalController } from './controllers/TerminalController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TranslationsController } from './controllers/TranslationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TranslationController } from './controllers/TranslationController';
import { expressAuthentication } from './authentication';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IRefItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "version": { "dataType": "double", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefsResponse": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "IRefItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefResponse": {
        "dataType": "refObject",
        "properties": {
            "data": { "ref": "IRefItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAssetMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AssetExtensions": {
        "dataType": "refEnum",
        "enums": [".jpg", ".png", ".mp4", ".fbx", ".obj", ".dae"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAssetItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IAssetMeta" },
            "data": { "dataType": "array", "array": { "ref": "IAssetItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdsMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdTypes": {
        "dataType": "refEnum",
        "enums": ["intro", "banner"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "color": { "dataType": "string" },
            "duration": { "dataType": "double", "required": true },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "ref": "IAdContentsItem" }, { "dataType": "any" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string" },
            "type": { "ref": "AdTypes", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "contents": { "ref": "IAdContents", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IAdsMeta" },
            "data": { "dataType": "array", "array": { "ref": "IAdItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IAdsMeta" },
            "data": { "ref": "IAdItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "type": { "ref": "AdTypes", "required": true },
            "contents": { "ref": "IAdContents" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "name": { "dataType": "string" },
            "type": { "ref": "AdTypes" },
            "contents": { "ref": "IAdContents" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdAsset": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "array", "array": { "ref": "IAdAsset" } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "array", "array": { "ref": "IAdAsset" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "ad": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ad": { "ref": "IAdItem", "required": true }, "asset": { "ref": "IAdAsset", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdImageTypes": {
        "dataType": "refEnum",
        "enums": ["main"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "ad": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignupResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "clientId": { "dataType": "string", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISignupParams": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "confirmPassword": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SigninResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true }, "lastName": { "dataType": "string", "required": true }, "firstName": { "dataType": "string", "required": true }, "token": { "dataType": "string", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISigninParams": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignoutResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResetPasswordParams": {
        "dataType": "refObject",
        "properties": {
            "token": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ForgotPasswordResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IForgotPasswordParams": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VerifyResetPasswordTokenResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifyResetPasswordTokenParams": {
        "dataType": "refObject",
        "properties": {
            "token": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "ref": "IBusinessPeriodContentsItem" }, { "dataType": "any" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISchedule": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "time": { "dataType": "nestedObjectLiteral", "nestedProperties": { "end": { "dataType": "double" }, "start": { "dataType": "double", "required": true } } },
            "weekDays": { "dataType": "array", "array": { "dataType": "double" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string" },
            "active": { "dataType": "boolean", "required": true },
            "contents": { "ref": "IBusinessPeriodContents", "required": true },
            "schedule": { "dataType": "array", "array": { "ref": "ISchedule" }, "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IBusinessPeriodMeta" },
            "data": { "dataType": "array", "array": { "ref": "IBusinessPeriodItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IBusinessPeriodMeta" },
            "data": { "ref": "IBusinessPeriodItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "contents": { "ref": "IBusinessPeriodContents" },
            "schedule": { "dataType": "array", "array": { "ref": "ISchedule" }, "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "isDefault": { "dataType": "boolean", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "symbol": { "dataType": "string", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrenciesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ICurrencyMeta" },
            "data": { "dataType": "array", "array": { "ref": "ICurrencyItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ICurrencyMeta" },
            "data": { "ref": "ICurrencyItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "isDefault": { "dataType": "boolean", "required": true },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "symbol": { "dataType": "string", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "isDefault": { "dataType": "boolean", "required": true },
            "code": { "dataType": "string" },
            "name": { "dataType": "string" },
            "symbol": { "dataType": "string" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "isDefault": { "dataType": "boolean" },
            "active": { "dataType": "boolean", "required": true },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } } },
            "translation": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguagesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "LanguageMeta" },
            "data": { "dataType": "array", "array": { "ref": "ILanguageItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "LanguageMeta" },
            "data": { "ref": "ILanguageItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "isDefault": { "dataType": "boolean" },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } } },
            "translation": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "isDefault": { "dataType": "boolean" },
            "code": { "dataType": "string" },
            "name": { "dataType": "string" },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } } },
            "translation": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageAsset": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "array", "array": { "ref": "ILanguageAsset" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "language": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "language": { "ref": "ILanguageItem", "required": true }, "asset": { "ref": "ILanguageAsset", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageImageTypes": {
        "dataType": "refEnum",
        "enums": ["main"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageUpdateAssetsRequest": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "language": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodesMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NodeTypes": {
        "dataType": "refEnum",
        "enums": ["kiosk-root", "kiosk-presets-root", "selector", "product", "product-joint", "selector-joint", "selector-node"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioIntroActionTypes": {
        "dataType": "refEnum",
        "enums": ["duration"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioCommonActionTypes": {
        "dataType": "refEnum",
        "enums": ["visible-by-store", "visible-by-business-period"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioProductActionTypes": {
        "dataType": "refEnum",
        "enums": ["up-limit", "down-limit", "additional-price", "fixed-price"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioSelectorActionTypes": {
        "dataType": "refEnum",
        "enums": ["max-usage", "default-products"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioProgrammActionTypes": {
        "dataType": "refEnum",
        "enums": ["switch", "expression"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioEntityTypes": {
        "dataType": "refEnum",
        "enums": ["business-period", "product", "selector", "order-type", "currency"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPropertyAccessor": {
        "dataType": "refObject",
        "properties": {
            "entity": { "ref": "ScenarioEntityTypes", "required": true },
            "prop": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProgramOperations": {
        "dataType": "refEnum",
        "enums": ["or", "xor", "and"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioExpression": {
        "dataType": "refObject",
        "properties": {
            "prop1": { "ref": "IPropertyAccessor", "required": true },
            "prop2": { "ref": "IPropertyAccessor", "required": true },
            "operation": { "ref": "ProgramOperations", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioPriceValue": {
        "dataType": "refObject",
        "properties": {
            "currency": { "dataType": "string", "required": true },
            "value": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenario": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "action": { "dataType": "union", "subSchemas": [{ "ref": "ScenarioIntroActionTypes" }, { "ref": "ScenarioCommonActionTypes" }, { "ref": "ScenarioProductActionTypes" }, { "ref": "ScenarioSelectorActionTypes" }, { "ref": "ScenarioProgrammActionTypes" }], "required": true },
            "value": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "string" }, { "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "array", "array": { "dataType": "double" } }, { "dataType": "array", "array": { "ref": "IScenarioExpression" } }, { "ref": "IScenarioPriceValue" }, { "ref": "IScenarioSwitch" }, { "dataType": "enum", "enums": [null] }] },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioSwitch": {
        "dataType": "refObject",
        "properties": {
            "condition": { "dataType": "array", "array": { "ref": "IScenarioExpression" }, "required": true },
            "expressionPositive": { "ref": "IScenario", "required": true },
            "expressionNegative": { "ref": "IScenario", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "type": { "ref": "NodeTypes", "required": true },
            "parentId": { "dataType": "string", "required": true },
            "contentId": { "dataType": "string", "required": true },
            "children": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "scenarios": { "dataType": "array", "array": { "ref": "IScenario" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "INodesMeta" },
            "data": { "dataType": "array", "array": { "ref": "INodeItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "INodesMeta" },
            "data": { "ref": "INodeItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateNodeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "INodesMeta" },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "created": { "ref": "INodeItem", "required": true }, "changed": { "ref": "INodeItem", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "type": { "ref": "NodeTypes", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "parentId": { "dataType": "string", "required": true },
            "contentId": { "dataType": "string", "required": true },
            "children": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "scenarios": { "dataType": "array", "array": { "ref": "IScenario" }, "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "type": { "ref": "NodeTypes", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "parentId": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "contentId": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "children": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "scenarios": { "dataType": "array", "array": { "ref": "IScenario" }, "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDeleteNodeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "INodesMeta" },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "deleted": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "changed": { "ref": "INodeItem", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "color": { "dataType": "string" },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "icon": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "ref": "IOrderTypeContentsItem" }, { "dataType": "any" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "contents": { "ref": "IOrderTypeContents", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IOrderTypeMeta" },
            "data": { "dataType": "array", "array": { "ref": "IOrderTypeItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IOrderTypeMeta" },
            "data": { "ref": "IOrderTypeItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypeCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "isDefault": { "dataType": "boolean" },
            "contents": { "ref": "IOrderTypeContents" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeAsset": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "array", "array": { "ref": "IOrderTypeAsset" } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "array", "array": { "ref": "IOrderTypeAsset" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "orderType": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "orderType": { "ref": "IOrderTypeItem", "required": true }, "asset": { "ref": "IOrderTypeAsset", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypeImageTypes": {
        "dataType": "refEnum",
        "enums": ["main", "icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "orderType": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductsMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "color": { "dataType": "string" },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "icon": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "gallery": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "ref": "IProductContentsItem" }, { "dataType": "any" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPrice": {
        "dataType": "refObject",
        "properties": {
            "value": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReceiptItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "calories": { "dataType": "double", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string" },
            "active": { "dataType": "boolean", "required": true },
            "contents": { "ref": "IProductContents", "required": true },
            "prices": { "dataType": "array", "array": { "ref": "IPrice" }, "required": true },
            "receipt": { "dataType": "array", "array": { "ref": "IReceiptItem" }, "required": true },
            "tags": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "joint": { "dataType": "string" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IProductsMeta" },
            "data": { "dataType": "array", "array": { "ref": "IProductItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IProductsMeta" },
            "data": { "ref": "IProductItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "contents": { "ref": "IProductContents" },
            "prices": { "dataType": "array", "array": { "ref": "IPrice" }, "required": true },
            "receipt": { "dataType": "array", "array": { "ref": "IReceiptItem" }, "required": true },
            "tags": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "joint": { "dataType": "string" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "name": { "dataType": "string" },
            "contents": { "ref": "IProductContents" },
            "prices": { "dataType": "array", "array": { "ref": "IPrice" } },
            "receipt": { "dataType": "array", "array": { "ref": "IReceiptItem" } },
            "tags": { "dataType": "array", "array": { "dataType": "string" } },
            "joint": { "dataType": "string" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductAsset": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "array", "array": { "ref": "IProductAsset" } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "array", "array": { "ref": "IProductAsset" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "product": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "product": { "ref": "IProductItem", "required": true }, "asset": { "ref": "IProductAsset", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductImageTypes": {
        "dataType": "refEnum",
        "enums": ["main", "icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "product": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorsMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectorTypes": {
        "dataType": "refEnum",
        "enums": ["menu-category", "schema-category"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "color": { "dataType": "string" },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "icon": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "ref": "ISelectorContentsItem" }, { "dataType": "any" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string" },
            "type": { "ref": "SelectorTypes", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "contents": { "ref": "ISelectorContents", "required": true },
            "joint": { "dataType": "string", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ISelectorsMeta" },
            "data": { "dataType": "array", "array": { "ref": "ISelectorItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ISelectorsMeta" },
            "data": { "ref": "ISelectorItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "type": { "ref": "SelectorTypes", "required": true },
            "contents": { "ref": "ISelectorContents" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "name": { "dataType": "string" },
            "type": { "ref": "SelectorTypes" },
            "contents": { "ref": "ISelectorContents" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorAsset": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "array", "array": { "ref": "ISelectorAsset" } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "array", "array": { "ref": "ISelectorAsset" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "selector": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "selector": { "ref": "ISelectorItem", "required": true }, "asset": { "ref": "ISelectorAsset", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectorImageTypes": {
        "dataType": "refEnum",
        "enums": ["main", "icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "selector": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreItem": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "terminals": { "dataType": "array", "array": { "dataType": "string" } },
            "employes": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
            "id": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoresResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IStoreMeta" },
            "data": { "dataType": "array", "array": { "ref": "IStoreItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "IStoreMeta" },
            "data": { "ref": "IStoreItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "terminals": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }], "required": true },
            "employes": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }], "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "name": { "dataType": "string" },
            "address": { "dataType": "string" },
            "terminals": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }], "required": true },
            "employes": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }], "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "color": { "dataType": "string" },
            "resources": { "dataType": "nestedObjectLiteral", "nestedProperties": { "icon": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "main": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "required": true },
            "assets": { "dataType": "array", "array": { "dataType": "string" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "ref": "ITagContentsItem" }, { "dataType": "any" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "contents": { "ref": "ITagContents", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ITagMeta" },
            "data": { "dataType": "array", "array": { "ref": "ITagItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ITagMeta" },
            "data": { "ref": "ITagItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string" },
            "contents": { "ref": "ITagContents" },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagAsset": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "lastupdate": { "dataType": "datetime", "required": true },
            "name": { "dataType": "string", "required": true },
            "ext": { "ref": "AssetExtensions", "required": true },
            "path": { "dataType": "string", "required": true },
            "mipmap": { "dataType": "nestedObjectLiteral", "nestedProperties": { "x32": { "dataType": "string", "required": true }, "x128": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "array", "array": { "ref": "ITagAsset" } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "data": { "dataType": "array", "array": { "ref": "ITagAsset" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "tag": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "tag": { "ref": "ITagItem", "required": true }, "asset": { "ref": "ITagAsset", "required": true } } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagImageTypes": {
        "dataType": "refEnum",
        "enums": ["main", "icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "dataType": "nestedObjectLiteral", "nestedProperties": { "asset": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true }, "tag": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ref": { "ref": "IRefItem", "required": true } }, "required": true } } },
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": {} },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TerminalStatusTypes": {
        "dataType": "refEnum",
        "enums": ["online", "unavailable"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TerminalTypes": {
        "dataType": "refEnum",
        "enums": ["kiosk", "cashbox", "equeue", "emenu", "guest-screen", "menu-board", "collector"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalItem": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "TerminalStatusTypes", "required": true },
            "type": { "ref": "TerminalTypes", "required": true },
            "name": { "dataType": "string", "required": true },
            "store": { "dataType": "string", "required": true },
            "lastwork": { "dataType": "datetime", "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
            "id": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ITerminalMeta" },
            "data": { "dataType": "array", "array": { "ref": "ITerminalItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "ITerminalMeta" },
            "data": { "ref": "ITerminalItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": { "dataType": "boolean" },
            "name": { "dataType": "string" },
            "address": { "dataType": "string" },
            "terminals": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }], "required": true },
            "employes": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "string" } }, { "dataType": "enum", "enums": [null] }], "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": { "ref": "IRefItem", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslateItem": {
        "dataType": "refObject",
        "properties": {
            "key": { "dataType": "string", "required": true },
            "value": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslationItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "language": { "dataType": "string", "required": true },
            "items": { "dataType": "array", "array": { "ref": "ITranslateItem" }, "required": true },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "TranslationMeta" },
            "data": { "dataType": "array", "array": { "ref": "ITranslationItem" } },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": { "ref": "TranslationMeta" },
            "data": { "ref": "ITranslationItem" },
            "error": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "code": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslate": {
        "dataType": "refAlias",
        "type": { "dataType": "any", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "language": { "dataType": "string", "required": true },
            "items": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "ITranslate" } },
            "extra": { "dataType": "union", "subSchemas": [{ "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Express) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/api/v1/refs',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new RefsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/ref/:name',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                name: { "in": "path", "name": "name", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new RefController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AssetsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/ads',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                type: { "in": "query", "name": "type", "ref": "AdTypes" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/ad/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/ad',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "IAdCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/ad/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IAdUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/ad/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/ad/:adId/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                adId: { "in": "path", "name": "adId", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/ad/:adId/assets/:langCode',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                adId: { "in": "path", "name": "adId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/ad/:adId/resource/:langCode/:resourceType',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                adId: { "in": "path", "name": "adId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                resourceType: { "in": "path", "name": "resourceType", "required": true, "ref": "AdImageTypes" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/ad/:adId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                adId: { "in": "path", "name": "adId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IAdAssetUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/ad/:adId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                adId: { "in": "path", "name": "adId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/auth/signup',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ISignupParams" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SignupController();


            const promise = controller.signup.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/auth/signin',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ISigninParams" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SigninController();


            const promise = controller.signin.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/auth/signout',
        function(request: any, response: any, next: any) {
            const args = {
                token: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SignoutController();


            const promise = controller.signout.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/auth/reset-password',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IResetPasswordParams" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ResetPasswordController();


            const promise = controller.resetPassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/auth/forgot-password',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IForgotPasswordParams" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ForgotPasswordController();


            const promise = controller.forgotPassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/auth/verify-reset-password-token',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IVerifyResetPasswordTokenParams" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new VerifyResetPasswordTokenController();


            const promise = controller.verifyResetPasswordToken.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/business-periods',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/business-period/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/business-period',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "IBusinessPeriodCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/business-period/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IBusinessPeriodCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/business-period/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/currencies',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrenciesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/currency/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/currency',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "CurrencyCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/currency/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "CurrencyUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/currency/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/languages',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguagesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/language/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/language',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "LanguageCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/language/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "LanguageUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/language/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/language/:languageId/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                languageId: { "in": "path", "name": "languageId", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/language/:languageId/asset',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                languageId: { "in": "path", "name": "languageId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/language/:languageId/resource/:resourceType',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                languageId: { "in": "path", "name": "languageId", "required": true, "dataType": "string" },
                resourceType: { "in": "path", "name": "resourceType", "required": true, "ref": "LanguageImageTypes" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/language/:languageId/asset/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                languageId: { "in": "path", "name": "languageId", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ILanguageUpdateAssetsRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/language/:languageId/asset/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                languageId: { "in": "path", "name": "languageId", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/root-nodes',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new RootNodesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/nodes',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NodesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/nodes/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NodesController();


            const promise = controller.getAllById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/node/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/node',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "INodeCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/node/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "INodeUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/node/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/order-types',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/order-type/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/order-type',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "OrderTypeCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/order-type/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "OrderTypeCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/order-type/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/order-type/:orderTypeId/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                orderTypeId: { "in": "path", "name": "orderTypeId", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/order-type/:orderTypeId/assets/:langCode',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                orderTypeId: { "in": "path", "name": "orderTypeId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/order-type/:orderTypeId/resource/:langCode/:resourceType',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                orderTypeId: { "in": "path", "name": "orderTypeId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                resourceType: { "in": "path", "name": "resourceType", "required": true, "ref": "OrderTypeImageTypes" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/order-type/:orderTypeId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                orderTypeId: { "in": "path", "name": "orderTypeId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IOrderTypeAssetUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/order-type/:orderTypeId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                orderTypeId: { "in": "path", "name": "orderTypeId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/products',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/product/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/product',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "IProductCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/product/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IProductUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/product/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/product/:productId/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/product/:productId/assets/:langCode',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/product/:productId/asset/:langCode',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/product/:productId/resource/:langCode/:resourceType',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                resourceType: { "in": "path", "name": "resourceType", "required": true, "ref": "ProductImageTypes" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/product/:productId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IProductAssetUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/product/:productId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/selectors',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                type: { "in": "query", "name": "type", "ref": "SelectorTypes" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/selector/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/selector',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "ISelectorCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/selector/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ISelectorUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/selector/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/selector/:selectorId/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                selectorId: { "in": "path", "name": "selectorId", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/selector/:selectorId/assets/:langCode',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                selectorId: { "in": "path", "name": "selectorId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/selector/:selectorId/resource/:langCode/:resourceType',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                selectorId: { "in": "path", "name": "selectorId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                resourceType: { "in": "path", "name": "resourceType", "required": true, "ref": "SelectorImageTypes" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/selector/:selectorId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                selectorId: { "in": "path", "name": "selectorId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ISelectorAssetUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/selector/:selectorId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                selectorId: { "in": "path", "name": "selectorId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/stores',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new StoresController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/store/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/store',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "IStoreCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/store/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IStoreUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/store/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/tags',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/tag/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/tag',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "TagCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/tag/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "TagCreateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/tag/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/tag/:tagId/assets',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/tag/:tagId/assets/:langCode',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/v1/tag/:tagId/resource/:langCode/:resourceType',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                resourceType: { "in": "path", "name": "resourceType", "required": true, "ref": "TagImageTypes" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/tag/:tagId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ITagAssetUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/tag/:tagId/asset/:langCode/:assetId',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "string" },
                langCode: { "in": "path", "name": "langCode", "required": true, "dataType": "string" },
                assetId: { "in": "path", "name": "assetId", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/terminals',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/terminal/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/terminal/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ITerminalUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/api/v1/terminal/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/translations',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TranslationsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/v1/translation/:id',
        authenticateMiddleware([{ "jwt": [] }, { "apiKey": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TranslationController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/api/v1/translation/:id',
        authenticateMiddleware([{ "jwt": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "TranslationUpdateRequest" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TranslationController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, _response: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = function(user: any) {
                if (!success) {
                    success = true;
                    responded++;
                    request['user'] = user;
                    next();
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            const fail = function(error: any) {
                responded++;
                if (responded == security.length && !success) {
                    error.status = error.status || 401;
                    next(error)
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(expressAuthentication(request, name, secMethod[name]));
                    }

                    Promise.all(promises)
                        .then((users) => { succeed(users[0]); })
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        expressAuthentication(request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
                    data.pipe(response);
                } else if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
