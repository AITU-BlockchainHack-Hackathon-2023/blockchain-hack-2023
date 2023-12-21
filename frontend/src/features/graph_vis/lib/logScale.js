export function logScale(balance) {
    // Параметры для логарифмического масштабирования
    const maxBalance= 10000
    const minSize= 10
    const maxSize= 100
    const minBalance = 1

    // Убедитесь, что баланс не меньше минимального порога (например, 1),
    // чтобы избежать ошибки при вычислении логарифма
    balance = Math.max(balance, minBalance);

    return minSize + (Math.log(balance) - Math.log(minBalance))
        / (Math.log(maxBalance) - Math.log(minBalance))
        * (maxSize - minSize);
}


