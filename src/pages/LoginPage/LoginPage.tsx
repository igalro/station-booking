import {userActionsStore, userStore} from '../../stores';
import {Button, Select} from '../../components';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';

export const LoginPage = observer(() => {
    const {allUsers, login} = userStore;
    const {selectedUserId, selectUser} = userActionsStore
    let navigate = useNavigate();

    const handleLogin = () => {
        login(selectedUserId);
        navigate('/');
    };

    return (
        <div className={'flex justify-center h-full'}>
            <div className={'flex self-center w-2/5 flex-col space-y-5'}>
                <div>
                    <Select
                        options={allUsers}
                        label="Select User"
                        onChange={selectUser}
                        disabled={allUsers.length === 0}
                        id="users"
                        value={selectedUserId}
                        placeholder={'Select user'}>
                    </Select>
                </div>
                <Button onClick={handleLogin}>Login</Button>

            </div>
        </div>
    );
});