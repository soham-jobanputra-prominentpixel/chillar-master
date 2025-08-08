import { notifyError } from "../ui.ts";
import { getTotalValue, setPiggyBank } from "./piggyBank.ts";

export default class Note {
    
    uuid: string;
    color: string;
    amount: number;

    constructor(
        public readonly value: number,
    ) {
        this.uuid = crypto.randomUUID();
        this.color = getRandomColor();
        this.amount = 0;
        this.incrementNote = this.incrementNote.bind(this);
        this.decrementNote = this.decrementNote.bind(this);
    }

    incrementNote(): void {
        this.amount++;
        setPiggyBank(getTotalValue() + this.value);
        document.getElementById(this.uuid)!
            .querySelector(".numberOfNotes")!
            .textContent = this.amount.toString();
    }

    decrementNote(): void {
        if(this.value <= getTotalValue() && this.amount > 0) {
            this.amount--;
            setPiggyBank(getTotalValue() - this.value);
            document.getElementById(this.uuid)!
                .querySelector(".numberOfNotes")!
                .textContent = this.amount.toString();
        } else
            notifyError("Cannot decrement.");
    }
}


class NoteDecrementError extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, NoteDecrementError.prototype);
        this.name = "NoteDecrementError";
    }

}

function getRandomColor(): "blue" | "pink" | "mint" | "sunny" | "peach" | "lavender" | "dark-blue" {
    const colors = ["blue", "pink", "mint", "sunny", "peach", "lavender", "dark-blue"] as const;
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

