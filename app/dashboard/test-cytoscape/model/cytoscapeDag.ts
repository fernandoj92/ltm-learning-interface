import { CytoscapeNode } from './cytoscapeNode'
import { CytoscapeEdge } from './cytoscapeEdge'
import { Dag } from '../../../model/bayesianNetwork/dag/dag'

export class CytoscapeDag {
    nodes: CytoscapeNode[] = new Array();
    edges: CytoscapeEdge[] = new Array();

    constructor(dag: Dag){

        for(let i = 0; i < dag.nodes.length; i++)
            this.nodes.push(new CytoscapeNode(dag.nodes[i]))
        
        for(let i = 0; i < dag.edges.length; i++)
            this.edges.push(new CytoscapeEdge(dag.edges[i]))
    }
}