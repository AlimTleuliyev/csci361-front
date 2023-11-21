import React from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

// adapted code from https://github.com/jbetancur/react-data-table-component/blob/6404a2862c75ed7926c88aa3bd9db88c665c4c9e/stories/DataTable/Filtering.stories.js

const ButtonStyle = styled.button`
    margin: 0;
	background-color: #2979ff;
	border: none;
	color: white;
	padding: 8px 32px 8px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	border-radius: 3px;

	&:hover {
		cursor: pointer;
	}
`;

const Button = ({ children, ...rest }) => <ButtonStyle {...rest}>{children}</ButtonStyle>;

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

function FilterComponent({ filterText, onFilter, onClear }) 
{
    return (
        <>
            <TextField
                id="search"
                type="text"
                placeholder="Filter By Plate"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter} />
            <ClearButton type="button" onClick={onClear}>
                X
            </ClearButton>
        </>
    );
};

function SearchableTable({ columns, data, filter, handleAddButton, addButtonContext })
{
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(
        item => item[filter] && item[filter].toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <>
                {/*hardcoded button width*/}
                <button style={{ width: '190px', margin: 0 }} onClick={handleAddButton}>Add {addButtonContext}</button>
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            selectableRows
            persistTableHead
        />
    );
};

export default SearchableTable;
