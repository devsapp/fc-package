"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./common/logger"));
var zip_1 = require("./zip");
var ignore_1 = require("./ignore");
var core = __importStar(require("@serverless-devs/core"));
var path_1 = __importDefault(require("path"));
var file_1 = require("./file");
var oss_1 = require("./oss");
var fse = core.fse, commandParse = core.commandParse, help = core.help, getCredential = core.getCredential;
var FC_CODE_CACHE_DIR = "./.s/temp_zip_path";
var ComponentDemo = /** @class */ (function () {
    function ComponentDemo() {
    }
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.generateCodeIngore = function (baseDir, codeUri, runtime) {
        return __awaiter(this, void 0, void 0, function () {
            var ignoreFileInCodeUri, ignoreFileInBaseDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ignoreFileInCodeUri = path_1.default.join(path_1.default.resolve(baseDir, codeUri), '.fcignore');
                        if (!(fse.pathExistsSync(ignoreFileInCodeUri) && fse.lstatSync(ignoreFileInCodeUri).isFile())) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, ignore_1.isIgnoredInCodeUri)(path_1.default.resolve(baseDir, codeUri), runtime)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ignoreFileInBaseDir = path_1.default.join(baseDir, '.fcignore');
                        if (fse.pathExistsSync(ignoreFileInBaseDir) && fse.lstatSync(ignoreFileInBaseDir).isFile()) {
                            logger_1.default.log('.fcignore file will be placed under codeUri only in the future. Please update it with the relative path and then move it to the codeUri as soon as possible.');
                        }
                        return [4 /*yield*/, (0, ignore_1.isIgnored)(baseDir, runtime, path_1.default.resolve(baseDir, codeUri), path_1.default.resolve(baseDir, codeUri))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.zipCode = function (baseDir, codeUri, tempFileName, runtime) {
        return __awaiter(this, void 0, void 0, function () {
            var codeAbsPath, codeignore, zipPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (codeUri) {
                            codeAbsPath = path_1.default.resolve(baseDir, codeUri);
                            if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
                                return [2 /*return*/, codeAbsPath];
                            }
                        }
                        else {
                            codeAbsPath = path_1.default.resolve(baseDir, './');
                        }
                        return [4 /*yield*/, this.generateCodeIngore(baseDir, codeUri, runtime)];
                    case 1:
                        codeignore = _a.sent();
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        return [4 /*yield*/, fse.mkdirp(FC_CODE_CACHE_DIR)];
                    case 2:
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        _a.sent();
                        zipPath = path_1.default.join(FC_CODE_CACHE_DIR, tempFileName);
                        return [4 /*yield*/, (0, zip_1.pack)(codeAbsPath, codeignore, zipPath)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.zip = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, baseDir, codeUri, tempName, runtime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = commandParse({ args: inputs.args }, apts);
                        if (comParse.data && comParse.data.help) {
                            help([{
                                    header: 'Zip',
                                    content: "Zip fc code package"
                                }, {
                                    header: 'Usage',
                                    content: "$ s cli fc-package zip <options>"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'name',
                                            description: '[Optional] ZipFile name (default: the hash string of the code zip)',
                                            type: String,
                                        },
                                        {
                                            name: 'code',
                                            description: '[Optional] The code path (default: ./)',
                                            type: String,
                                        },
                                        {
                                            name: 'runtime',
                                            description: '[Optional] The runtime of FC function (default: nodejs14)',
                                            type: String,
                                        },
                                    ],
                                }, {
                                    header: 'Global Options',
                                    optionList: [
                                        {
                                            name: 'debug',
                                            description: '[Optional] Output debug informations  ',
                                            type: String,
                                        },
                                        {
                                            name: 'help',
                                            description: '[Optional] Help for command',
                                            alias: 'h',
                                            type: Boolean,
                                        },
                                    ],
                                }, {
                                    header: 'Examples without Yaml',
                                    content: [
                                        '$ s cli fc-package zip',
                                        '$ s cli fc-package zip --name demo.zip --runtime python3 --code ./code',
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        baseDir = './';
                        codeUri = (comParse.data ? comParse.data.code : './') || "./";
                        tempName = comParse.data ? comParse.data.name : undefined;
                        runtime = (comParse.data ? comParse.data.runtime : 'nodejs14') || "nodejs14";
                        return [4 /*yield*/, this.zipCode(baseDir, codeUri, tempName, runtime)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ComponentDemo.prototype.upload = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, region, bucket, zip, fileHash, object, credential, alicloudOss, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = commandParse({ args: inputs.args }, apts);
                        if (comParse.data && comParse.data.help) {
                            help([{
                                    header: 'Upload',
                                    content: "Upload the zip file of FC code package to OSS"
                                }, {
                                    header: 'Usage',
                                    content: "$ s cli fc-package upload <options>"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: '[Optional] The region of OSS Bucket (default: cn-hangzhou)',
                                            type: String,
                                        },
                                        {
                                            name: 'bucket',
                                            description: '[Required] The bucket name of OSS',
                                            type: String,
                                        },
                                        {
                                            name: 'object',
                                            description: '[Optional] The object name of the file in Bucket (default: the hash string of the code zip)',
                                            type: String,
                                        },
                                        {
                                            name: 'zip',
                                            description: '[Required] The zip file path of FC code package',
                                            type: String,
                                        },
                                    ],
                                }, {
                                    header: 'Global Options',
                                    optionList: [
                                        {
                                            name: 'debug',
                                            description: '[Optional] Output debug informations  ',
                                            type: String,
                                        },
                                        {
                                            name: 'help',
                                            description: '[Optional] Help for command',
                                            alias: 'h',
                                            type: Boolean,
                                        },
                                        {
                                            name: 'access',
                                            description: '[Optional] Specify key alias',
                                            alias: 'a',
                                            type: String,
                                        },
                                    ],
                                }, {
                                    header: 'Examples without Yaml',
                                    content: [
                                        '$ s cli fc-package upload --zip demo.zip --bucket demo',
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        region = (comParse.data ? comParse.data.region : './') || 'cn-hangzhou';
                        try {
                            bucket = comParse.data.bucket;
                        }
                        catch (e) {
                            throw new Error('Bucket parameter is required.');
                        }
                        try {
                            zip = comParse.data.zip;
                        }
                        catch (e) {
                            throw new Error('Zip parameter is required.');
                        }
                        return [4 /*yield*/, (0, file_1.getFileHash)(zip)];
                    case 1:
                        fileHash = _b.sent();
                        object = (comParse.data ? comParse.data.object : './') || fileHash + '.zip';
                        return [4 /*yield*/, getCredential(inputs.project.access)];
                    case 2:
                        credential = _b.sent();
                        alicloudOss = new oss_1.AlicloudOss(bucket, credential, region);
                        return [4 /*yield*/, alicloudOss.isBucketExists()];
                    case 3:
                        _a = !(_b.sent());
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, alicloudOss.tryCreatingBucket()];
                    case 4:
                        _a = !(_b.sent());
                        _b.label = 5;
                    case 5:
                        if (_a) {
                            throw new Error('Please provide existed ossBucket under your account.');
                        }
                        return [4 /*yield*/, alicloudOss.putFileToOss(zip, object)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, {
                                "region": region,
                                "bucket": bucket,
                                "object": object,
                                "fileHash": fileHash,
                                "localFile": zip
                            }];
                }
            });
        });
    };
    return ComponentDemo;
}());
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXFDO0FBRXJDLDZCQUEyQjtBQUMzQixtQ0FBdUQ7QUFDdkQsMERBQThDO0FBQzlDLDhDQUF3QjtBQUN4QiwrQkFBbUM7QUFDbkMsNkJBQWtDO0FBRTNCLElBQUEsR0FBRyxHQUF1QyxJQUFJLElBQTNDLEVBQUUsWUFBWSxHQUF5QixJQUFJLGFBQTdCLEVBQUUsSUFBSSxHQUFtQixJQUFJLEtBQXZCLEVBQUUsYUFBYSxHQUFJLElBQUksY0FBUixDQUFTO0FBRXRELElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUE7QUFDOUM7SUFBQTtJQWtPQSxDQUFDO0lBak9HOzs7O09BSUc7SUFFRywwQ0FBa0IsR0FBeEIsVUFBeUIsT0FBZSxFQUFFLE9BQWUsRUFBRSxPQUFlOzs7Ozs7d0JBQ2hFLG1CQUFtQixHQUFXLGNBQUksQ0FBQyxJQUFJLENBQ3pDLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUM5QixXQUFXLENBQ2QsQ0FBQzs2QkFDRSxDQUFBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUEsRUFBdEYsd0JBQXNGO3dCQUMvRSxxQkFBTSxJQUFBLDJCQUFrQixFQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFBOzRCQUF4RSxzQkFBTyxTQUFpRSxFQUFDOzt3QkFFdkUsbUJBQW1CLEdBQVcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQ3BFLElBQUksR0FB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