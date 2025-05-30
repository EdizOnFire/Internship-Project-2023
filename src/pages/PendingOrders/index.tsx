import { IProduct } from '../../types/types.ts';
import PendingOrderComponent from './PendingOrderComponent.tsx';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store.ts';

const PendingOrders = () => {
        const orders = useSelector((state: RootState
        ) => state.orders.orders);
    const isLoading = false; // Placeholder for loading state, replace with actual loading logic

    return (
        <main id='pendingOrdersMain'>
            <div id='headingSection'>
                <span className='codeColumn'>Code</span>
                <span className='qtyColumn'>QTY</span>
                <span className='priceColumn'>Price</span>
                <span className='orderedByColumn'>Ordered By</span>
                <span className='orderDateColumn'>Order Date</span>
                <span className='actionColumn'>Action</span>
            </div>
            {orders?.length !== 0 && (
                orders?.map((order: IProduct) => (
                    <PendingOrderComponent order={order} key={order.id} />
                ))
            )}
            {(orders?.length === 0 || !orders) && !isLoading && <div className='order'>No Orders</div>}
            {isLoading && <div className='order'>Loading...</div>}
        </main>
    );
};

export default PendingOrders;
