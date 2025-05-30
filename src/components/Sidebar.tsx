import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { IUser } from '../types/types';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';

type SidebarProps = {
    loggedUser: IUser;
}

const Sidebar = ({ loggedUser }: SidebarProps) => {
    const onLogout = () => {
        sessionStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <aside>
            <div className='profileGreet profileGreet2'>
                <Avatar src={loggedUser?.picture || '/images/profile-image.png'} alt='Profile-picture' />
                <span>Hi, {loggedUser?.name}</span>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/marketplace' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <StorefrontOutlinedIcon className='icon' />
                            Marketplace
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/inventory' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <AssignmentOutlinedIcon className='icon' />
                            Inventory
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/pending-orders' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <PendingActionsOutlinedIcon className='icon' />
                            Pending Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my-orders' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <LocalMallOutlinedIcon className='icon' />
                            My Orders
                        </NavLink>
                    </li>
                    <li id='logout' >
                        <a className='navButton' onClick={onLogout}>
                            <LogoutOutlinedIcon className='icon' />
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </aside >
    )
}

export default Sidebar;