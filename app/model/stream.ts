import { IdElement } from './abstract/idElement'
import { IdCollection } from './abstract/idCollection'
import { ExecutionResult } from './executionResult'

export class Stream extends IdElement{
    name: string
    executionResults: IdCollection<ExecutionResult>
    createDate: Date

    constructor(executionResults: IdCollection<ExecutionResult>, streamUUID: string, streamName: string, createDate: Date){
        super(streamUUID)
        this.executionResults = executionResults
        this.name = streamName
        this.createDate = createDate
    }

    public push(executionResult: ExecutionResult): boolean {
        if(this.executionResults.contains(executionResult)){
            this.executionResults.update(executionResult)
            return true
        }  

        this.executionResults.add(executionResult)
        return false
    }

    public remove(executionResult: ExecutionResult): boolean{
        if(!this.executionResults.contains(executionResult))
            return false
        
        this.executionResults.remove(executionResult.getId())
    }
}