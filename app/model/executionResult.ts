import { JsonBayesianNetwork, BayesianNetwork } from './bayesianNetwork/bayesianNetwork'

export interface JsonExecutionResult {
    bayesianNetwork: JsonBayesianNetwork;
    algorithm: string;
    index: number;
    nanoStart: number;
    nanoFinish: number;
}

export class ExecutionResult {
    bayesianNetwork: BayesianNetwork;
    algorithm: string;
    index: number;
    nanoStart: number;
    nanoFinish: number;

    constructor(bayesianNetwork: BayesianNetwork, algorithm: string, index: number, nanoStart: number, nanoFinish: number){
        this.bayesianNetwork = bayesianNetwork
        this.algorithm = algorithm
        this.index = index
        this.nanoStart = nanoStart
        this.nanoFinish = nanoFinish
    }
}