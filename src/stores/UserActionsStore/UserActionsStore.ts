import {makeAutoObservable} from 'mobx';

export class UserActionsStoreClass {
    daySelected: string = '1';
    selectedUserId?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    selectDay = (daySelected: string) => {
        this.daySelected = daySelected;
    };

    selectUser = (userId: string) => {
        this.selectedUserId = userId;
    };
}

export const userActionsStore = new UserActionsStoreClass();