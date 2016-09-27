import { JsonRow, Row } from './row'

export interface JsonCpt {
    label: string;
    variableID: string;
    parentIDs: string[];
    rows: JsonRow[];
}

export class Cpt {
    label: string;
    variableID: string;
    parentIDs: string[];
    rows: Row[];

    constructor(label: string, variableID: string, parentIDs: string[], rows: Row[]){
        this.label = label
        this.variableID = variableID
        this.parentIDs = parentIDs
        this.rows = rows
    }
}