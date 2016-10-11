import { IdElement } from './IdElement'

export class IdCollection <T extends IdElement> {

    contents: Array<T>

    constructor(){
        this.contents = new Array<T>()
    }


    public contains (element: T): boolean {
        return this.containsId(element.getId())
    }

    public containsId(_id: string): boolean {
        for (var i = 0; i < this.contents.length; i++) 
            if(this.contents[i].getId() === _id)
                return true;

        return false;
    }

    public get(_id: string): T {
        for (var i = 0; i < this.contents.length; i++) 
            if(this.contents[i].getId() === _id)
                return this.contents[i];

        return null;
    }

    public remove(_id: string): boolean {
        for (var i = 0; i < this.contents.length; i++) 
            if(this.contents[i].getId() === _id){
                this.contents.splice(i, 1)
                return true;
            }

        return false;
    }

    public add(element: T): void {
        this.contents.push(element)
    }

    public update(element: T): void {
        let index = this.getIndex(element)
        if(index !== -1)
            this.contents[index] = element
    }

    public size(): number{
        return this.contents.length;
    }

    private getIndex(element: T): number {
         for (var i = 0; i < this.contents.length; i++) 
            if(this.contents[i].getId() === element.getId())
                return i;
        return -1;
    }
}