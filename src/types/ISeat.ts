export interface ISeat {
    id: string;
    name?: string;
    schedule?: ISeatSchedule;
}

export interface ISeatScheduleStatus {
    isAvailable: boolean;
    takenByUserId?: string;
}

export interface ISeatSchedule {
    [day: string]: ISeatScheduleStatus;
}