import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import NavbarAdmin from "../Components/NavbarAdmin";
import { sha256 } from 'js-sha256';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Form, Card } from "react-bootstrap";

const CustomerDetails = () => {

    const { addEmployee } = useAuth();
    const [user, setUser] = useState({});

    const [ePass, setEPass] = useState("****");
    const [eName, setEName] = useState("John Doe");
    const [eRole, setERole] = useState('customer');
    const [department, setDepartment] = useState("it");
    const [gender, setGender] = useState("M");
    const [designation, setDesignation] = useState("manager");
    const [dob, setDob] = useState("");
    const [doj, setDoj] = useState("");
    let isDataValid = true;

    useEffect(() => {
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        setUser(sessionUser);
    }, []);



    const validateEntries = async () => {
        if (eName.length === 0) {
            swal("Validation Failed", "Please enter employee name!", "error");
            isDataValid = false;
        }
        if (ePass.length === 0) {
            swal("Validation Failed", "Please enter password", "error");
            isDataValid = false;
        }
        if (!eName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)) {
            swal("Validation Failed", "Employee name is invalid!\nUse of special characters and numbers is not allowed", "Error")
            isDataValid = false;
        }
        if (dob.length === 0) {
            swal("Validation Failed", "Please enter date of birth", "error");
            isDataValid = false;
        }
        if (doj.length === 0) {
            swal("Validation Failed", "Please enter date of joining", "error");
            isDataValid = false;
        }
        if(doj<=dob){
            swal("Validation Failed","Please ensure date of joining is after date of birth","error");
            isDataValid=false;
        }
        if (eRole.length === 0) {
            swal("Validation failed", "Please mention the role of employee", "error");
            isDataValid = false;
        }

        if (isDataValid === false) {
            return;
        }

        const userData = {
            EmployeeName: eName,
            Designation: designation,
            Department: department,
            Gender: gender,
            DateOfBirth: dob,
            DateOfJoining: doj,
            Employee: {
                EmployeePassword: sha256(ePass),
                EmployeeRole: eRole
            }
        }
        addEmployee(userData);


    }
    return (
        <div>
            <NavbarAdmin />
            <h1>Loan Management Application</h1>
            <h2>Customer Data Management</h2>
            <Row className="justify-content-md-center">
                <Card className="w-50">
                    <Card.Title className="m-3 bg-light text-dark p-2">
                        Add Employee
                    </Card.Title>
                    <Form>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="ename"
                        >
                            <Form.Label column sm={2}>
                                Employee Name
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    value={eName}
                                    placeholder='Employee Name'
                                    onChange={(e) => setEName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="pass"
                        >
                            <Form.Label column sm={2}>
                                Password
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="password"
                                    value={ePass}
                                    placeholder='Enter password'
                                    onChange={(p) => setEPass(p.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="department"
                        >
                            <Form.Label column sm={2}>
                                Department
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="it">IT</option>
                                    <option value="finance">Finance</option>
                                    <option value="sales">Sales</option>
                                    <option value="hr">HR</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="gender"
                        >
                            <Form.Label column sm={2}>
                                Gender
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="designation"
                        >
                            <Form.Label column sm={2}>
                                Designation
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                                    <option value="manager">Manager</option>
                                    <option value="ca">CA</option>
                                    <option value="dgm">DGM</option>
                                    <option value="associate">Associate</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="dob"
                        >
                            <Form.Label column sm={2}>
                                Date Of Birth
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="doj"
                        >
                            <Form.Label column sm={2}>
                                Date Of Joining
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    value={doj}
                                    onChange={(e) => setDoj(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3 justify-content-md-center"
                            controlId="erole"
                        >
                            <Form.Label column sm={2}>
                                Role
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select value={eRole} onChange={(e) => setERole(e.target.value)}>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>



                        <Row>
                            <Col>
                                <Button className='mb-4' variant="success" onClick={() => validateEntries()}>
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

export default CustomerDetails;