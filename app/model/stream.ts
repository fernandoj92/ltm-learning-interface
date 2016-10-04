import { IdElement } from './abstract/IdElement'
import { ExecutionResult } from './executionResult'

export class Stream extends IdElement{
    name: string
    executionResults: ExecutionResult[]

    constructor(executionResults: ExecutionResult[], streamUUID: string, streamName: string){
        super(streamUUID)
        this.executionResults = executionResults
        this.name = streamName
    }
}