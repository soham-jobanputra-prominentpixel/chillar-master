let totalMoneyAmount = 0;


export function setPiggyBank(newMoneyAmount: number) {
    totalMoneyAmount = Number(newMoneyAmount.toFixed(4));
    document.getElementById("totalValue")!.textContent = newMoneyAmount.toString();
}


export function getTotalValue(): number {
    return totalMoneyAmount;
}
