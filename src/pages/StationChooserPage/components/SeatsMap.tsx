import {FC} from 'react';
import styles from '../styles/styles.module.scss'
import {observer} from 'mobx-react';
import {roomStore, userActionsStore, userStore} from '../../../stores';
import {SeatTableCard} from './SeatTableCard';
import {Button} from '../../../components';

export const SeatsMap: FC = observer(() => {
    const {seats, addSeat} = roomStore;
    const { isAdmin} = userStore;

    return (
        <div className={styles.cards}>
            {seats.map((seat) => (
                <SeatTableCard
                    key={seat.id}
                    seat={seat}
                />
            ))}
            {isAdmin() && (
                <div className={styles.adminButton}>
                    <Button onClick={addSeat}>
                        {'+ Add seat'}
                    </Button>
                </div>
            )}
        </div>
    );
});