/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AccountsController } from './controllers/AccountController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AccountController } from './controllers/AccountController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BusinessPeriodsController } from './controllers/BusinessPeriodsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BusinessPeriodController } from './controllers/BusinessPeriodsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AssetsController } from './controllers/AssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdsController } from './controllers/AdController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdController } from './controllers/AdController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdAssetsController } from './controllers/AdAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApplicationsController } from './controllers/ApplicationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApplicationController } from './controllers/ApplicationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AppThemesController } from './controllers/AppThemeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AppThemeController } from './controllers/AppThemeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CaptchaController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SignupController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SigninController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResetPasswordController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ForgotPasswordController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VerifyResetPasswordTokenController } from './controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BackupController } from './controllers/BackupController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CheckuesController } from './controllers/CheckueController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CheckueController } from './controllers/CheckueController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrenciesController } from './controllers/CurrencyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrencyController } from './controllers/CurrencyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EmployeesController } from './controllers/EmployeeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EmployeeController } from './controllers/EmployeeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IntegrationsController } from './controllers/IntegrationsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IntegrationController } from './controllers/IntegrationsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguagesController } from './controllers/LanguagesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguageController } from './controllers/LanguagesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguageAssetsController } from './controllers/LanguageAssetsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LicensesForClientController } from './controllers/LicenseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LicenseForClientController } from './controllers/LicenseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LicensesController } from './controllers/LicenseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LicenseController } from './controllers/LicenseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LicenseTypesController } from './controllers/LicenseTypesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LicenseTypeController } from './controllers/LicenseTypesController';
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
import { RefsController } from './controllers/RefsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RefController } from './controllers/RefsController';
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
import { Deviceontroller } from './controllers/TerminalController';
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
    "IRef": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "version": {"dataType":"double","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAccountInfoMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAccountInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountsGetResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAccountInfoMeta"},
            "data": {"dataType":"array","array":{"ref":"IAccountInfo"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAccountInfoMeta"},
            "data": {"ref":"IAccountInfo"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateAccountParams": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"IBusinessPeriodContentsItem"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScheduleItem": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "time": {"dataType":"nestedObjectLiteral","nestedProperties":{"end":{"dataType":"double","required":true},"start":{"dataType":"double","required":true}}},
            "weekDays": {"dataType":"array","array":{"dataType":"double"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "contents": {"ref":"IBusinessPeriodContents","required":true},
            "schedule": {"dataType":"array","array":{"ref":"IScheduleItem"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IBusinessPeriodMeta"},
            "data": {"dataType":"array","array":{"ref":"IBusinessPeriodItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IBusinessPeriodMeta"},
            "data": {"ref":"IBusinessPeriodItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_LeanDocument__LeanDocument_T__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick__LeanDocument_T_.Exclude_keyof_LeanDocument_T_.Exclude_keyofDocument._id-or-id-or-__v_-or-%24isSingleNested__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"_id":{"ref":"_LeanDocument__LeanDocument_T__"},"__v":{"dataType":"double"},"id":{"dataType":"any"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit__LeanDocument_this_.Exclude_keyofDocument._id-or-id-or-__v_-or-%24isSingleNested_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick__LeanDocument_T_.Exclude_keyof_LeanDocument_T_.Exclude_keyofDocument._id-or-id-or-__v_-or-%24isSingleNested__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LeanDocument_this_": {
        "dataType": "refAlias",
        "type": {"ref":"Omit__LeanDocument_this_.Exclude_keyofDocument._id-or-id-or-__v_-or-%24isSingleNested_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScheduleDocument": {
        "dataType": "refAlias",
        "type": {"ref":"LeanDocument_this_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBusinessPeriodCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string"},
            "contents": {"dataType":"union","subSchemas":[{"ref":"IBusinessPeriodContents"},{"dataType":"any"}]},
            "schedule": {"dataType":"array","array":{"dataType":"refAlias","ref":"IScheduleDocument"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAssetMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AssetExtensions": {
        "dataType": "refEnum",
        "enums": [".jpg",".png",".gif",".mp4",".fbx",".obj",".dae"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAssetItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAssetMeta"},
            "data": {"dataType":"array","array":{"ref":"IAssetItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdsMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdTypes": {
        "dataType": "refEnum",
        "enums": ["intro","banner","service-unavailable"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdResources": {
        "dataType": "refObject",
        "properties": {
            "main": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "duration": {"dataType":"double"},
            "color": {"dataType":"string"},
            "resources": {"ref":"IAdResources"},
            "assets": {"dataType":"array","array":{"dataType":"string"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"IAdContentsItem"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "active": {"dataType":"boolean","required":true},
            "type": {"ref":"AdTypes","required":true},
            "name": {"dataType":"string"},
            "contents": {"ref":"IAdContents","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAdsMeta"},
            "data": {"dataType":"array","array":{"ref":"IAdItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAdsMeta"},
            "data": {"ref":"IAdItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "type": {"dataType":"union","subSchemas":[{"ref":"AdTypes"},{"dataType":"string"}],"required":true},
            "contents": {"ref":"IAdContents"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "type": {"ref":"AdTypes"},
            "contents": {"dataType":"union","subSchemas":[{"ref":"IAdContents"},{"dataType":"any"}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdAsset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"array","array":{"ref":"IAdAsset"}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"array","array":{"ref":"IAdAsset"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"ad":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"ad":{"ref":"IAdItem","required":true},"asset":{"ref":"IAdAsset","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
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
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAdDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"ad":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IApplicationInfoMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVersion": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "code": {"dataType":"double","required":true},
            "version": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IApplicationInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "version": {"ref":"IVersion","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApplicationsGetResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IApplicationInfoMeta"},
            "data": {"dataType":"array","array":{"ref":"IApplicationInfo"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApplicationResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IApplicationInfoMeta"},
            "data": {"ref":"IApplicationInfo"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateApplicationParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "version": {"ref":"IVersion","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateApplicationParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "version": {"ref":"IVersion"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAppThemeMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TerminalTypes": {
        "dataType": "refEnum",
        "enums": [0,1,2,3,4,5,6,7,8],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAppThemeItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "client": {"dataType":"string","required":true},
            "type": {"ref":"TerminalTypes","required":true},
            "name": {"dataType":"string","required":true},
            "version": {"dataType":"double","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "data": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAppThemesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAppThemeMeta"},
            "data": {"dataType":"array","array":{"ref":"IAppThemeItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAppThemeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IAppThemeMeta"},
            "data": {"ref":"IAppThemeItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAppThemeUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "data": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCaptchaResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"svg":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignupResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"clientId":{"dataType":"string","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISignupParams": {
        "dataType": "refObject",
        "properties": {
            "captchaId": {"dataType":"string","required":true},
            "captchaValue": {"dataType":"string","required":true},
            "integrationId": {"dataType":"string","required":true},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRights": {
        "dataType": "refEnum",
        "enums": [0,1,2,3,4,5,6,7,8,9,10,11],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SigninResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"token":{"dataType":"string","required":true},"account":{"dataType":"nestedObjectLiteral","nestedProperties":{"rights":{"dataType":"array","array":{"dataType":"refEnum","enums":[0,1,2,3,4,5,6,7,8,9,10,11]},"required":true},"email":{"dataType":"string","required":true},"integrationId":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISigninParams": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResetPasswordParams": {
        "dataType": "refObject",
        "properties": {
            "restorePassCode": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ForgotPasswordResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VerifyResetPasswordTokenResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBackupMeta": {
        "dataType": "refObject",
        "properties": {
            "creationDate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBackup": {
        "dataType": "refObject",
        "properties": {
            "url": {"dataType":"string","required":true},
            "filename": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateBackupResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IBackupMeta"},
            "data": {"ref":"IBackup"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUploadBackupResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IBackupMeta"},
            "data": {"dataType":"any"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICheckueMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioIntroActionTypes": {
        "dataType": "refEnum",
        "enums": ["duration"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioCommonActionTypes": {
        "dataType": "refEnum",
        "enums": ["visible-by-terminal","visible-by-store","visible-by-business-period","visible-by-order-type"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioProductActionTypes": {
        "dataType": "refEnum",
        "enums": ["up-limit","down-limit"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioSelectorActionTypes": {
        "dataType": "refEnum",
        "enums": ["max-usage","min-usage","default-products"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioProgrammActionTypes": {
        "dataType": "refEnum",
        "enums": ["switch","expression"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioPriceActionTypes": {
        "dataType": "refEnum",
        "enums": ["price","price-by-business-period","price-by-order-type"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioEntityTypes": {
        "dataType": "refEnum",
        "enums": ["business-period","product","selector","order-type","currency","checkue"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioPropertyAccessor": {
        "dataType": "refObject",
        "properties": {
            "entity": {"ref":"ScenarioEntityTypes","required":true},
            "prop": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScenarioProgramOperations": {
        "dataType": "refEnum",
        "enums": ["or","xor","and"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioExpression": {
        "dataType": "refObject",
        "properties": {
            "prop1": {"ref":"IScenarioPropertyAccessor","required":true},
            "prop2": {"ref":"IScenarioPropertyAccessor","required":true},
            "operation": {"ref":"ScenarioProgramOperations","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioPriceValue": {
        "dataType": "refObject",
        "properties": {
            "currency": {"dataType":"string","required":true},
            "value": {"dataType":"double","required":true},
            "isStatic": {"dataType":"boolean","required":true},
            "isPersentage": {"dataType":"boolean","required":true},
            "entities": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenario": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "action": {"dataType":"union","subSchemas":[{"ref":"ScenarioIntroActionTypes"},{"ref":"ScenarioCommonActionTypes"},{"ref":"ScenarioProductActionTypes"},{"ref":"ScenarioSelectorActionTypes"},{"ref":"ScenarioProgrammActionTypes"},{"ref":"ScenarioPriceActionTypes"}],"required":true},
            "value": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}},{"dataType":"array","array":{"dataType":"double"}},{"dataType":"array","array":{"ref":"IScenarioExpression"}},{"ref":"IScenarioPriceValue"},{"ref":"IScenarioSwitch"},{"dataType":"enum","enums":[null]}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IScenarioSwitch": {
        "dataType": "refObject",
        "properties": {
            "condition": {"dataType":"array","array":{"ref":"IScenarioExpression"},"required":true},
            "expressionPositive": {"ref":"IScenario","required":true},
            "expressionNegative": {"ref":"IScenario","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICheckueItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
            "scenarios": {"dataType":"array","array":{"ref":"IScenario"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckuesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ICheckueMeta"},
            "data": {"dataType":"array","array":{"ref":"ICheckueItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckueResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ICheckueMeta"},
            "data": {"ref":"ICheckueItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckueCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "name": {"dataType":"string","required":true},
            "scenarios": {"dataType":"array","array":{"ref":"IScenario"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckueUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "name": {"dataType":"string"},
            "scenarios": {"dataType":"array","array":{"ref":"IScenario"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICurrencyItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "isDefault": {"dataType":"boolean","required":true},
            "active": {"dataType":"boolean","required":true},
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrenciesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ICurrencyMeta"},
            "data": {"dataType":"array","array":{"ref":"ICurrencyItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ICurrencyMeta"},
            "data": {"ref":"ICurrencyItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "isDefault": {"dataType":"boolean"},
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "isDefault": {"dataType":"boolean"},
            "code": {"dataType":"string"},
            "name": {"dataType":"string"},
            "symbol": {"dataType":"string"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEmployeeMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IEmployeeItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
            "devices": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployeesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IEmployeeMeta"},
            "data": {"dataType":"array","array":{"ref":"IEmployeeItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployeeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IEmployeeMeta"},
            "data": {"ref":"IEmployeeItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployeeCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "name": {"dataType":"string","required":true},
            "devices": {"dataType":"array","array":{"dataType":"string"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployeeUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "name": {"dataType":"string"},
            "devices": {"dataType":"array","array":{"dataType":"string"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIntegrationInfoMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IntegrationStates": {
        "dataType": "refEnum",
        "enums": [0,1],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIntegrationInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "rights": {"dataType":"array","array":{"dataType":"refEnum","enums":[0,1,2,3,4,5,6,7,8,9,10,11]},"required":true},
            "version": {"ref":"IVersion","required":true},
            "state": {"ref":"IntegrationStates","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IntegrationsGetResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IIntegrationInfoMeta"},
            "data": {"dataType":"array","array":{"ref":"IIntegrationInfo"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IntegrationResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IIntegrationInfoMeta"},
            "data": {"ref":"IIntegrationInfo"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateIntegrationParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "rights": {"dataType":"array","array":{"dataType":"refEnum","enums":[0,1,2,3,4,5,6,7,8,9,10,11]},"required":true},
            "version": {"ref":"IVersion","required":true},
            "state": {"ref":"IntegrationStates","required":true},
            "lastUpdate": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateIntegrationParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "rights": {"dataType":"array","array":{"dataType":"refEnum","enums":[0,1,2,3,4,5,6,7,8,9,10,11]}},
            "version": {"ref":"IVersion"},
            "state": {"ref":"IntegrationStates"},
            "lastUpdate": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageResources": {
        "dataType": "refObject",
        "properties": {
            "main": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "active": {"dataType":"boolean","required":true},
            "isDefault": {"dataType":"boolean","required":true},
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "assets": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "resources": {"ref":"ILanguageResources","required":true},
            "translation": {"dataType":"string","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguagesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"LanguageMeta"},
            "data": {"dataType":"array","array":{"ref":"ILanguageItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"LanguageMeta"},
            "data": {"ref":"ILanguageItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "isDefault": {"dataType":"boolean"},
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "assets": {"dataType":"array","array":{"dataType":"string"}},
            "resources": {"dataType":"nestedObjectLiteral","nestedProperties":{"main":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}},
            "translation": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "isDefault": {"dataType":"boolean"},
            "code": {"dataType":"string"},
            "name": {"dataType":"string"},
            "assets": {"dataType":"array","array":{"dataType":"string"}},
            "resources": {"dataType":"nestedObjectLiteral","nestedProperties":{"main":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}}},
            "translation": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageAsset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"array","array":{"ref":"ILanguageAsset"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"language":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"language":{"ref":"ILanguageItem","required":true},"asset":{"ref":"ILanguageAsset","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
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
            "name": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILanguageDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"language":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILicenseInfoMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILicenseType": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "appType": {"ref":"TerminalTypes","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "price": {"dataType":"double","required":true},
            "payNotice": {"dataType":"string","required":true},
            "integrationId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicenseStates": {
        "dataType": "refEnum",
        "enums": [-1,0,1],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicenseStatuses": {
        "dataType": "refEnum",
        "enums": ["NEW","DEMO","ACTIVE","WITHDRAWN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILicenseAccountInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "clientId": {"dataType":"string","required":true},
            "dateEnd": {"dataType":"datetime","required":true},
            "dateStart": {"dataType":"datetime","required":true},
            "key": {"dataType":"string","required":true},
            "md5key": {"dataType":"string","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "licType": {"ref":"ILicenseType","required":true},
            "licTypeId": {"dataType":"string","required":true},
            "state": {"ref":"LicenseStates","required":true},
            "status": {"ref":"LicenseStatuses","required":true},
            "imei": {"dataType":"string","required":true},
            "terminalId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicensesAccountResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ILicenseInfoMeta"},
            "data": {"dataType":"array","array":{"ref":"ILicenseAccountInfo"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicenseAccountResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ILicenseInfoMeta"},
            "data": {"ref":"ILicenseAccountInfo"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILicenseInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "clientId": {"dataType":"string","required":true},
            "dateEnd": {"dataType":"datetime","required":true},
            "dateStart": {"dataType":"datetime","required":true},
            "key": {"dataType":"string","required":true},
            "md5key": {"dataType":"string","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "licType": {"ref":"ILicenseType","required":true},
            "licTypeId": {"dataType":"string","required":true},
            "state": {"ref":"LicenseStates","required":true},
            "status": {"ref":"LicenseStatuses","required":true},
            "imei": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicensesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ILicenseInfoMeta"},
            "data": {"dataType":"array","array":{"ref":"ILicenseInfo"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateLicenseParams": {
        "dataType": "refObject",
        "properties": {
            "clientId": {"dataType":"string","required":true},
            "dateStart": {"dataType":"datetime","required":true},
            "dateEnd": {"dataType":"datetime","required":true},
            "state": {"ref":"LicenseStates","required":true},
            "status": {"ref":"LicenseStatuses","required":true},
            "licTypeId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateLicenseParams": {
        "dataType": "refObject",
        "properties": {
            "clientId": {"dataType":"string"},
            "dateStart": {"dataType":"datetime"},
            "dateEnd": {"dataType":"datetime"},
            "state": {"ref":"LicenseStates"},
            "status": {"ref":"LicenseStatuses"},
            "licTypeId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicenseResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ILicenseInfoMeta"},
            "data": {"ref":"ILicenseInfo"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILicenseTypeInfoMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ILicenseTypeInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "appType": {"ref":"TerminalTypes","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "price": {"dataType":"double","required":true},
            "payNotice": {"dataType":"string","required":true},
            "integrationId": {"dataType":"string","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicenseTypesGetResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ILicenseTypeInfoMeta"},
            "data": {"dataType":"array","array":{"ref":"ILicenseTypeInfo"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LicenseTypeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ILicenseTypeInfoMeta"},
            "data": {"ref":"ILicenseTypeInfo"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateLicenseTypeParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "appType": {"ref":"TerminalTypes","required":true},
            "description": {"dataType":"string"},
            "price": {"dataType":"double","required":true},
            "payNotice": {"dataType":"string","required":true},
            "integrationId": {"dataType":"string","required":true},
            "lastUpdate": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUpdateLicenseTypeParams": {
        "dataType": "refObject",
        "properties": {
            "appType": {"ref":"TerminalTypes"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "price": {"dataType":"double"},
            "payNotice": {"dataType":"string"},
            "integrationId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodesMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NodeTypes": {
        "dataType": "refEnum",
        "enums": ["kiosk-root","kiosk-presets-root","selector","product","product-joint","selector-joint","selector-node"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "type": {"ref":"NodeTypes","required":true},
            "parentId": {"dataType":"string","required":true},
            "contentId": {"dataType":"string","required":true},
            "children": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "scenarios": {"dataType":"array","array":{"ref":"IScenario"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"INodesMeta"},
            "data": {"dataType":"array","array":{"ref":"INodeItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"INodesMeta"},
            "data": {"ref":"INodeItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICreateNodeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"INodesMeta"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"created":{"ref":"INodeItem","required":true},"changed":{"ref":"INodeItem","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"NodeTypes","required":true},
            "active": {"dataType":"boolean","required":true},
            "parentId": {"dataType":"string","required":true},
            "contentId": {"dataType":"string","required":true},
            "children": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "scenarios": {"dataType":"array","array":{"ref":"IScenario"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INodeUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "type": {"ref":"NodeTypes","required":true},
            "active": {"dataType":"boolean","required":true},
            "parentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "contentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "children": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "scenarios": {"dataType":"array","array":{"ref":"IScenario"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDeleteNodeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"INodesMeta"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"deleted":{"dataType":"array","array":{"dataType":"string"},"required":true},"changed":{"ref":"INodeItem","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeResources": {
        "dataType": "refObject",
        "properties": {
            "main": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "resources": {"ref":"IOrderTypeResources","required":true},
            "assets": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"IOrderTypeContentsItem"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "isDefault": {"dataType":"boolean","required":true},
            "active": {"dataType":"boolean","required":true},
            "contents": {"ref":"IOrderTypeContents","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypesResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IOrderTypeMeta"},
            "data": {"dataType":"array","array":{"ref":"IOrderTypeItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypeResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IOrderTypeMeta"},
            "data": {"ref":"IOrderTypeItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypeCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "isDefault": {"dataType":"boolean"},
            "contents": {"dataType":"union","subSchemas":[{"ref":"IOrderTypeContents"},{"dataType":"any"}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeAsset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"array","array":{"ref":"IOrderTypeAsset"}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"array","array":{"ref":"IOrderTypeAsset"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"orderType":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"orderType":{"ref":"IOrderTypeItem","required":true},"asset":{"ref":"IOrderTypeAsset","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderTypeImageTypes": {
        "dataType": "refEnum",
        "enums": ["main","icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrderTypeDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"orderType":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductsMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductResources": {
        "dataType": "refObject",
        "properties": {
            "main": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "resources": {"ref":"IProductResources","required":true},
            "assets": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "gallery": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"IProductContentsItem"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPrice": {
        "dataType": "refObject",
        "properties": {
            "currency": {"dataType":"string","required":true},
            "value": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReceipt": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "calories": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "active": {"dataType":"boolean","required":true},
            "contents": {"ref":"IProductContents","required":true},
            "prices": {"dataType":"array","array":{"ref":"IPrice"},"required":true},
            "receipt": {"dataType":"array","array":{"ref":"IReceipt"},"required":true},
            "tags": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "joint": {"dataType":"string"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IProductsMeta"},
            "data": {"dataType":"array","array":{"ref":"IProductItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IProductsMeta"},
            "data": {"ref":"IProductItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReceiptItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "calories": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "contents": {"dataType":"union","subSchemas":[{"ref":"IProductContents"},{"dataType":"any"}]},
            "prices": {"dataType":"array","array":{"ref":"IPrice"},"required":true},
            "receipt": {"dataType":"array","array":{"ref":"IReceiptItem"},"required":true},
            "tags": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "joint": {"dataType":"string"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "contents": {"dataType":"union","subSchemas":[{"ref":"IProductContents"},{"dataType":"any"}]},
            "prices": {"dataType":"array","array":{"ref":"IPrice"}},
            "receipt": {"dataType":"array","array":{"ref":"IReceiptItem"}},
            "tags": {"dataType":"array","array":{"dataType":"string"}},
            "joint": {"dataType":"string"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductAsset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"array","array":{"ref":"IProductAsset"}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"array","array":{"ref":"IProductAsset"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"product":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"product":{"ref":"IProductItem","required":true},"asset":{"ref":"IProductAsset","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductImageTypes": {
        "dataType": "refEnum",
        "enums": ["main","icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProductDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"product":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefsResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"ref":"IRef"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"IRef"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorsMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectorTypes": {
        "dataType": "refEnum",
        "enums": ["menu-category","schema-category"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorResources": {
        "dataType": "refObject",
        "properties": {
            "main": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "resources": {"ref":"ISelectorResources","required":true},
            "assets": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"ISelectorContentsItem"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "type": {"ref":"SelectorTypes","required":true},
            "active": {"dataType":"boolean","required":true},
            "contents": {"ref":"ISelectorContents","required":true},
            "joint": {"dataType":"string"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ISelectorsMeta"},
            "data": {"dataType":"array","array":{"ref":"ISelectorItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ISelectorsMeta"},
            "data": {"ref":"ISelectorItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "type": {"ref":"SelectorTypes","required":true},
            "contents": {"dataType":"union","subSchemas":[{"ref":"ISelectorContents"},{"dataType":"any"}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean"},
            "type": {"ref":"SelectorTypes"},
            "contents": {"dataType":"union","subSchemas":[{"ref":"ISelectorContents"},{"dataType":"any"}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorAsset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"array","array":{"ref":"ISelectorAsset"}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"array","array":{"ref":"ISelectorAsset"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"selector":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"selector":{"ref":"ISelectorItem","required":true},"asset":{"ref":"ISelectorAsset","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectorImageTypes": {
        "dataType": "refEnum",
        "enums": ["main","icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISelectorDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"selector":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoresResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IStoreMeta"},
            "data": {"dataType":"array","array":{"ref":"IStoreItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"IStoreMeta"},
            "data": {"ref":"IStoreItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "address": {"dataType":"string"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagResources": {
        "dataType": "refObject",
        "properties": {
            "main": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagContentsItem": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "resources": {"ref":"ITagResources","required":true},
            "assets": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagContents": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"ITagContentsItem"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "active": {"dataType":"boolean","required":true},
            "contents": {"ref":"ITagContents","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ITagMeta"},
            "data": {"dataType":"array","array":{"ref":"ITagItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ITagMeta"},
            "data": {"ref":"ITagItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string"},
            "contents": {"dataType":"union","subSchemas":[{"ref":"ITagContents"},{"dataType":"any"}]},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagAsset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "ext": {"ref":"AssetExtensions","required":true},
            "path": {"dataType":"string","required":true},
            "mipmap": {"dataType":"nestedObjectLiteral","nestedProperties":{"x32":{"dataType":"string","required":true},"x128":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagGetAllAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"array","array":{"ref":"ITagAsset"}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagGetAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "data": {"dataType":"array","array":{"ref":"ITagAsset"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagCreateAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"tag":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"tag":{"ref":"ITagItem","required":true},"asset":{"ref":"ITagAsset","required":true}}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagImageTypes": {
        "dataType": "refEnum",
        "enums": ["main","icon"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagAssetUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITagDeleteAssetsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"dataType":"nestedObjectLiteral","nestedProperties":{"asset":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true},"tag":{"dataType":"nestedObjectLiteral","nestedProperties":{"ref":{"ref":"IRef","required":true}},"required":true}}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TerminalStatusTypes": {
        "dataType": "refEnum",
        "enums": ["online","unavailable"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalKioskConfig": {
        "dataType": "refObject",
        "properties": {
            "theme": {"dataType":"string","required":true},
            "suffix": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalOrderPickerConfig": {
        "dataType": "refObject",
        "properties": {
            "theme": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalEQConfig": {
        "dataType": "refObject",
        "properties": {
            "theme": {"dataType":"string","required":true},
            "layout": {"dataType":"nestedObjectLiteral","nestedProperties":{"complete":{"dataType":"nestedObjectLiteral","nestedProperties":{"rows":{"dataType":"double","required":true},"columns":{"dataType":"double","required":true}},"required":true},"new":{"dataType":"nestedObjectLiteral","nestedProperties":{"rows":{"dataType":"double","required":true},"columns":{"dataType":"double","required":true}},"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TerminalConfig": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"ITerminalKioskConfig"},{"ref":"ITerminalOrderPickerConfig"},{"ref":"ITerminalEQConfig"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "client": {"dataType":"string","required":true},
            "status": {"ref":"TerminalStatusTypes","required":true},
            "type": {"ref":"TerminalTypes","required":true},
            "name": {"dataType":"string","required":true},
            "storeId": {"dataType":"string","required":true},
            "lastwork": {"dataType":"datetime","required":true},
            "imei": {"dataType":"string","required":true},
            "licenseId": {"dataType":"string","required":true},
            "config": {"ref":"TerminalConfig","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ITerminalMeta"},
            "data": {"ref":"ITerminalItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalRegisterRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "type": {"ref":"TerminalTypes"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"ITerminalMeta"},
            "data": {"dataType":"array","array":{"ref":"ITerminalItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "storeId": {"dataType":"string"},
            "config": {"ref":"TerminalConfig"},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationMeta": {
        "dataType": "refObject",
        "properties": {
            "ref": {"ref":"IRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslateItem": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "value": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslationItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "language": {"dataType":"string","required":true},
            "items": {"dataType":"array","array":{"ref":"ITranslateItem"},"required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationsResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"TranslationMeta"},
            "data": {"dataType":"array","array":{"ref":"ITranslationItem"}},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationResponse": {
        "dataType": "refObject",
        "properties": {
            "meta": {"ref":"TranslationMeta"},
            "data": {"ref":"ITranslationItem"},
            "error": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true},"code":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslate": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TranslationUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "language": {"dataType":"string","required":true},
            "items": {"dataType":"array","array":{"ref":"ITranslate"}},
            "extra": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/v1/accounts',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AccountsController_getAccount(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AccountsController();


            const promise = controller.getAccount.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/account/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AccountController_getAccount(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AccountController();


            const promise = controller.getAccount.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/account/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AccountController_updateAccount(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUpdateAccountParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AccountController();


            const promise = controller.updateAccount.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/business-periods',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function BusinessPeriodsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/business-period/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function BusinessPeriodController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/business-period',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function BusinessPeriodController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IBusinessPeriodCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/business-period/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function BusinessPeriodController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IBusinessPeriodCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/business-period/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function BusinessPeriodController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessPeriodController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AssetsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssetsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/ads',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AdsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    type: {"in":"query","name":"type","ref":"AdTypes"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/ad/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AdController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/ad',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AdController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IAdCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/ad/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AdController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IAdUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/ad/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AdController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/ad/:adId/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AdAssetsController_getAllAssets(request: any, response: any, next: any) {
            const args = {
                    adId: {"in":"path","name":"adId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/ad/:adId/assets/:langCode',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AdAssetsController_getAssets(request: any, response: any, next: any) {
            const args = {
                    adId: {"in":"path","name":"adId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/ad/:adId/resource/:langCode/:resourceType',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AdAssetsController_resource(request: any, response: any, next: any) {
            const args = {
                    adId: {"in":"path","name":"adId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    resourceType: {"in":"path","name":"resourceType","required":true,"ref":"AdImageTypes"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/ad/:adId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AdAssetsController_update(request: any, response: any, next: any) {
            const args = {
                    adId: {"in":"path","name":"adId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IAdAssetUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/ad/:adId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function AdAssetsController_delete(request: any, response: any, next: any) {
            const args = {
                    adId: {"in":"path","name":"adId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AdAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/applications',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ApplicationsController_getApplication(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ApplicationsController();


            const promise = controller.getApplication.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/application/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ApplicationController_getApplication(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ApplicationController();


            const promise = controller.getApplication.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/application',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ApplicationController_createApplication(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ICreateApplicationParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ApplicationController();


            const promise = controller.createApplication.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/application/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ApplicationController_updateApplication(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUpdateApplicationParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ApplicationController();


            const promise = controller.updateApplication.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/application/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ApplicationController_deleteApplication(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ApplicationController();


            const promise = controller.deleteApplication.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/app-themes',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AppThemesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    type: {"in":"query","name":"type","required":true,"ref":"TerminalTypes"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AppThemesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/app-theme/:name',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AppThemeController_getOne(request: any, response: any, next: any) {
            const args = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    type: {"in":"query","name":"type","required":true,"ref":"TerminalTypes"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AppThemeController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/app-theme/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function AppThemeController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IAppThemeUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AppThemeController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/auth/captcha',
            function CaptchaController_getCaptcha(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CaptchaController();


            const promise = controller.getCaptcha.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/auth/signup',
            function SignupController_signup(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ISignupParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SignupController();


            const promise = controller.signup.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/auth/signin',
            function SigninController_signin(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"ISigninParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SigninController();


            const promise = controller.signin.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/auth/reset-password',
            function ResetPasswordController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"IResetPasswordParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ResetPasswordController();


            const promise = controller.resetPassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/auth/forgot-password',
            function ForgotPasswordController_forgotPassword(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    email: {"in":"query","name":"email","required":true,"dataType":"string"},
                    captchaId: {"in":"query","name":"captchaId","required":true,"dataType":"string"},
                    captchaVal: {"in":"query","name":"captchaVal","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ForgotPasswordController();


            const promise = controller.forgotPassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/auth/verify-reset-password-token',
            function VerifyResetPasswordTokenController_verifyResetPasswordToken(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    restorePassCode: {"in":"query","name":"restorePassCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new VerifyResetPasswordTokenController();


            const promise = controller.verifyResetPasswordToken.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/backup/client/create',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function BackupController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BackupController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/backup/client/upload',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function BackupController_upload(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BackupController();


            const promise = controller.upload.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/checkues',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function CheckuesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CheckuesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/checkue/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function CheckueController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CheckueController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/checkue',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function CheckueController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CheckueCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CheckueController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/checkue/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function CheckueController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"CheckueUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CheckueController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/checkue/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function CheckueController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CheckueController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/currencies',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function CurrenciesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrenciesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/currency/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function CurrencyController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/currency',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function CurrencyController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CurrencyCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/currency/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function CurrencyController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"CurrencyUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/currency/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function CurrencyController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CurrencyController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/employees',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function EmployeesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EmployeesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/employee/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function EmployeeController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EmployeeController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/employee',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function EmployeeController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"EmployeeCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EmployeeController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/employee/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function EmployeeController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"EmployeeUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EmployeeController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/employee/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function EmployeeController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new EmployeeController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/integrations',
            function IntegrationsController_getIntegration(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new IntegrationsController();


            const promise = controller.getIntegration.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/integration/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function IntegrationController_getIntegration(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new IntegrationController();


            const promise = controller.getIntegration.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/integration',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function IntegrationController_createIntegration(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ICreateIntegrationParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new IntegrationController();


            const promise = controller.createIntegration.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/integration/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function IntegrationController_updateIntegration(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUpdateIntegrationParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new IntegrationController();


            const promise = controller.updateIntegration.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/integration/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function IntegrationController_deleteIntegration(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new IntegrationController();


            const promise = controller.deleteIntegration.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/languages',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function LanguagesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguagesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/language/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function LanguageController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/language',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"LanguageCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/language/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"LanguageUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/language/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/language/:languageId/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function LanguageAssetsController_getAssets(request: any, response: any, next: any) {
            const args = {
                    languageId: {"in":"path","name":"languageId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/language/:languageId/asset',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageAssetsController_create(request: any, response: any, next: any) {
            const args = {
                    languageId: {"in":"path","name":"languageId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/language/:languageId/resource/:resourceType',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageAssetsController_resource(request: any, response: any, next: any) {
            const args = {
                    languageId: {"in":"path","name":"languageId","required":true,"dataType":"string"},
                    resourceType: {"in":"path","name":"resourceType","required":true,"ref":"LanguageImageTypes"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/language/:languageId/asset/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageAssetsController_update(request: any, response: any, next: any) {
            const args = {
                    languageId: {"in":"path","name":"languageId","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ILanguageUpdateAssetsRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/language/:languageId/asset/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LanguageAssetsController_delete(request: any, response: any, next: any) {
            const args = {
                    languageId: {"in":"path","name":"languageId","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LanguageAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/licenses/forClient',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicensesForClientController_getLicense(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicensesForClientController();


            const promise = controller.getLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/license/forClient/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseForClientController_getLicense(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseForClientController();


            const promise = controller.getLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/licenses',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicensesController_getLicenses(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicensesController();


            const promise = controller.getLicenses.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/license/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseController_getLicense(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseController();


            const promise = controller.getLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/license',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseController_createLicense(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ICreateLicenseParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseController();


            const promise = controller.createLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/license/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseController_updateLicense(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUpdateLicenseParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseController();


            const promise = controller.updateLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/license/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseController_deleteLicense(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseController();


            const promise = controller.deleteLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/license/unbind/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseController_unbindLicense(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseController();


            const promise = controller.unbindLicense.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/license-types',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseTypesController_getLicenseType(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseTypesController();


            const promise = controller.getLicenseType.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/license-type/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseTypeController_getLicenseType(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseTypeController();


            const promise = controller.getLicenseType.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/license-type',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseTypeController_createLicenseType(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ICreateLicenseTypeParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseTypeController();


            const promise = controller.createLicenseType.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/license-type/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseTypeController_updateLicenseType(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUpdateLicenseTypeParams"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseTypeController();


            const promise = controller.updateLicenseType.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/license-type/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function LicenseTypeController_deleteLicenseType(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LicenseTypeController();


            const promise = controller.deleteLicenseType.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/root-nodes',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function RootNodesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RootNodesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/nodes',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function NodesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new NodesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/nodes/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function NodesController_getAllById(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new NodesController();


            const promise = controller.getAllById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/node/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function NodeController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/node',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function NodeController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"INodeCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/node/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function NodeController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"INodeUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/node/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function NodeController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new NodeController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/order-types',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function OrderTypesController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypesController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/order-type/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function OrderTypeController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/order-type',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function OrderTypeController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"OrderTypeCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/order-type/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function OrderTypeController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"OrderTypeCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/order-type/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function OrderTypeController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/order-type/:orderTypeId/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function OrderTypeAssetsController_getAllAssets(request: any, response: any, next: any) {
            const args = {
                    orderTypeId: {"in":"path","name":"orderTypeId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/order-type/:orderTypeId/assets/:langCode',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function OrderTypeAssetsController_getAssets(request: any, response: any, next: any) {
            const args = {
                    orderTypeId: {"in":"path","name":"orderTypeId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/order-type/:orderTypeId/resource/:langCode/:resourceType',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function OrderTypeAssetsController_resource(request: any, response: any, next: any) {
            const args = {
                    orderTypeId: {"in":"path","name":"orderTypeId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    resourceType: {"in":"path","name":"resourceType","required":true,"ref":"OrderTypeImageTypes"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/order-type/:orderTypeId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function OrderTypeAssetsController_update(request: any, response: any, next: any) {
            const args = {
                    orderTypeId: {"in":"path","name":"orderTypeId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IOrderTypeAssetUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/order-type/:orderTypeId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function OrderTypeAssetsController_delete(request: any, response: any, next: any) {
            const args = {
                    orderTypeId: {"in":"path","name":"orderTypeId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderTypeAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/products',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function ProductsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/product/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function ProductController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/product',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IProductCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/product/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IProductUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/product/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/product/:productId/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function ProductAssetsController_getAllAssets(request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/product/:productId/assets/:langCode',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function ProductAssetsController_getAssets(request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/product/:productId/asset/:langCode',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductAssetsController_create(request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/product/:productId/resource/:langCode/:resourceType',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductAssetsController_resource(request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    resourceType: {"in":"path","name":"resourceType","required":true,"ref":"ProductImageTypes"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/product/:productId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductAssetsController_update(request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IProductAssetUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/product/:productId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function ProductAssetsController_delete(request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/refs',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function RefsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RefsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/ref/:name',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function RefController_getOne(request: any, response: any, next: any) {
            const args = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RefController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/selectors',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function SelectorsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/selector/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function SelectorController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/selector',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function SelectorController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ISelectorCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/selector/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function SelectorController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ISelectorUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/selector/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function SelectorController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/selector/:selectorId/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function SelectorAssetsController_getAllAssets(request: any, response: any, next: any) {
            const args = {
                    selectorId: {"in":"path","name":"selectorId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/selector/:selectorId/assets/:langCode',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function SelectorAssetsController_getAssets(request: any, response: any, next: any) {
            const args = {
                    selectorId: {"in":"path","name":"selectorId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/selector/:selectorId/resource/:langCode/:resourceType',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function SelectorAssetsController_resource(request: any, response: any, next: any) {
            const args = {
                    selectorId: {"in":"path","name":"selectorId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    resourceType: {"in":"path","name":"resourceType","required":true,"ref":"SelectorImageTypes"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/selector/:selectorId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function SelectorAssetsController_update(request: any, response: any, next: any) {
            const args = {
                    selectorId: {"in":"path","name":"selectorId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ISelectorAssetUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/selector/:selectorId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function SelectorAssetsController_delete(request: any, response: any, next: any) {
            const args = {
                    selectorId: {"in":"path","name":"selectorId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SelectorAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/stores',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function StoresController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StoresController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/store/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function StoreController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/store',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function StoreController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IStoreCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/store/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function StoreController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IStoreUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/store/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function StoreController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StoreController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/tags',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TagsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/tag/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TagController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/tag',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TagController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TagCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/tag/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TagController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"TagCreateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/tag/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TagController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/tag/:tagId/assets',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TagAssetsController_getAllAssets(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"path","name":"tagId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.getAllAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/tag/:tagId/assets/:langCode',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TagAssetsController_getAssets(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"path","name":"tagId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.getAssets.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/tag/:tagId/resource/:langCode/:resourceType',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TagAssetsController_resource(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"path","name":"tagId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    resourceType: {"in":"path","name":"resourceType","required":true,"ref":"TagImageTypes"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.resource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/tag/:tagId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TagAssetsController_update(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"path","name":"tagId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ITagAssetUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/v1/tag/:tagId/asset/:langCode/:assetId',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TagAssetsController_delete(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"path","name":"tagId","required":true,"dataType":"string"},
                    langCode: {"in":"path","name":"langCode","required":true,"dataType":"string"},
                    assetId: {"in":"path","name":"assetId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagAssetsController();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/device/license-verify',
            authenticateMiddleware([{"terminalAccessToken":[]}]),
            function Deviceontroller_licenseVerify(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new Deviceontroller();


            const promise = controller.licenseVerify.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/v1/device/registration',
            authenticateMiddleware([{"terminalAccessToken":[]}]),
            function Deviceontroller_registration(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ITerminalRegisterRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new Deviceontroller();


            const promise = controller.registration.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/terminals',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TerminalsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/terminal/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TerminalController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/terminal/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TerminalController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ITerminalUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TerminalController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/translations',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TranslationsController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TranslationsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/translation/:id',
            authenticateMiddleware([{"clientAccessToken":[]},{"terminalAccessToken":[]}]),
            function TranslationController_getOne(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TranslationController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/v1/translation/:id',
            authenticateMiddleware([{"clientAccessToken":[]}]),
            function TranslationController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"TranslationUpdateRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TranslationController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return function runAuthenticationMiddleware(request: any, _response: any, next: any) {
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

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
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
