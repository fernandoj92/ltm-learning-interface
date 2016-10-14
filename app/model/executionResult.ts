import { IdElement } from './abstract/idElement'
import { JsonBayesianNetwork, BayesianNetwork } from './bayesianNetwork/bayesianNetwork'
import * as UUID from '../util/uuid'

export interface JsonExecutionResult {
    streamId: string;
    bayesianNetwork: JsonBayesianNetwork;
    algorithm: string;
    index: number;
    nanoStart: number;
    nanoFinish: number;
}

export class ExecutionResult extends IdElement{
    streamId: string;
    bayesianNetwork: BayesianNetwork;
    algorithm: string;
    index: number;
    nanoStart: number;
    nanoFinish: number;

    constructor(streamId: string, bayesianNetwork: BayesianNetwork, algorithm: string, index: number, nanoStart: number, nanoFinish: number){
        super(UUID.randomUUID())
        this.streamId = streamId
        this.bayesianNetwork = bayesianNetwork
        this.algorithm = algorithm
        this.index = index
        this.nanoStart = nanoStart
        this.nanoFinish = nanoFinish
    }

    public static construct(json: JsonExecutionResult): ExecutionResult{
        return new ExecutionResult(
            json.streamId,
            json.bayesianNetwork,
            json.algorithm,
            json.index,
            json.nanoStart,
            json.nanoFinish
        );
    }
}