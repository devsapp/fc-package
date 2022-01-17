import * as _ from 'lodash';
import * as core from '@serverless-devs/core';

export class IInputsBase {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;
  readonly serverlessProfile: ServerlessProfile;
  readonly region: string;
  readonly credentials: ICredentials;
  readonly curPath?: string;

  constructor(
    serverlessProfile: ServerlessProfile,
    region: string,
    credentials: ICredentials,
    curPath?: string,
  ) {
    this.serverlessProfile = serverlessProfile;
    this.region = region;
    this.credentials = credentials;
    if (!_.isNil(curPath)) {
      this.curPath = curPath;
    }
  }
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
