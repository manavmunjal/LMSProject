import React, {  useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import NavbarAdmin from "../Components/NavbarAdmin";
import { Button, Row, Col, Form, Card } from "react-bootstrap";

export const AdminLoanDataInsert = () => {

    const [employeeId, setEmployeeId] = useState('')
    const [loanType, setLoanType] = useState("furniture");
    const [duration, setDuration] = useState(0);
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        var isDataValid = true

        if(employeeId.length===0){
            swal("Validation Failed","Please enter Employee ID","error");
            isDataValid=false;
        }

        if(duration <= 0){
          swal("Validation Failed","Please enter a Duration value greater than 0","error");
          isDataValid=false;
        }
    
        if(isDataValid===false){
          return;
        }

        const data = {
            EmployeeId: employeeId,
            LoanType: loanType,
            DurationInYears: Number(duration)
        };

        try {
            const resp = await axios.post(`${baseURL}/AddLoanCard`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if(resp.status==200){
                swal("Loan Card Added",`Loan Card with Id ${resp.data} has been added successfully`,"success")
            }
        } catch (err) {
            swal("Failed to Add","Something Unexpected occured.Please try again!","error")
            console.log(err)
        }

    }
    const baseURL = "https://localhost:7223/api/admin"
    const [token, setToken] =useState("init val");

    useEffect(() => {
        const sessionToken=sessionStorage.getItem('token');
        setToken(sessionToken);
      }, []);

    return (
        <div>
            <NavbarAdmin/>
            <h2>Loan Card Data Details</h2>

            <Row className="justify-content-md-center">
                <Card className="w-50">
                    <Card.Title className="m-3 bg-light text-dark p-2">
                        Add Loan Card
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
                            controlId="loanType"
                        >
                            <Form.Label column sm={2}>
                                Loan Type
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                                    <option value="furniture">Furniture</option>
                                    <option value="crockery">Crockery</option>
                                    <option value="stationery">Stationery</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    
                        
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="duration"
                        >
                            <Form.Label column sm={2}>
                                {"Duration (in years)"}
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        
                        
                        <Row>
                            <Col>
                                <Button className="mb-4" variant="success" onClick={(e) => {
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
    );
};


export default AdminLoanDataInsert;