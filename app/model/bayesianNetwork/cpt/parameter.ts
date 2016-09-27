export interface JsonParameter {
    parameter: string;
    value: number;
}

export class Parameter {
    parameter: string;
    value: number;

    constructor(parameter: string, value: number) {
        this.parameter = parameter
        this.value = value
    }    
}
