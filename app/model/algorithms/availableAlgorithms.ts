export enum AvailableAlgorithms{
    ABI,
    SALL
}

export interface ABIParameters {
    selectedFile: string;
    fssMeasure: string;
    maxIslandSize: number;
    baseLvCardinality: number;
    udTestThreshold: number;
    batchSize: number;
}

export interface SALLParameters {

}