import { ExecutionResult } from './executionResult'

export class Stream {
    streamUUID: string;
    executionResults: ExecutionResult[]

    constructor(executionResults: ExecutionResult[], streamUUID: string){
        this.streamUUID = streamUUID
        this.executionResults = executionResults
    }
}