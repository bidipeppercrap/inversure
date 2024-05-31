export function parseDelimit(textNumber) {
    const rawFloat = parseFloat(textNumber || 0) ?? 0
    
    return Math.round(rawFloat * 100) / 100
}

export function toDelimit(number) {
    return Math.round(number * 100) / 100
}