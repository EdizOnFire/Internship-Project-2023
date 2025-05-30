import { IFormInputs, IProduct } from '../../types/types.ts';
import { useState, Dispatch, SetStateAction } from 'react';
import { useEditProductMutation } from '../../services/productsService.ts';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { uploadImage } from '../../utils/uploadImage.ts';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.tsx';
import {
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

type EditModalProps = {
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    product: IProduct;
    showEditModal: boolean;
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

const EditProductModal = ({ setProducts, product, showEditModal, setShowEditModal }: EditModalProps) => {
    const [categoryOption, setCategoryOption] = useState(product.category);
    const [imageUrl, setImageUrl] = useState(product.image || imagePlaceholder);
    const [editProduct] = useEditProductMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormInputs>({
        defaultValues: {
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            count: product.rating?.count ?? 0,
            price: product.price ?? 0,
            image: product.image
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: IFormInputs) => {
        data.count = data.count ?? 0;
        data.price = data.price ?? 0;

        const id = product.id;

        const editedProduct = {
            ...data,
            image: imageUrl === imagePlaceholder ? product.image : imageUrl,
            rating: { count: data.count }
        };

        const response = await editProduct({ id, data: editedProduct })

        if ('data' in response) {
            setProducts(oldProducts => oldProducts.map(p => p.id === editedProduct.id ? editedProduct : p));
            setShowEditModal(false);
            toast.success('Modified successfully!');
        }
    };

    return (
        <Modal showModal={showEditModal} setShowModal={setShowEditModal} >
            <form className='modalContent' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='leftModal'>
                        <h2>Modify Item</h2>
                        <TextField
                            className='formInput'
                            type='text'
                            label='Name *'
                            variant='standard'
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                            {...register('title', { required: 'Name field is required' })}
                        />
                        <TextField
                            className='description'
                            label='Description'
                            multiline
                            rows={4}
                            variant='standard'
                            {...register('description')}
                        />
                        <FormControl variant='standard' className='formInput'>
                            <InputLabel focused={false}>Category *</InputLabel>
                            <Select
                                value={categoryOption}
                                {...register('category', {
                                    onChange: (e) => setCategoryOption(e.target.value),
                                    required: 'Category field is required',
                                })}
                            >
                                <MenuItem value={categoryOption}>
                                    {product.category}
                                </MenuItem>
                                <MenuItem value='different category'>
                                    different category
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            className='formInput'
                            type='decimal'
                            label='Sale Price'
                            variant='standard'
                            {...register('price', {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                }
                            })}
                        />
                        <TextField
                            className='formInput'
                            type='number'
                            label='Qty *'
                            variant='standard'
                            error={Boolean(errors.count)}
                            helperText={errors.count?.message}
                            {...register('count', {
                                required: 'Quantity field is required',
                                min: {
                                    value: 0,
                                    message: 'Quantity must be 0 or higher'
                                },
                            })}
                        />
                    </div>
                    <div className='rightModal'>
                        <img className='currentImg' src={imageUrl} />
                        <input
                            id='editUploadInput'
                            className='inputImage'
                            accept='image/*'
                            type='file'
                            {...register('image', {
                                onChange: (e) => setImageUrl(uploadImage(e))
                            })}
                        />
                        <div className='uploadDelete'>
                            <label htmlFor='editUploadInput' className='uploadImg'>
                                Upload
                            </label>
                            <button type='button' className='deleteImg' onClick={() => setImageUrl(imagePlaceholder)}>Remove</button>
                        </div>
                    </div>
                </div>
                {isSubmitting
                    ? <CircularProgress className='circular' />
                    : <button type='submit'>Modify</button>
                }
            </form>
        </Modal>
    );
};


export default EditProductModal;
