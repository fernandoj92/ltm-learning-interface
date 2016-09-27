import { JsonNode, Node } from './node'
import { JsonEdge, Edge } from './edge'

export interface JsonDag {
    nodes: JsonNode[];
    edges: JsonEdge[];
}

export class Dag {
    nodes: Node[];
    edges: Edge[];

    constructor(nodes: Node[], edges: Edge[]){
        this.nodes = nodes
        this.edges = edges
    }
}