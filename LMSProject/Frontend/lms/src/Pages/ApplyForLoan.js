import React from 'react';
import '../Styles/ApplyLoan.css'
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";

import axios from 'axios'
import swal from 'sweetalert';
import NavbarCust from '../Components/NavbarCust';

const ApplyForLoan = () => {

    const [token, setToken] = useState("init val");
    const [user, setUser] = useState({});
    const [category, setCategory] = useState("furniture");
    const [make, setMake] = useState("wood");
    const [desc, setDesc] = useState('')
    const [valuation, setValuation] = useState(0)
    let isDataValid = true;

    const baseURL = "https://localhost:7223/api/customer";
    useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        setToken(sessionToken);
        setUser(sessionUser);
    }, []);


    const validateEntries = async (e) => {
        e.preventDefault()
        if (desc.length === 0) {
            swal("Validation Failed", "Please enter item description!", "error");
            isDataValid = false;
        }
        if (valuation <= 0) {
            swal("Validation Failed", "Please enter a Item value greater than 0", "error");
            isDataValid = false;
        }

        if (isDataValid === false) {
            return;
        }

        const loanData = {
            employeeID: user.userId,
            itemDescription: desc,
            itemValue: valuation,
            itemMake: make,
            itemCategory: category
        }
        applyLoan(loanData)

    }

    const applyLoan = async (data) => {
        try {
            const resp = await axios.post(`${baseURL}/applyForLoan`,
                data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (resp.status === 200) {
                swal("Application Success", "Your Loan Application has been added", "success")
            }
        }
        catch (err) {
            swal("Application error", "Sommething went wrong, Please try again", "error")
            console.log(err)
        }
    }
    return (
        <div>
            <NavbarCust />
            <h2>Select Product and Apply for Loan</h2>

            <Row className="justify-content-md-center">
                <Card className="w-50">
                    <Form className='m-4'>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="eId"
                        >
                            <Form.Label column sm={2}>
                                Employee ID
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder={user.userId}
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="desc"
                        >
                            <Form.Label column sm={2}>
                                Item Description
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    value={desc}
                                    placeholder='Item Description'
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="iValue"
                        >
                            <Form.Label column sm={2}>
                                {"Item Value (₹)"}
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="number"
                                    value={valuation}
                                    onChange={(e) => setValuation(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="iMake"
                        >
                            <Form.Label column sm={2}>
                                Item Make
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={make} onChange={(e) => setMake(e.target.value)}>
                                    <option value="glass">Glass</option>
                                    <option value="plastic">Plastic</option>
                                    <option value="wood">Wood</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="category"
                        >
                            <Form.Label column sm={2}>
                                Issue Category
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="furniture">Furniture</option>
                                    <option value="crockery">Crockery</option>
                                    <option value="stationery">Stationery</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>


                        <Row>
                            <Col>
                                <Button className='mb-3' variant="success" onClick={(e) => validateEntries(e)}>
                                    Apply
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Row>
        </div>

    )
}

export default ApplyForLoan;