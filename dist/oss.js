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
exports.AlicloudOss = void 0;
var ali_oss_1 = __importDefault(require("ali-oss"));
var core = __importStar(require("@serverless-devs/core"));
var logger_1 = __importDefault(require("./common/logger"));
var fse = core.fse;
var AlicloudOss = /** @class */ (function () {
    function AlicloudOss(bucket, credentials, region, timeout) {
        this.bucket = bucket;
        this.region = region;
        this.client = new ali_oss_1.default({
            accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
            accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
            stsToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
            region: region,
            bucket: bucket,
            endpoint: "http://oss-".concat(region, ".aliyuncs.com"),
            timeout: timeout || 300 * 1000,
        });
    }
    AlicloudOss.prototype.isBucketExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.getBucketInfo()];
                    case 1:
                        _a.sent();
                        logger_1.default.debug("bucket: ".concat(this.bucket, " exist."));
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        // 指定的存储空间不存在或者 bucket 不在该账号下。
                        if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.name) === 'NoSuchBucketError' ||
                            (e_1 === null || e_1 === void 0 ? void 0 : e_1.message.includes('The bucket you access does not belong to you'))) {
                            logger_1.default.debug("bucket: ".concat(this.bucket, " dose not exist in your account."));
                            return [2 /*return*/, false];
                        }
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AlicloudOss.prototype.isObjectExists = function (objectName) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.head(objectName, {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_2 = _a.sent();
                        // 若获取 object 失败或者 object 不存在，返回 false
                        logger_1.default.debug("Get oss object: ".concat(objectName, " failed, error: ").concat(e_2));
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AlicloudOss.prototype.tryCreatingBucket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_1.default.debug("Fc is trying to create bucket: ".concat(this.bucket, " in region:").concat(this.region, " for you to store the code."));
                        options = {
                            storageClass: 'Standard',
                            acl: 'private',
                            dataRedundancyType: 'LRS', // 存储空间的默认数据容灾类型为本地冗余存储，即LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为ZRS。
                        };
                        return [4 /*yield*/, this.client.putBucket(this.bucket, options)];
                    case 1:
                        result = _a.sent();
                        logger_1.default.debug("Bucket:".concat(this.bucket, " in region:").concat(this.region, " is created"));
                        logger_1.default.debug("Result of creating bucket:".concat(this.bucket, " in region:").concat(this.region, " is:\n").concat(result));
                        return [2 /*return*/, true];
                    case 2:
                        e_3 = _a.sent();
                        logger_1.default.log("Fc tried to create bucket:".concat(this.bucket, " in region:").concat(this.region, " failed."));
                        logger_1.default.debug("Try to create bucket: ".concat(this.bucket, " in region:").concat(this.region, " failed, error: ").concat(e_3));
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AlicloudOss.prototype.putFileToOss = function (filePath, objectName) {
        return __awaiter(this, void 0, void 0, function () {
            var stream, size, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stream = fse.createReadStream(filePath);
                        size = fse.statSync(filePath).size;
                        return [4 /*yield*/, this.client.putStream(objectName, stream, { contentLength: size })];
                    case 1:
                        result = _a.sent();
                        logger_1.default.debug("Upload ".concat(filePath, " to oss bucket: ").concat(this.bucket, ", object name: ").concat(objectName, " result:\n").concat(JSON.stringify(result, null, '  ')));
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlicloudOss;
}());
exports.AlicloudOss = AlicloudOss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL29zcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQTBCO0FBQzFCLDBEQUE4QztBQUM5QywyREFBcUM7QUFDN0IsSUFBQSxHQUFHLEdBQUssSUFBSSxJQUFULENBQVU7QUFDckI7SUFLRSxxQkFBWSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxNQUFjLEVBQUUsT0FBZ0I7UUFDckYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFHLENBQUM7WUFDcEIsV0FBVyxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxXQUFXO1lBQ3JDLGVBQWUsRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsZUFBZTtZQUM3QyxRQUFRLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGFBQWE7WUFDcEMsTUFBTSxRQUFBO1lBQ04sTUFBTSxRQUFBO1lBQ04sUUFBUSxFQUFFLHFCQUFjLE1BQU0sa0JBQWU7WUFDN0MsT0FBTyxFQUFFLE9BQU8sSUFBSSxHQUFHLEdBQUcsSUFBSTtTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUssb0NBQWMsR0FBcEI7Ozs7Ozs7d0JBRUkscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQWpDLFNBQWlDLENBQUM7d0JBQ2xDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFXLElBQUksQ0FBQyxNQUFNLFlBQVMsQ0FBQyxDQUFDO3dCQUM5QyxzQkFBTyxJQUFJLEVBQUM7Ozt3QkFFWiw4QkFBOEI7d0JBQzlCLElBQ0UsQ0FBQSxHQUFDLGFB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