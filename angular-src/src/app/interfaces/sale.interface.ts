export interface Sale {
    client: string,
    date: Date,
    items: Array<any>,
    total: number,
    status: boolean,
    userTransaction: string,
    updateDate: Date
};
