import { IFormInputs, IProduct } from '../../types/types.ts';
import { useState, Dispatch, SetStateAction } from 'react';
import { useCreateProductMutation } from '../../services/productsService.ts';
import { useForm, Controller } from 'react-hook-form';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { uploadImage } from '../../utils/uploadImage.ts';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.tsx';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    FormHelperText,
} from '@mui/material';

type AddModalProps = {
    products: IProduct[] | undefined;
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    showAddModal: boolean;
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddProductModal = ({
    setProducts,
    showAddModal,
    setShowAddModal,
}: AddModalProps) => {
    const [createProduct] = useCreateProductMutation();
    const [imageUrl, setImageUrl] = useState(imagePlaceholder);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<IFormInputs>({
        defaultValues: {
            id: undefined,
            title: '',
            description: '',
            price: undefined,
            count: undefined,
            image: '',
            category: ''
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: IFormInputs): Promise<void> => {
        data.count = data.count ?? 0;
        data.price = data.price ?? 0;

        const response = await createProduct(data) as { data: IProduct };
        if ('error' in response) {
            return;
        }

        const responseData = response.data;
        const id = responseData.id;

        const newProduct = { ...data, id: id, image: imageUrl, rating: { count: data.count } };
        setProducts((oldProducts) => [...oldProducts, newProduct]);

        toast.success('Created successfully!');
        setShowAddModal(false);
        setImageUrl(imagePlaceholder);
        reset();
    };

    return (
        <Modal showModal={showAddModal} setShowModal={setShowAddModal}>
            <form className='modalContent' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='leftModal'>
                        <h2>Add New Item</h2>
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
                        <Controller
                            control={control}
                            name='category'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Category field is required'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl variant='standard' className='formInput'>
                                    <InputLabel htmlFor='category' focused={false}>Category *</InputLabel>
                                    <Select
                                        value={value}
                                        error={Boolean(errors.category)}
                                        onChange={onChange}
                                        inputProps={{
                                            id: 'category'
                                        }}
                                    >
                                        <MenuItem value='this category'>
                                            this category
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText error>
                                        {errors.category && errors.category.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
                        <TextField
                            className='formInput'
                            type='number'
                            label='Sale Price'
                            variant='standard'
                            error={Boolean(errors.price)}
                            helperText={errors.price?.message}
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
                            id='uploadInput'
                            className='inputImage'
                            accept='image/*'
                            type='file'
                            {...register('image', {
                                onChange: (e) => setImageUrl(uploadImage(e))
                            })}
                        />
                        <div className='uploadDelete'>
                            <label htmlFor='uploadInput' className='uploadImg'>
                                Upload
                            </label>
                            <button type='button' className='deleteImg' onClick={() => setImageUrl(imagePlaceholder)}>Remove</button>
                        </div>
                    </div>
                </div>
                {isSubmitting
                    ? <CircularProgress className='circular' />
                    : <button type='submit'>Add</button>
                }
            </form>
        </Modal >
    );
};

export default AddProductModal;
