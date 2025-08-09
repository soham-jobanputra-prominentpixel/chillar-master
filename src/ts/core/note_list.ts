import type Note from "./note.ts";


export default class NoteList {

    private notes: Note[]
    
    constructor() {
        this.notes = [];
    }


    private canAdd(note: Note): boolean {
        return !(this.notes.find(currNote => currNote.value === note.value));
    }


    addNote(note: Note): void {
        if(this.canAdd(note))
            this.notes.push(note);
        else 
            throw new NoteAlreadyExistsError();
    }
}

class NoteAlreadyExistsError extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, NoteAlreadyExistsError.prototype);
        this.name = "NoteAlreadyExistsError";
    }

}