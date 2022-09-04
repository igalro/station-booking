import {makeAutoObservable} from 'mobx';
import {userActionsStore} from '../UserActionsStore/UserActionsStore';
import {userStore} from '../UserStore/UserStore';
import {ISeat} from '../../types';
import {collection, doc, updateDoc, query, onSnapshot, addDoc, deleteDoc, orderBy} from 'firebase/firestore';
import {firestore} from '../../utils';
import {defaultRoom} from "../../utils/constants/defaultRoom";

const seatsCollection = collection(doc(collection(firestore, 'rooms'), defaultRoom), 'seats');

export class RoomStoreClass {
    id: string = 'room-1';
    name: string = 'Station Booking';
    seats: ISeat[] = [];

    constructor() {
        makeAutoObservable(this);
        this.getSeats()
    }

    getSeats = async () => {
        const q = query(seatsCollection, orderBy('name'));
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const doc = change.doc;
                const seat: ISeat = {...doc.data(), id: doc.id};
                if (change.type === 'added') {
                    this.seats.push(seat);
                }
                if (change.type === 'modified') {
                    const seatIndex = this.seats.findIndex(s => s.id === seat.id);
                    if (seatIndex !== -1) {
                        this.seats[seatIndex] = seat;
                    }
                }
                if (change.type === 'removed') {
                    const seatIndex = this.seats.findIndex(s => s.id === seat.id);
                    if (seatIndex !== -1) {
                        this.seats.splice(seatIndex, 1);
                    }
                }
            });
        });
    };

    changeSeatField = (seatId: string, field: keyof ISeat, value: string) => {
        const seat = this.seats.find(seat => seat.id === seatId);
        if (!seat || !seat[field]) return;
        seat[field] = value;
    };

    removeSeat = async (seatId: string) => {
        debugger
        await deleteDoc(doc(seatsCollection, seatId));
    };

    addSeat = async () => {
        const seatsCollection = collection(doc<any>(collection(firestore, 'rooms'), defaultRoom), 'seats');
        const newSeat = {
            name: `Seat ${this.seats.length + 1}`,
            schedule: {},
        };
        await addDoc<any>(seatsCollection, {...newSeat});
    };

    toggleSeatAvailability = async (seat: ISeat) => {
        const selectedDay = userActionsStore.daySelected;
        const {id} = userStore.user;
        const takenBy = seat.schedule?.[selectedDay] === id || (seat.schedule?.[selectedDay] && userStore.isAdmin()) ? '' : id;
        const schedule = {...(seat.schedule || {}), [selectedDay]: takenBy};
        await updateDoc(doc<any>(seatsCollection, seat.id), {schedule});
    };
}

export const roomStore = new RoomStoreClass();