// deno-lint-ignore-file no-unused-vars
import "../styles/scss/style.scss";
import * as bootstrap from "bootstrap"
import NoteList from "./core/note_list.ts";
import Note from "./core/note.ts";

const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))


const notes = new NoteList();

document.getElementById("addNoteButton")!
    .addEventListener(
        "click",
        function() {
            const input_element = document.getElementById("note-list")! as HTMLInputElement;
            notes.addNote(
                new Note(
                    Number(input_element.value)
                )
            )
        }
    )