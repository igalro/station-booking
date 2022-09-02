import {FC} from 'react';
import {observer} from 'mobx-react';
import {userStore} from '../../../stores';

export const SeatTableHeader: FC = observer(() => {
    const {isAdmin} = userStore;

    return (
        <thead>
        <tr className={'text-left'}>
            <th >Name</th>
            <th >Availability</th>
            {isAdmin() && (
                <>
                    <th>Remove</th>
                </>
            )}
        </tr>
        </thead>
    );
});