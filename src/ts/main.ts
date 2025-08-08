import "../styles/scss/style.scss";
import * as bootstrap from "bootstrap"
import { notifyError, notifyInfo, setTransaction } from "./ui.ts";
import NoteCollection from "./core/note_list.ts";
import { setPiggyBank } from "./core/piggyBank.ts";
import { memoizedAmounts, calculateResult2 } from "./core/calculator.ts";


const toastElList = document.querySelectorAll('.toast')
toastElList.forEach(toastEl => new bootstrap.Toast(toastEl))
export const noteCollection = new NoteCollection();



setPiggyBank(0);
noteCollection.init();


document.getElementById("paymentForm")!
    .addEventListener(
        "submit",
        function(event: SubmitEvent) {
            event.preventDefault();

            const formData = new FormData(this as HTMLFormElement);
            const bill = Number(formData.get("billAmount"));
            const paid = Number(formData.get("paidAmount"));

            if(!(!!bill && !!paid)) {
                notifyError("Provide missing inputs.");
                return;
            }

            if(paid < bill) {
                setTransaction(`<i class="bi bi-x-lg text-danger" style="font-size: 10rem;"></i>`);
                notifyError("Not enough cash to pay bill.");
                return;
            } else if(paid === bill) {
                setTransaction("$0.00");
                notifyInfo("Nothing to return, bill paid successfully");
            } else {
                memoizedAmounts.length = 0;
                const calculatedResult = calculateResult2(Number((paid - bill).toFixed(4)), noteCollection.getNotes())
                // const finalResult = calculatedResult === Number.MAX_SAFE_INTEGER ? -1 : calculatedResult;
                if(calculatedResult !== -1) {
                    setTransaction(`$${(paid - bill).toFixed(2)}`);
                    noteCollection.decrementAll(calculatedResult);
                    notifyInfo(`${calculatedResult.map(uuid => noteCollection.getNoteByUUID(uuid).value)}`);
                } else {
                    setTransaction(`<i class="bi bi-x-lg text-danger" style="font-size: 10rem;"></i>`);
                    notifyError("Cannot pay bill");
                }   
            }

        }
    )