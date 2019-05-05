export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomIndex = (length: number): number => {
    const i = randomInt(0, length - 1)
    return i
}

export const pick = (xs: any[]) => {
    const i = randomIndex(xs.length)
    const x = xs[i]
    return x
}

export const log = console.log.bind(console)