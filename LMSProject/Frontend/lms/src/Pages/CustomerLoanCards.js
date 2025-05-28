import React, { useEffect, useState } from "react";
import { useAuth } from '../Contexts/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import NavbarCust from "../Components/NavbarCust";
import { Button, Container, Row, Col } from "react-bootstrap";


export const CustomerLoanCards = () => {
  const navigate = useNavigate();
  // const { logout, user, token } = useAuth();
  const { logout } = useAuth();

  const [loanCards, setLoanCards] = useState([])


  const baseURL = "https://localhost:7223/api/customer"


  const getLoans = async (token, user) => {
    try {
      const resp = await axios.get(`${baseURL}/GetLoans?id=${user.userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      setLoanCards(resp?.data.map((o) => ({ ...o, ['cardIssueDate']: o['cardIssueDate'].substring(0, 10) })));
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    getLoans(sessionToken, sessionUser);
  }, []);


  return (
    <Container fluid>
      <NavbarCust />
      <Row>
        <Col className="p-1 m-2 text-white bg-primary">
          <h6 className="display-6">Loan Cards Availed</h6>
        </Col>
      </Row>
      <Row className="m-4">
        <TableComponent
          headerData={["Loan ID", "Loan Type", "Duration (in years)", "Card Issue Date", "Valuation (₹)"]}
          tableData={responseFilter(loanCards, ["loanId", "loanType", "durationInYears", "cardIssueDate", "valuation"])}
          noDataMessage={{ title: "No loan cards are availed", message: "Use the Apply for Loan option to add a loan card" }} />
      </Row>
    </Container>
  );
};
