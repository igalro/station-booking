import {FC} from 'react';
import {userStore} from '../../stores';
import {observer} from 'mobx-react';
import {Button} from '../Button/Button';
import {NavLink} from './components/NavLink';

export const Nav: FC = observer(() => {
    const {user, logout} = userStore;

    return (
        <div className={'border-b-2 p-2 fixed top-0 w-full bg-white'}>
            <div className={'flex justify-between items-center pl-3 pr-5'}>
                <div className={'space-x-6'}>
                    <NavLink to={'/'} className={'font-bold text-sky-900'}>Station Order</NavLink>
                </div>
                <div className={'space-x-3 flex items-center'}>
                    <Button onClick={logout}>Logout</Button>
                    <div>
                        <span className={'text-gray-600 mr-1'}>Welcome</span>
                        <span className={'font-bold'}>{user?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );

});