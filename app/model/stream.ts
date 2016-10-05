import { IdElement } from './abstract/IdElement'
import { IdCollection } from './abstract/IdCollection'
import { ExecutionResult } from './executionResult'

export class Stream extends IdElement{
    name: string
    executionResults: IdCollection<ExecutionResult>

    constructor(executionResults: IdCollection<ExecutionResult>, streamUUID: string, streamName: string){
        super(streamUUID)
        this.executionResults = executionResults
        this.name = streamName
    }

    public push(executionResult: ExecutionResult): boolean {
        if(this.executionResults.contains(executionResult)){
            this.executionResults.update(executionResult)
            return true
        }  

        this.executionResults.add(executionResult)
        return false
    }
}