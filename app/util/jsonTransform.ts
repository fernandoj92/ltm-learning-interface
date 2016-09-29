import { JsonExecutionResult, ExecutionResult } from '../model/executionResult'
import { JsonDag, Dag } from '../model/bayesianNetwork/dag/dag'
import { JsonCpt, Cpt } from '../model/bayesianNetwork/cpt/cpt'

export function checkExecutionResultJson(executionResultJson: any){
    let result: JsonExecutionResult = executionResultJson

    if(result.algorithm == void 0 
    || result.bayesianNetwork == void 0
    || result.index == void 0
    || result.nanoFinish == void 0
    || result.nanoStart == void 0)
        throw("Invalid Json file format");
    
}