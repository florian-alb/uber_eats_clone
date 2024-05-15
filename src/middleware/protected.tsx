import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStore} from '@/store/auth';

export default function ProtectedMiddleware() {
    const {user} = useAuthStore();

    if (!user) return <Navigate to="/login"/>;

    return <Outlet/>

}