import { JsonParameter, Parameter } from './parameter'
import { JsonParentAssignment, ParentAssignment} from './parentAssignment'

export interface JsonRow {
    parameters: JsonParameter[];
    parentAssignments: JsonParentAssignment[];
}

export class Row {
    parameters: Parameter[];
    parentAssignments: ParentAssignment[];

    constructor(parameters: Parameter[], parentAssignments: ParentAssignment[]){
        this.parameters = parameters
        this.parentAssignments = parentAssignments
    }
}