let totalValue = 0;


export function setPiggyBank(value: number) {
    totalValue = Number(value.toFixed(4));
    document.getElementById("totalValue")!.textContent = value.toString();
}


export function getTotalValue(): number {
    return totalValue;
}
