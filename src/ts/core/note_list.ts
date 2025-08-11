import { notifyError } from "../ui.ts";
import Note, { type BaseNote } from "./note.ts";
import { getTotalValue, setPiggyBank } from "./piggyBank.ts";



export default class NoteCollection {

    private _notes: Note[]

    constructor() {
        this._notes = []
    }


    getNotes(): BaseNote[] {
        const notes: BaseNote[] = [];
        this._notes.forEach(currNote => notes.push(
            {
                uuid: currNote.uuid,
                value: currNote.value,
                amount: currNote.amount,
                color: currNote.color
            }
        ));
        return notes;
    }


    getNoteByUUID(uuid: string): Note {
        return this._notes.find(note => note.uuid === uuid)!;
    }


    decrementAll(note_uuids: string[]): void {
        for(const uuid of note_uuids) {
            this.getNoteByUUID(uuid).decrementNote();
        }
    }


    private _resetCollection(): void {
        document
            .getElementById("noteCollectionHeading")!
            .textContent = "No Notes Available";
    }

    init(): void {
        this._resetCollection();
        
        document
            .getElementById("addNewNoteForm")!
            .addEventListener(
                "submit",
                (event: SubmitEvent) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget as HTMLFormElement);
                    const value = Number(formData.get("note_value"));
                    if(value)
                        this.addNote(new Note(value))
                    else 
                        notifyError("Input is not provided for note value.");
                }
            );
    }


    addNote(note: Note): void {
        if(this._notes.find(currNote => currNote.value === note.value)) {
            notifyError(`A note with value ${note.value} already exists.`);
            return;
        }
        this._notes.push(note);
        this.render();
    }


    deleteNote(note: Note): void {
        const index = this._notes.indexOf(note)
        if(index !== -1) {
            const deletedNote = this._notes.splice(index, 1)[0];
            document.getElementById(deletedNote.uuid)?.remove();
            setPiggyBank(getTotalValue() - (deletedNote.value * deletedNote.amount));
            if(this._notes.length === 0)
                this._resetCollection();
        }
        else
            notifyError("Cannot find note.")
    }

    render(): void {
        document
            .getElementById("noteCollectionHeading")!
            .textContent = "Available Notes:";
        
        const noteCollection = document.getElementById("noteCollection")!;
        noteCollection.innerHTML = ''
        this._notes.forEach(
            (note: Note) => {
                noteCollection.innerHTML += `
                    <div
                        class="card gradient-${note.color}"
                        style="width: 15rem"
                        id="${note.uuid}"
                    >
                        <div class="card-body text-center">
                        <span class="fs-4"><span class="fw-bold">$<span class="noteValue">${note.value}</span></span></span>
                        <br>
                        <span class="fw-bold">X</span>
                        <span class="fs-4"><span class="fw-bold numberOfNotes">${note.amount}</span></span>
                        <div class="d-flex justify-content-center gap-2 mt-3" class="buttons">
                            <button class="btn btn-light plusNote">
                            <i class="bi bi-plus"></i>
                            </button>
                            <button class="btn btn-danger deleteNote">
                            <i class="bi bi-trash"></i>
                            </button>
                            <button class="btn btn-light minusNote">
                            <i class="bi bi-dash"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                `
            }
        )
        this._notes.forEach(
            (note: Note) => {
                document.getElementById(note.uuid)!
                    .querySelector(".plusNote")!
                    .addEventListener(
                        "click",
                        note.incrementNote
                    );
                document.getElementById(note.uuid)!
                    .querySelector(".minusNote")!
                    .addEventListener(
                        "click",
                        note.decrementNote
                    );
                document.getElementById(note.uuid)!
                    .querySelector(".deleteNote")!
                    .addEventListener(
                        "click",
                        () => this.deleteNote(note)
                    );
            }
        )
    }
}


