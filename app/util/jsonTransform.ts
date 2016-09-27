import { JsonExecutionResult, ExecutionResult } from '../model/executionResult'
import { JsonDag, Dag } from '../model/bayesianNetwork/dag/dag'
import { JsonCpt, Cpt } from '../model/bayesianNetwork/cpt/cpt'

export function fromMyJson (executionResult: string): ExecutionResult {
    return JSON.parse(executionResult)
}

export function toMyJson (executionResult: ExecutionResult): string{
    return JSON.stringify(executionResult)
}