export interface JsonParentAssignment {
    parent: string;
    value: number;
}

export class ParentAssignment {
    parent: string;
    value: number;

    constructor(parent: string, value: number){
        this.parent = parent
        this.value = value
    }
}