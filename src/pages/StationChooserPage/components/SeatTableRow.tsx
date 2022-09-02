import {FC} from 'react';
import {observer} from 'mobx-react';
import {roomStore, userStore} from '../../../stores';
import {Button} from '../../../components';
import {ISeat} from '../../../types';
import {SeatTableCell} from './SeatTableCell';

interface Props {
    seat: ISeat;
    isDisabled: boolean;
    isSeatAvailable?: boolean;
    buttonText: string;
}

export const SeatTableRow: FC<Props> = observer(({seat, isDisabled, isSeatAvailable, buttonText}) => {
    const {toggleSeatAvailability, removeSeat, changeSeatField} = roomStore;
    const {isAdmin} = userStore;
    const seatId = seat.id;
    return (
        <tr key={seat.id}>
            <SeatTableCell onChange={(value: string) => changeSeatField(seatId, 'name', value)} value={seat.name}/>
            <td>
                <Button
                    onClick={() => toggleSeatAvailability(seatId)}
                    disabled={isDisabled}
                    className={isSeatAvailable ? 'bg-green-600' : 'bg-red-700'}
                >
                    {buttonText}
                </Button>
            </td>
            {isAdmin() && (
                <td>
                    <Button
                        className={'bg-red-700'}
                        onClick={() => removeSeat(seatId)}>
                        {'Remove'}
                    </Button>
                </td>
            )}
        </tr>
    );
});