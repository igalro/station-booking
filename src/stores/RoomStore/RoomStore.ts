import {makeAutoObservable} from 'mobx';
import {seat1, seat2, seat3, seat4, seat5, seat6, seat7, seat8} from './constants';
import {userActionsStore} from '../UserActionsStore/UserActionsStore';
import {userStore} from '../UserStore/UserStore';
import {ISeat} from '../../types';
import {collection, doc, updateDoc, setDoc} from 'firebase/firestore';
import {firestore} from '../../utils';

export class RoomStoreClass {
    id: string = 'room-1';
    name: string = 'Station Booking';
    seats: ISeat[] = [seat1, seat2, seat3, seat4, seat5, seat6, seat7, seat8];

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

    addSeat = async () => {
        const roomsCollection = collection(firestore, 'rooms');
        const getRoomDocument = doc(roomsCollection, this.id);
        const newSeat: { id: string ; name: string ; schedule: {}} = {
            id: `seat-${this.seats.length + 1}`,
            name: `Seat ${this.seats.length + 1}`,
            schedule: {},
        };
        await setDoc(getRoomDocument, {seats: [...this.seats, newSeat]});
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