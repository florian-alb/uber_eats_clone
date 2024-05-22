import Home from "@/pages/home";
import type {RouteObject} from "react-router-dom";
import ErrorPage from "@/pages/errors/ErrorPage.tsx";
import Checkout from "@/pages/checkout";
import {Dashboard} from "@/pages/dashboards/pages/dashboardHome";
import DashboardOrders from "@/pages/dashboards/pages/dashboardOrders";
import DashboardProducts from "@/pages/dashboards/pages/dashboardProducts";
import {ProductEditor} from "@/pages/dashboards/pages/dashboardProducts/components/ProductEditor.tsx";


const protectedRoutes: RouteObject[] = [
    {
        path: "/address/edit",
        element: <Home/>
    },
    {
        path: "/checkout/",
        element: <Checkout/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/dashboard/:shopId",
        element: <Dashboard/>
    },
    {
        path: "/dashboard/:shopId/orders",
        element: <DashboardOrders/>
    },
    {
        path: "/dashboard/:shopId/products",
        element: <DashboardProducts/>
    },
    {
        path: "/dashboard/:shopId/products/edit",
        element: <ProductEditor/>
    }
]

export default protectedRoutes