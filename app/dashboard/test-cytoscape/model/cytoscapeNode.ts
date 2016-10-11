import { Node } from '../../../model/bayesianNetwork/dag/node'

export class CytoscapeNode{
    data: CytoscapeNodeData

    constructor(node: Node){
        this.data = new CytoscapeNodeData(node.id, node.name)
    }
}

class CytoscapeNodeData{

    id: string;
    name: string;

    constructor(id:string, name:string){
        this.id = id
        this.name = name
    }
}