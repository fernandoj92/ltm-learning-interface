export interface JsonEdge {
    source: string;
    target: string;
}

export class Edge {
    source: string;
    target: string;

    constructor(source:string, target:string){
        this.source = source
        this.target = target
    }
}