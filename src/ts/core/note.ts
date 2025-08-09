export default class Note {
    
    uuid: string;

    constructor(
        public readonly value: number,
        public amount: number = 0,
    ) {
        this.uuid = crypto.randomUUID();
    }


    render(): HTMLDivElement {
        const noteTemplate = document.getElementById("noteTemplate")! as HTMLTemplateElement;
        const note = noteTemplate.content.cloneNode(true) as HTMLDivElement;

        note.id = this.uuid;
        note.querySelector("noteValue")!.textContent = this.value.toString();
        note.querySelector("numberOfNotes")!.textContent = this.amount.toString();
        note.querySelector("plusNote")!
            .addEventListener(
                "click",
                this.incrementNote
            )
        note.querySelector("minusNote")!
            .addEventListener(
                "click",
                this.decrementNote
            )
        note.querySelector("deleteNote")!
            .addEventListener(
                "click",
                this.deleteNote
            )
        
        return note;
    }

    incrementNote(): HTMLDivElement {
        this.amount++;
        return this.render();
    }

    decrementNote(): HTMLDivElement {
        if(this.amount > 0) {
            this.amount--;
            return this.render();
        }
        throw new NoteDecrementError();
    }

    deleteNote(): void {
        document.removeChild(document.getElementById(this.uuid)!);
    }
    
}


class NoteDecrementError extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, NoteDecrementError.prototype);
        this.name = "NoteDecrementError";
    }

}

