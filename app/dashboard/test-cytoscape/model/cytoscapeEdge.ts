import { Edge } from '../../../model/bayesianNetwork/dag/edge'

export class CytoscapeEdge {
    data: CytoscapeEdgeData

    constructor(edge: Edge){
        this.data = new CytoscapeEdgeData(edge.source, edge.target)
    }
}

class CytoscapeEdgeData {
    source: string;
    target: string;

    constructor(source:string, target:string){
        this.source = source
        this.target = target
    }
}