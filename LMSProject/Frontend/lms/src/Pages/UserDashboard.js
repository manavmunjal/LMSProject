import React from 'react';
import '../Styles/CustomerDetails.css'
import { Link } from 'react-router-dom';
import DashboardCard from '../Components/DashboardCard';
import { Col, Container, Row } from 'react-bootstrap';
import NavbarCust from '../Components/NavbarCust';

const UserDashboard =()=>{


   
    return (
        <div style={{height:'70vh'}}>
            <NavbarCust/>
            <h2 style={{padding:"10px"}}>User Dashboard</h2>
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
                    <Link to="/ViewLoan" style={{textDecoration:"none"}}>
                    <DashboardCard title="View Loans" icon="Loans"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/ApplyLoan" style={{textDecoration:"none"}}>
                    <DashboardCard title="Apply for Loan"icon="Apply"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/ViewItem" style={{textDecoration:"none"}}>
                    <DashboardCard title="View Purchased Items" icon="Getitems"/>
                    </Link>

                    </Col>
                </Row>
                </Container>
                        </div>
    )
}

export default UserDashboard;