import { Home, Marketplace, Inventory, PendingOrders, MyOrders, NotFound } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRoute from './components/UserRoute';
import Layout from './components/Layout';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='*' element={<NotFound />} />
                <Route element={<Layout ><UserRoute /></Layout>}>
                    <Route path='marketplace' element={<Marketplace />} />
                    <Route path='my-orders' element={<MyOrders />} />
                    <Route path='inventory' element={<Inventory />} />
                    <Route path='pending-orders' element={<PendingOrders />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Navigation;