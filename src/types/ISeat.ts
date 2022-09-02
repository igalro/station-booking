export interface ISeat {
    id: string;
    name?: string;
    price?: number;
    schedule?: ISeatSchedule;
}

export interface ISeatScheduleStatus {
    isAvailable: boolean;
    takenByUserId?: string;
}

export interface ISeatSchedule {
    [day: string]: ISeatScheduleStatus;
}