import {makeAutoObservable} from 'mobx';
import {seat1, seat2, seat3, seat4} from './constants';
import {userActionsStore} from '../UserActionsStore/UserActionsStore';
import {userStore} from '../UserStore/UserStore';
import {ISeat} from '../../types';

import {v4} from 'uuid';

export class RoomStoreClass {
    id: string = 'room-1';
    name: string = 'My Room';
    seats: ISeat[] = [seat1, seat2, seat3, seat4];

    constructor() {
        makeAutoObservable(this);
    }

    changeSeatField = (seatId: string, field: keyof ISeat, value: string) => {
        const seat = this.seats.find(seat => seat.id === seatId);
        if (!seat || !seat[field]) return;
        // @ts-ignore
        seat[field] = value;
    };

    removeSeat = (seatId: string) => {
        this.seats = this.seats.filter(seat => seat.id !== seatId);
    };

    addSeat = () => {
        const seat: ISeat = {
            id: v4(),
        };
        this.seats.push(seat);
    };

    toggleSeatAvailability = (seatId: string) => {
        const seat = this.seats.find(seat => seat.id === seatId);
        if (!seat) return;
        const seatSelectedDaySchedule = seat!.schedule![userActionsStore.daySelected];
        seatSelectedDaySchedule.isAvailable = !seatSelectedDaySchedule.isAvailable;
        seatSelectedDaySchedule.takenByUserId = seatSelectedDaySchedule.takenByUserId ? undefined : userStore?.user?.id;
    };

}

export const roomStore = new RoomStoreClass();