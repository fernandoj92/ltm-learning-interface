import { ExecutionResult } from './executionResult'

export class Stream {
    name: string
    UUID: string;
    executionResults: ExecutionResult[]

    constructor(executionResults: ExecutionResult[], streamUUID: string, streamName: string){
        this.UUID = streamUUID
        this.executionResults = executionResults
        this.name = streamName
    }
}