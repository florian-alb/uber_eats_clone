import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import GuestMiddleware from '@/middleware/guest';
import React, {useMemo} from 'react';
import guestRoutes from './guest.routes';
import protectedRoutes from './protected.routes';
import ProtectedMiddleware from "@/middleware/protected.tsx";
import sharedRoutes from "@/routes/shared.routes.tsx";

const RouteProvider = ({children}: { children: React.ReactNode }) => {
    const router = useMemo(
        () =>
            createBrowserRouter([
                {
                    element: children, // All the providers
                    children: [
                        {element: <GuestMiddleware/>, children: guestRoutes},
                        {element: <ProtectedMiddleware/>, children: protectedRoutes},
                        ...sharedRoutes
                    ],
                },
            ]),
        [children]
    );
    return <RouterProvider router={router}/>;
};

export default RouteProvider;