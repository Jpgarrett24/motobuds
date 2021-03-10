import { useContext } from 'react';

import AuthContext from './AuthContext';
import auth from '../api/auth';

const useAuth = () => {
    const { user, setUser, location, setLocation } = useContext(AuthContext);

    const logIn = async (token) => {
        localStorage.setItem('auth_token', token);
        const verification = await auth.verify(token);
        setUser(verification.data);
    }

    const logOut = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    }

    return { user, setUser, location, setLocation, logIn, logOut };
};

export default useAuth;