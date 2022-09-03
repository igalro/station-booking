import {FC} from 'react';
import {observer} from 'mobx-react';
import {userStore} from '../../../stores';
import {Input} from '../../../components';

interface Props {
    value?: string | number;
    onChange?: (value: string) => void;
}

export const SeatTableHeadline: FC<Props> = observer(({value, onChange}) => {
    const {isAdmin} = userStore;

    return (
        <td>
            {isAdmin() ? <Input onChange={onChange} value={value}/> : value}
        </td>
    );
});