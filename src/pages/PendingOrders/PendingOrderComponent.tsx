import { IProduct } from '../../types/types';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeOrder } from '../../redux/ordersSlice';

type PendingOrderProps = {
    order: IProduct;
}

const PendingOrderComponent = ({ order }: PendingOrderProps) => {
    const dispatch = useDispatch();
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const newDate = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const onComplete = async () => {
        dispatch(removeOrder(order.id));
        toast.success('Order completed!');
    }
    
    return (
        <Fade in={true} timeout={1000}>
            <div className='order' role='cell'>
                <div className='firstThree'>
                    <span className='codeColumn'>{order.id}</span>
                    <span className='qtyColumn'>{order.rating?.count}</span>
                    <span className='priceColumn'>{order.price} BGN</span>
                </div>
                <span className='orderedByColumn'>{user.email}</span>
                <span className='orderDateColumn'>{newDate}</span>
                <button className='actionColumn completeButton' onClick={onComplete}>Complete</button>
            </div >
        </Fade>
    );
};

export default PendingOrderComponent;