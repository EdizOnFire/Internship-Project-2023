import { ReactNode, Suspense } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { IUser } from '../types/types';

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const loggedUser: IUser = JSON.parse(sessionStorage.getItem('user') as string);
    return (
        <>
            <Header loggedUser={loggedUser} />
            <div id='asideMain'>
                <Sidebar loggedUser={loggedUser}  />
                <Suspense>
                    {children}
                </Suspense>
            </div>
        </>
    );
};

export default Layout;