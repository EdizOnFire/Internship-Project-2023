import { render, screen } from 'test-utils';
import AddProductModal from '../pages/Inventory/AddProductModal';
import mockServer from 'mock-server';
import userEvent from '@testing-library/user-event';

describe('AddProductModal', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('renders the modal and on submit shows errors', async () => {
        render(<AddProductModal products={[]} setProducts={() => console.log('')} showAddModal={true} setShowAddModal={() => console.log('')} />);

        const user = userEvent.setup();
        await user.type(screen.getByLabelText('Name *'), 'Product Name');
        await user.type(screen.getByLabelText('Qty *'), '10');

        await user.click(screen.getByText('Add'));

        const addModal = await screen.findByRole('dialog');

        const categoryErrorText = await screen.findByText('Category field is required');

        expect(addModal).toMatchSnapshot();
        expect(addModal).toBeInTheDocument();
        expect(categoryErrorText).toBeInTheDocument();
    });
});