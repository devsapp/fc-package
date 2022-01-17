import logger from './common/logger';
import {InputProps} from './common/entity';
import {pack} from './zip';
import {isIgnored, isIgnoredInCodeUri} from './ignore';
import * as core from '@serverless-devs/core';
import path from 'path';
import {getFileHash} from './file';
import {AlicloudOss} from './oss';

const {fse, commandParse, help, getCredential} = core;

const FC_CODE_CACHE_DIR = "./"
export default class ComponentDemo {
    /**
     * demo 实例
     * @param inputs
     * @returns
     */

    async generateCodeIngore(baseDir: string, codeUri: string, runtime: string): Promise<Function | null> {
        const ignoreFileInCodeUri: string = path.join(
            path.resolve(baseDir, codeUri),
            '.fcignore',
        );
        if (fse.pathExistsSync(ignoreFileInCodeUri) && fse.lstatSync(ignoreFileInCodeUri).isFile()) {
            return await isIgnoredInCodeUri(path.resolve(baseDir, codeUri), runtime);
        }
        const ignoreFileInBaseDir: string = path.join(baseDir, '.fcignore');
        if (fse.pathExistsSync(ignoreFileInBaseDir) && fse.lstatSync(ignoreFileInBaseDir).isFile()) {
            logger.log(
                '.fcignore file will be placed under codeUri only in the future. Please update it with the relative path and then move it to the codeUri as soon as possible.',
            );
        }
        return await isIgnored(
            baseDir,
            runtime,
            path.resolve(baseDir, codeUri),
            path.resolve(baseDir, codeUri),
        );
    }

    async zipCode(baseDir: string, codeUri: string, tempFileName: string, runtime: string): Promise<any> {
        let codeAbsPath;
        if (codeUri) {
            codeAbsPath = path.resolve(baseDir, codeUri);
            if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
                return codeAbsPath;
            }
        } else {
            codeAbsPath = path.resolve(baseDir, './');
        }

        const codeignore = await this.generateCodeIngore(baseDir, codeUri, runtime);

        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
        await fse.mkdirp(FC_CODE_CACHE_DIR);
        const zipPath = path.join(
            FC_CODE_CACHE_DIR,
            tempFileName,
        );

        return await pack(codeAbsPath, codeignore, zipPath);
    }


    public async zip(inputs: InputProps) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Zip',
                content: `Zip fc code package`
            }, {
                header: 'Usage',
                content: `$ s cli fc-package zip <options>`
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
            return;
        }

        const baseDir = './'
        const codeUri = (comParse.data ? comParse.data.code : './') || "./"
        const tempName = comParse.data ? comParse.data.name : undefined
        const runtime = (comParse.data ? comParse.data.runtime : 'nodejs14') || "nodejs14"
        const result = await this.zipCode(baseDir, codeUri, tempName, runtime);
        return result
    }

    public async upload(inputs: InputProps) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Upload',
                content: `Upload the zip file of FC code package to OSS`
            }, {
                header: 'Usage',
                content: `$ s cli fc-package upload <options>`
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
            return;
        }

        const region = (comParse.data ? comParse.data.region : './') || 'cn-hangzhou'
        let bucket
        try {
            bucket = comParse.data.bucket
        } catch (e) {
            throw new Error(
                'Bucket parameter is required.',
            );
        }
        let zip
        try {
            zip = comParse.data.zip
        } catch (e) {
            throw new Error(
                'Zip parameter is required.',
            );
        }
        const fileHash = await getFileHash(zip)
        const object = (comParse.data ? comParse.data.object : './') || fileHash + '.zip';

        const credential = await getCredential(inputs.project.access)

        const alicloudOss: AlicloudOss = new AlicloudOss(
            bucket,
            credential,
            region,
        );
        if (!(await alicloudOss.isBucketExists()) && !(await alicloudOss.tryCreatingBucket())) {
            throw new Error(
                'Please provide existed ossBucket under your account.',
            );
        }
        await alicloudOss.putFileToOss(zip, object)
        return {
            "region": region,
            "bucket": bucket,
            "object": object,
            "fileHash": fileHash,
            "localFile": zip
        }
    }
}
