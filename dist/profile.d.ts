import * as core from '@serverless-devs/core';
export declare class IInputsBase {
    logger: core.ILogger;
    readonly serverlessProfile: ServerlessProfile;
    readonly region: string;
    readonly credentials: ICredentials;
    readonly curPath?: string;
    constructor(serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string);
}
export interface ICredentials {
    AccountID: string;
    AccessKeyID: string;
    AccessKeySecret: string;
    SecurityToken?: string;
}
export interface ServerlessProfile {
    project: {
        component?: string;
        access: string;
        projectName: string;
    };
    appName: string;
}
