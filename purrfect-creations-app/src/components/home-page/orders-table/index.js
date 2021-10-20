import React from 'react';
import {Table, Spinner, Button} from 'react-bootstrap';
import { useHomePage } from '../context';

const DashboardsTable = () => {
    const { orders, loading, error, offset, prevOffset } = useHomePage();

    //Parses paginated list to return body elements for table
    const getBody = (list) => {
        console.log('list', list);
        return list.map((item) => {
            const fields = item.fields;
            return <tr key={fields.order_id}>
                <td>{fields.order_id}</td>
                <td>{fields.order_placed}</td>
                <td>{fields.product_name}</td>
                <td>{`£${fields.price}`}</td>
                <td>{`${fields.first_name} ${fields.last_name}`}</td>
                <td>{fields.email}</td>
                <td>{fields.order_status}</td>
            </tr>
        })
    }

    //need to impliment 
    const handlePrevPag = () => {
    }

    //need to impliment
    const handleNextPag = () => {
    }

    if (error) return 'oops... something went wrong';

    return (
        <div className="dashboards-table">
            <div className="table-main">  
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Order Placed</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>                
                    {(!loading) ?
                        getBody(orders) : 
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                    </tbody>
                </Table>  
                <div className="pagination">
                    {(prevOffset !== '') ? <Button onClick={handlePrevPag} variant="outline-dark">Prev</Button> : <></>}
                    {(offset !== '') ? <Button onClick={handleNextPag} variant="outline-dark">Next</Button> : <></>}
                </div>
            </div>
        </div>
    )
}

export default DashboardsTable;
