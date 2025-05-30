import { RootState } from 'redux/store.ts';
import { IProduct } from '../../types/types.ts';
import MyOrderComponent from './MyOrderComponent.tsx';
import { useSelector } from 'react-redux';

const MyOrders = () => {
    const orders = useSelector((state: RootState) => state.orders.orders);
    const isLoading = false; // Placeholder for loading state, replace with actual loading logic

    return (
        <main id='myOrdersMain'>
            <div id='headingSection'>
                <span className='nameColumn'>Name</span>
                <span className='qtyColumn'>QTY</span>
                <span className='priceColumn'>Price</span>
                <span className='orderDateColumn'>Order Date</span>
                <span className='orderStatus'>Status</span>
            </div>
            {orders?.length !== 0 && (
                orders?.map((order: IProduct) => (
                    <MyOrderComponent order={order} key={order.id} />
                ))
            )}
            {(orders?.length === 0 || !orders) && !isLoading && <div className='order'>No Orders</div>}
            {isLoading && <div className='order'>Loading...</div>}
        </main>
    );
};

export default MyOrders;
