import * as bootstrap from "bootstrap";


function showToast(message: string, bgClass: string): void {
    const template = document.getElementById("toastTemplate")! as HTMLTemplateElement;
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const toast = clone.querySelector(".toast")!;

    toast.classList.add(bgClass);
    toast.querySelector(".toast-body")!.textContent = message;

    document.getElementById("toastBox")!.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();

    toast.addEventListener("hidden.bs.toast", () => {
        toast.remove();
    });
}


export const notifySuccess = (message: string) => showToast(message, "bg-success");
export const notifyError = (message: string) => showToast(message, "bg-danger");
export const notifyInfo = (message: string) => showToast(message, "bg-info");


