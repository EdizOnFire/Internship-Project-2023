import { Dispatch, SetStateAction } from 'react';
import { imagePlaceholder } from '../../utils/imagePlaceholder';
import { IProduct } from '../../types/types';
import Modal from '../../components/Modal';

type ProductModalProps = {
    product: IProduct;
    showProductModal: boolean;
    setShowProductModal: Dispatch<SetStateAction<boolean>>;
};

const ProductModal = ({ product, showProductModal, setShowProductModal }: ProductModalProps) => {
    return (
        <Modal showModal={showProductModal} setShowModal={setShowProductModal} modalType='productModal'>
            <div id='productModal'>
                <img id='modalImage' src={product.image || imagePlaceholder} />
                <div id='modalFrameOne'>
                    <div id='modalFrameTwo'>
                        <div id='productName'>
                            <b>{product.title}</b>
                            <small>{product.category}</small>
                        </div>
                        <div id='priceAndQty'>
                            <b>{product.price} BGN</b>
                            <small>Qty: {product.rating?.count}</small>
                        </div>
                    </div>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;