import {makeAutoObservable} from 'mobx';
import {IUser} from '../../types';
import {firestore} from '../../utils';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {userActionsStore} from '../UserActionsStore/UserActionsStore';

export class UserStoreClass {
    user?: IUser;
    allUsers: IUser[] = [];
    isLoggedIn = false;

    constructor() {
        makeAutoObservable(this);
        this.getUsers();
    }

    logout = () => {
        this.isLoggedIn = false;
        this.user = undefined;
    };

    login = (userId?: string) => {
        if (!userId) return;
        this.user = this.allUsers.find(user => user.id === userId);
        this.isLoggedIn = true;
    };

    isAdmin = () => {
        return this.user?.isAdmin;
    };

    getUsers = async () => {
        const usersCollection = collection(firestore, 'users');
        const q = query(usersCollection, orderBy('name'));
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    debugger
                    const user = change.doc.data() as IUser;
                    this.allUsers.push(user);
                }
                if (change.type === 'modified') {
                    debugger
                    const user = change.doc.data() as IUser;
                    const userIndex = this.allUsers.findIndex(u => u.id === user.id);
                    if (userIndex !== -1) {
                        this.allUsers[userIndex] = user;
                    }
                }
                if (change.type === 'removed') {
                    debugger
                    const user = change.doc.data() as IUser;
                    const userIndex = this.allUsers.findIndex(u => u.id === user.id);
                    if (userIndex !== -1) {
                        this.allUsers.splice(userIndex, 1);
                    }
                }
            });
            userActionsStore.selectedUserId = this.allUsers?.[0]?.id || '';
        });
    };
}

export const userStore = new UserStoreClass();