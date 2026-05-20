"use client"
import { Button } from '../ui/button';
import { signOutUser } from '@/actions/auth';



const handleLogout = () => {
    signOutUser();
};

const LogoutButton = () => {
    return (
        <div onClick={handleLogout}>
            Logout
        </div>
    );
};

export default LogoutButton;