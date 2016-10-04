export abstract class IdElement {
    
    protected id: string

    constructor(_id: string){
        this.id = _id
    }

    public getId(): string {
        return this.id
    }
}