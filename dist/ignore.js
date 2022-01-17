"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnored = exports.isIgnoredInCodeUri = void 0;
var git_ignore_parser_1 = __importDefault(require("git-ignore-parser"));
var path_1 = __importDefault(require("path"));
var core_1 = require("@serverless-devs/core");
var ignoredFile = ['.git', '.svn', '.env', '.DS_Store', 'template.packaged.yml', '.nas.yml', '.s/nas', '.s/tmp', '.s/package'];
function selectIgnored(runtime) {
    switch (runtime) {
        case 'nodejs6':
        case 'nodejs8':
        case 'nodejs10':
        case 'nodejs12':
            return ['.s/python'];
        case 'python2.7':
        case 'python3':
            return ['node_modules'];
        case 'php7.2':
            return ['node_modules', '.s/python'];
        default:
            return [];
    }
}
function getIgnoreContent(ignoreFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileContent = '';
                    if (!core_1.fse.existsSync(ignoreFilePath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, core_1.fse.readFile(ignoreFilePath, 'utf8')];
                case 1:
                    fileContent = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, fileContent];
            }
        });
    });
}
function isIgnoredInCodeUri(actualCodeUri, runtime) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, fileContentList, ignoreDependencies, ignoredPaths, ig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = path_1.default.join(actualCodeUri, '.fcignore');
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    fileContentList = fileContent.split('\n');
                    ignoreDependencies = selectIgnored(runtime);
                    ignoredPaths = (0, git_ignore_parser_1.default)("".concat(__spreadArray(__spreadArray(__spreadArray([], ignoredFile, true), ignoreDependencies, true), fileContentList, true).join('\n')));
                    ig = (0, core_1.ignore)().add(ignoredPaths);
                    return [2 /*return*/, function (f) {
                            var relativePath = path_1.default.relative(actualCodeUri, f);
                            if (relativePath === '') {
                                return false;
                            }
                            return ig.ignores(relativePath);
                        }];
            }
        });
    });
}
exports.isIgnoredInCodeUri = isIgnoredInCodeUri;
function isIgnored(baseDir, runtime, actualCodeUri, ignoreRelativePath) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, fileContentList, i, ignoreDependencies, ignoredPaths, ig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = path_1.default.join(baseDir, '.fcignore');
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    fileContentList = fileContent.split('\n');
                    // 对于 build 后的构建物，会将 codeUri 中包含的子目录消除
                    // 例如 codeUri: ./code，则 build 后，生成的 codeUri 为 ./.s/build/artifacts/${serviceName}/${functionName}
                    // 因此需要将 .fcjgnore 中的路径对原始 codeUri 求相对路径后作为新的 ignore 内容
                    if (ignoreRelativePath) {
                        for (i = 0; i < fileContentList.length; i++) {
                            fileContentList[i] = path_1.default.relative(ignoreRelativePath, fileContentList[i]);
                        }
                    }
                    ignoreDependencies = selectIgnored(runtime);
                    ignoredPaths = (0, git_ignore_parser_1.default)("".concat(__spreadArray(__spreadArray(__spreadArray([], ignoredFile, true), ignoreDependencies, true), fileContentList, true).join('\n')));
                    ig = (0, core_1.ignore)().add(ignoredPaths);
                    return [2 /*return*/, function (f) {
                            var relativePath = path_1.default.relative(actualCodeUri, f);
                            if (relativePath === '') {
                                return false;
                            }
                            return ig.ignores(relativePath);
                        }];
            }
        });
    });
}
exports.isIgnored = isIgnored;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lnbm9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBdUM7QUFDdkMsOENBQXdCO0FBQ3hCLDhDQUFvRDtBQUVwRCxJQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUVqSSxTQUFTLGFBQWEsQ0FBQyxPQUFPO0lBQzVCLFFBQVEsT0FBTyxFQUFFO1FBQ2YsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssVUFBVSxDQUFDO1FBQ2hCLEtBQUssVUFBVTtZQUViLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QixLQUFLLFdBQVcsQ0FBQztRQUNqQixLQUFLLFNBQVM7WUFFWixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUIsS0FBSyxRQUFRO1lBRVgsT0FBTyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2QztZQUNFLE9BQU8sRUFBRSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsU0FBZSxnQkFBZ0IsQ0FBQyxjQUFzQjs7Ozs7O29CQUNoRCxXQUFXLEdBQUcsRUFBRSxDQUFDO3lCQUVqQixVQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUE5Qix3QkFBOEI7b0JBQ2xCLHFCQUFNLFVBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxFQUFBOztvQkFBeEQsV0FBVyxHQUFHLFNBQTBDLENBQUM7O3dCQUUzRCxzQkFBTyxXQUFXLEVBQUM7Ozs7Q0FDcEI7QUFFRCxTQUFzQixrQkFBa0IsQ0FBQyxhQUFxQixFQUFFLE9BQWU7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