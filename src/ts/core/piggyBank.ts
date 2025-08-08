let totalValue = 0;


export function setPiggyBank(value: number) {
    totalValue = value;
    document.getElementById("totalValue")!.textContent = value.toString();
}


export function getTotalValue(): number {
    return totalValue;
}
