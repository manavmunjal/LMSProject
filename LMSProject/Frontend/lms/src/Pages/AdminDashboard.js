import React from 'react';
import '../Styles/CustomerDetails.css'
import { Link } from 'react-router-dom';
import DashboardCard from '../Components/DashboardCard';
import { Col, Container, Row } from 'react-bootstrap';
import NavbarAdmin from '../Components/NavbarAdmin';

const UserDashboard = () => {    

    return (
        <div style={{height:'70vh'}}>
            <NavbarAdmin/>
            <h2>Admin Dashboard</h2>
            <Container
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Row>
                    <Col>
                    <Link to="/CustomerDataManagement" style={{textDecoration:"none"}}>
                    <DashboardCard title="Customer Data Management" icon="Person"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/AdminLoanDataEdit" style={{textDecoration:"none"}}>
                    <DashboardCard title="Loan Card Management" icon="Loans"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/AdminItemsMaster" style={{textDecoration:"none"}}>
                    <DashboardCard title="Items Data Management" icon="Getitems" />
                    </Link>

                    </Col>
                </Row>
                </Container>
        </div>
    )
}

export default UserDashboard;