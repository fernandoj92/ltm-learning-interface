import { JsonRow, Row } from './row'
import * as UUID from '../../../util/uuid'

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
    uniqueId: string

    constructor(label: string, variableID: string, parentIDs: string[], rows: Row[]){
        this.uniqueId = UUID.randomUUID();
        this.label = label
        this.variableID = variableID
        this.parentIDs = parentIDs
        this.rows = rows
    }
}