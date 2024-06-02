import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'; // Import Link
import { useDispatch } from 'react-redux'; // Import Dispatch
import { showcustomer, deletecustomer } from "../Reducers/apicall"; // Import Show and Delete Function 
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import Layout from '../Common/Layout'; // Import Layout
import Swal from 'sweetalert2'; // Import Sweet Alert 
import DetailsIcon from '@mui/icons-material/Details'; //Details Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const Show = () => {

    const dispatch = useDispatch()

    // Get Customer For Use Query 
    const getCustomerdata = async () => {
        const response = await dispatch(showcustomer()) // Call Showcustomer function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: customerdata, error, refetch } = useQuery({
        queryKey: ['customer'],
        queryFn: getCustomerdata // This line of code work as same as useEffect()
    })


    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Customer Details!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deletecustomer(id));
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Your Customer Details has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)


    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Layout>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, marginTop: '75px' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>First Name</StyledTableCell>
                                <StyledTableCell align="center">Last Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                <StyledTableCell align="center">City</StyledTableCell>
                                <StyledTableCell align="center">State</StyledTableCell>
                                <StyledTableCell align="center">Pin</StyledTableCell>
                                <StyledTableCell align="center">Details</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(customerdata) && customerdata.slice(0, customerdata.length).reverse().map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.first_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.last_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.address}</StyledTableCell>
                                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                                    <StyledTableCell align="center">{row.pin}</StyledTableCell>
                                    <StyledTableCell align="center">{row.state}</StyledTableCell>
                                    <StyledTableCell align="center"><Link to={`/details/${row.id}`}><DetailsIcon /></Link></StyledTableCell>
                                    <StyledTableCell align="center"><Link to={`/edit/${row.id}`}><button className='btn-success'><EditIcon /></button></Link></StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => handleDelete(row.id)} className='btn-danger'><DeleteIcon /></button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Layout>
        </>
    )
}

export default Show
