interface ITaskFull {
    id: string
    actionBack: actionBack
    type: type
    timeStart: string
    route: IRoute
    driver: IDriver[]
    actionFront: actionFrom
}

interface IDriver {
    id: string
    name: string
}

interface IRoute {
    id: string
    from: string
    to: string[] // массив всех точек куда
    timeToExecute: string
    timeStart: string // время начала выполнения
}

enum actionBack {
    update = 0,
    delete = 1,
    create = 2
}
enum actionFrom {
    loading = 0,
    unloading = 1,
}
enum type {
    resolve = 0,
    reject = 1,
    fulfill = 2,
    notExecuted = 3,
}

interface ITaskMinDrive {
    id: string
    timeStart: string
    route: IRoute
    actionFrom: actionFrom
}

