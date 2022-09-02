import {Select} from '../../components';
import {roomStore, userActionsStore} from '../../stores';
import {observer} from 'mobx-react';
import {daysOfWeek} from '../../utils';
import {SeatTable} from './components/SeatTable';

export const StationChooserPage = observer(() => {
    const {daySelected, selectDay} = userActionsStore;
    const {name} = roomStore;

    return (
        <div className={'mt-10'}>
            <div className={'text-3xl mb-5 font-bold'}>{name}</div>
            <Select
                onChange={selectDay}
                options={daysOfWeek}
                label="Choose a day"
                className="w-80"
                value={daySelected}>
            </Select>

            <div className={'space-y-2 mt-5'}>
                <SeatTable/>
            </div>
        </div>
    );
});