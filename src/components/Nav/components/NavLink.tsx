import {FC} from 'react';
import {observer} from 'mobx-react';
import {Link, NavLinkProps} from 'react-router-dom';

interface Props extends NavLinkProps {}

export const NavLink: FC<Props> = observer(({children, ...props}) => {
    return (
        <Link {...props} className={'font-bold text-sky-900 hover:opacity-80'}>
            {/*@ts-ignore*/}
            {children}
        </Link>
    );

});