export interface ISeat {
    id: string;
    name?: string;
    schedule?: ISeatSchedule;
}

export interface ISeatSchedule {
    [day: string]: string | undefined;
}