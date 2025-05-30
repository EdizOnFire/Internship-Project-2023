import { useState } from 'react';
import { IProduct } from '../../types/types.ts';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Popup from '../../components/Popup.tsx';
import { useDispatch } from 'react-redux';
import { removeOrder } from '../../redux/ordersSlice.ts';
import { toast } from 'react-toastify';

type MyOrderProps = {
    order: IProduct;
}

const MyOrderComponent = ({ order }: MyOrderProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const newDate = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const dispatch = useDispatch();

    const onCancel = async () => {
        dispatch(removeOrder(order.id));
        setAnchorEl(null);
        toast.info('Order declined.');
    }

    const PopupMessage: () => JSX.Element = () => {
        return (
            <p>
                Are you sure you want to reject this order?
            </p>
        )
    };

    return (
        <>
            <Popup PopupMessage={PopupMessage} onYes={onCancel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={1000}>
                <div className='order' role='cell'>
                    <span className='nameColumn'>{order.title}</span>
                    <div className='firstTwo'>
                        <span className='qtyColumn'>{order.rating?.count}</span>
                        <span className='priceColumn'>{order.price} BGN</span>
                    </div>
                    <span className='orderDateColumn'>{newDate.toString()}</span>
                    <div className='orderStatus'>
                        <span>Pending</span>
                        <a className='cancelOrder' onClick={e => setAnchorEl(e.currentTarget)}>
                            <CloseIcon />
                        </a>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default MyOrderComponent;