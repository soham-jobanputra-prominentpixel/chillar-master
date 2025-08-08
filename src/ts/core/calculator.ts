import type { BaseNote } from "./note.ts";


export class Result {

    constructor(
        public readonly cashToReturn: number,
        public readonly notesCombinations: BaseNote[][],
    ) {}

}


export const memoizedAmounts: number[] = [];


export function calculateResult(amount: number, notes: BaseNote[]): number {
    if(amount === 0)
        return 0;

    if(memoizedAmounts[amount])
        return memoizedAmounts[amount];

    let answer = Number.MAX_SAFE_INTEGER

    for(const note of notes) {
        let numberOfNotes = note.amount;
        if(amount >= note.value && numberOfNotes > 0) {
            numberOfNotes--;
            answer = Math.min(answer, calculateResult(amount - note.value, notes) + 1);
        }
    }

    return memoizedAmounts[amount] = answer; 
}


export function calculateResult2(amount: number, notes: BaseNote[]): string[] | -1 {

    if(amount === 0)
        return [];

    let answer: string[] | -1 = -1;

    for(const note of notes) {
        if(amount >= note.value && note.amount > 0) {
            note.amount--;
            const currAnswer = calculateResult2(Number((amount - note.value).toFixed(4)), notes)
            note.amount++;
            if(currAnswer !== -1) {
                answer = currAnswer.concat(note.uuid);
            }
        }
    }

    return answer;
}