import { JsonDag, Dag } from './dag/dag'
import { JsonCpt, Cpt } from './cpt/cpt'

export interface JsonBayesianNetwork {
    dag: JsonDag;
    cpts: JsonCpt[];
}

export class BayesianNetwork {
    dag: Dag;
    cpts: Cpt[];

    constructor(dag: Dag, cpts: Cpt[]){
        this.dag = dag
        this.cpts = cpts
    }
}