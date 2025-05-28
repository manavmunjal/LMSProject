import React, { useEffect, useState } from "react";
import axios from 'axios';
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import NavbarCust from "../Components/NavbarCust";
import { Button, Container, Row, Col } from "react-bootstrap";

export const CustomerItemsPurchased = () => {



  const [items, setItems] = useState([])


  const baseURL = "https://localhost:7223/api/customer"

  const getItems = async (token, user) => {
    try {
      const resp = await axios.get(`${baseURL}/GetPurchasedItems?id=${user.userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      setItems(resp.data.map((o) => ({ ...o, ['returnDate']: o['returnDate'].substring(0, 10) })))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    getItems(sessionToken, sessionUser);
  }, []);

  return (
    <Container fluid>
      <NavbarCust />
      <Row>
        <Col className="p-1 m-2 text-white bg-primary">
          <h6 className="display-6">Items Purchased</h6>
        </Col>
      </Row>
      <Row className="m-4">
        <TableComponent
          headerData={["Issue ID", "Item Description", "Item Make", "Item Category", "Item Valuation (₹)", "Return Date"]}
          tableData={responseFilter(items, ["itemId", "itemDescription", "itemMake", "itemCategory", "itemValuation", "returnDate"])}
          noDataMessage={{ title: "No items are purchased", message: "Use the Apply for Loan option to purchase an item" }} />
      </Row>
    </Container>

  );
};
