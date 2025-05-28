import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import NavbarAdmin from "../Components/NavbarAdmin";
import { Button, Row, Col, Form, Card } from "react-bootstrap";

const AdminAddItem = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [category, setCategory] = useState("furniture");
    const [status, setStatus] = useState("Y");
    const [make, setMake] = useState("wood");
    const [desc, setDesc] = useState('')
    const [valuation, setValuation] = useState(0)

    const [token, setToken] = useState("init val");
    const [user, setUser] = useState({});

    const baseURL = "https://localhost:7223/api/customer"

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        setToken(sessionToken);
        setUser(sessionUser);
    }, []);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleItemStatus = (event) => {
        setStatus(event.target.value);
    }

    const handleItemMake = (event) => {
        setMake(event.target.value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            EmployeeID: employeeId,
            ItemDescription: desc,
            ItemValue: valuation,
            ItemMake: make,
            ItemCategory: category
        }

        try {
            const resp = await axios.post(`${baseURL}/ApplyForLoan`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (resp.status == 200) {
                swal("Item Added", `Item with Id ${resp.data} has been added successfully`, "success");
            }
        } catch (err) {
            swal("Failed to Add", "Something Unexpected occured.Please try again!", "error")
            console.log(err);
        }

    }

    return (
        <div>
            <NavbarAdmin />
            <h1>Loan Management Application</h1>
            <h2>Item Master Data Details</h2>
            <Row className="justify-content-md-center">
                <Card className="w-50">
                    <Card.Title className="m-3 bg-light text-dark p-2">
                        Add Item
                    </Card.Title>
                    <Form>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="employeeId"
                        >
                            <Form.Label column sm={2}>
                                Employee ID
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    value={employeeId}
                                    onChange={(e) => { setEmployeeId(e.target.value) }}
                                />
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
                                <Form.Select value={category} onChange={handleCategoryChange}>
                                    <option value="furniture">Furniture</option>
                                    <option value="crockery">Crockery</option>
                                    <option value="stationery">Stationery</option>
                                </Form.Select>
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
                            controlId="valuation"
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
                            controlId="status"
                        >
                            <Form.Label column sm={2}>
                                Issue Status
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={status} onChange={handleItemStatus}>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="make"
                        >
                            <Form.Label column sm={2}>
                                Item Make
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={make} onChange={handleItemMake}>
                                    <option value="wood">Wood</option>
                                    <option value="glass">Glass</option>
                                    <option value="plastic">Plastic</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button className='mb-4' variant="success" onClick={(e) => {
                                    handleSubmit(e);
                                }}>
                                    Add
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default AdminAddItem;