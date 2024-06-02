import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' // Import Use Query
import { useDispatch } from 'react-redux' // Import Dispatch
import { detailscustomer } from "../Reducers/apicall"; // Import Details Function 
import { useParams } from 'react-router-dom' //Import  Useparams 
import Layout from '../Common/Layout' // Import Layout

const Details = () => {

    const { id } = useParams(); // Useparams 
    const dispatch = useDispatch(); // For Dispatch

    const getdetailsdata = async () => {
        const response = await dispatch(detailscustomer(id)) // Call function 
        console.log("My Details response is ", response);
        return response?.payload
    }

    // Use Query Area 
    const { isLoading, isError, data: detailsdata, error, refetch } = useQuery({
        queryKey: ['customer'],
        queryFn: getdetailsdata // This line of code work as same as useEffect()
    })

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

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-header">
                            Details
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><b>First Name : </b>{detailsdata?.first_name}</h5>
                            <h5 className="card-title"><b>Last Name : </b>{detailsdata?.last_name}</h5>
                            <h5 className="card-title"><b>Email : </b>{detailsdata?.email}</h5>
                            <h5 className="card-title"><b>Phone : </b>{detailsdata?.phone}</h5>
                            <Link to="/show" className="btn btn-primary">Back</Link>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Details