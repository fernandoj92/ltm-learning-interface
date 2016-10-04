import { IdElement } from './IdElement'

export class IdCollection <T extends IdElement> {

    contents: Array<IdElement>

    constructor(){
        this.contents = new Array<IdElement>()
    }

    public contains (element: IdElement): boolean {
        return this.containsId(element.getId())
    }

    public containsId(_id: string): boolean {
        for (var i = 0; i < this.contents.length; i++) 
            if(this.contents[i].getId() === _id)
                return true;

        return false;
    }

    public get(_id: string): IdElement {
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

    public add(element: IdElement): void {
        this.contents.push(element)
    }
}