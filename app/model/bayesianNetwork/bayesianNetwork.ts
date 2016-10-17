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

    public static construct(jsonDag: JsonDag, jsonCpts: JsonCpt[]): BayesianNetwork{
        let cpts =  new Array<Cpt>();
        for(let i=0; i<jsonCpts.length; i++)
            cpts.push(new Cpt(
                jsonCpts[i].label,
                jsonCpts[i].variableID,
                jsonCpts[i].parentIDs,
                jsonCpts[i].rows
            ));
        
        let dag = new Dag(jsonDag.nodes, jsonDag.edges)

        return new BayesianNetwork(dag, cpts)
    }
}