// deno-lint-ignore-file no-unused-vars
import "../styles/scss/style.scss";
import * as bootstrap from "bootstrap"
import { notifyError } from "./ui.ts";
import NoteCollection from "./core/note_list.ts";
import { setPiggyBank } from "./core/piggyBank.ts";


const toastElList = document.querySelectorAll('.toast')
toastElList.forEach(toastEl => new bootstrap.Toast(toastEl))
const noteCollection = new NoteCollection();



setPiggyBank(0);
noteCollection.init();
