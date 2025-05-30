import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { TableContainer } from '@mui/material';
import { IProduct } from '../../types/types.ts';
import RowComponent from './RowComponent.tsx';

type InventoryTableProps = {
    isLoading: boolean;
    filteredProducts: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const InventoryTable = ({ isLoading, filteredProducts, setProducts }: InventoryTableProps) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Code', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 3 },
        { field: 'category', headerName: 'Category', flex: 2 },
        { field: 'count', headerName: 'QTY', flex: 2 },
        {
            field: 'actions', headerName: 'Actions', flex: 2, disableColumnMenu: true, hideSortIcons: true,
            renderCell: (params) => {
                const product = params.value as IProduct;
                return (<RowComponent setProducts={setProducts} product={product} />)
            },
        },
    ];

    const rows: GridRowsProp = filteredProducts.map((product: IProduct) => ({
        id: product.id,
        name: product.title,
        category: product.category,
        count: product.rating?.count,
        actions: product
    }));

    return (
        <TableContainer component='div' id='tableBorder'>
            {isLoading ? <div>Loading...</div> :
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnSelector
                    columns={columns}
                    rows={rows}
                    pagination
                    pageSizeOptions={[10, 20]}
                    rowCount={filteredProducts.length}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 }
                        }
                    }}
                />
            }
        </TableContainer >
    );
};

export default InventoryTable;   
