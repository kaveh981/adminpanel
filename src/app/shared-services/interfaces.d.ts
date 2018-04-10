declare const enum Status {
    active = 0,
    inactive,
    deleted
}

interface Creator {
    creatorId: number,
    name?: string,
    lastName?: string
}
