import {FC} from 'react';
import styles from '../styles/styles.module.scss'
import {observer} from 'mobx-react';
import {roomStore, userActionsStore, userStore} from '../../../stores';
import {SeatTableCard} from './SeatTableCard';
import {Button} from '../../../components';

export const SeatsMap: FC = observer(() => {
    const {seats, addSeat} = roomStore;
    const {user, isAdmin} = userStore;
    const {daySelected} = userActionsStore;

    return (
        <div className={'space-y-2 mt-5'}>
                <div className={styles.cards}>
                {seats.map((seat) => {
                    const seatForSelectedDay = seat.schedule?.[daySelected];
                    const isSeatAvailable = seatForSelectedDay?.isAvailable;
                    const isTakenByCurrentUser = seatForSelectedDay?.takenByUserId === user?.id;
                    const isDisabled = isSeatAvailable === false && !isTakenByCurrentUser;
                    const buttonText = (() => {
                        if (isSeatAvailable) return 'Reserve';
                        if (isTakenByCurrentUser) return 'Reserved';
                        return 'Not available';
                    })();
                    return (
                        <SeatTableCard
                            key={seat.id}
                            isSeatAvailable={isSeatAvailable}
                            isDisabled={isDisabled}
                            buttonText={buttonText}
                            seat={seat}
                        />
                    );
                })}
                {isAdmin() && (
                    <tr className={'text-center'}>
                        <td  colSpan={3}>
                            <Button onClick={addSeat}>
                                {'+ Add seat'}
                            </Button>
                        </td>
                    </tr>
                )}
                </div>
        </div>
    );
});