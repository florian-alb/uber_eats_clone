import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStore} from '@/store/auth';

export default function GuestMiddleware() {
    const {user} = useAuthStore();

    if (user) return <Navigate to="/"/>;

    return <Outlet/>

}