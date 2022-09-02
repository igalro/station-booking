import {FC} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {userStore} from '../../stores';
import {observer} from 'mobx-react';
import {Nav} from '../index';

export const PrivateRoutes: FC = observer(() => {
    const {isLoggedIn} = userStore;

    if (!isLoggedIn) return <Navigate to="/login"/>;

    return (
        <>
            <Nav/>
            <div className={'mt-20 m-8'}>
                <Outlet/>
            </div>
        </>
    );

});