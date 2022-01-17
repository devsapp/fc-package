import { InputProps } from './common/entity';
export default class ComponentDemo {
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    generateCodeIngore(baseDir: string, codeUri: string, runtime: string): Promise<Function | null>;
    zipCode(baseDir: string, codeUri: string, tempFileName: string, runtime: string): Promise<any>;
    zip(inputs: InputProps): Promise<any>;
    upload(inputs: InputProps): Promise<{
        region: any;
        bucket: any;
        object: any;
        fileHash: string;
        localFile: any;
    }>;
}
