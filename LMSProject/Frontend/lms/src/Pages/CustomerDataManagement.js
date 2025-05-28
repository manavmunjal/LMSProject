import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableComponent from '../Components/TableComponent';
import responseFilter from '../Helpers/responseFilter';
import swal from 'sweetalert';
import NavbarAdmin from '../Components/NavbarAdmin';
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

const CustomerDataManagement = () => {
    const scrollRef = useRef(null);

    const [eID, setEID] = useState("");
    const [eName, setEName] = useState("");
    const [department, setDepartment] = useState("it");
    const [gender, setGender] = useState("M");
    const [designation, setDesignation] = useState("manager");
    const [dob, setDob] = useState("");
    const [doj, setDoj] = useState("");
    const [emps, setEmps] = useState('')
    const [edit, setEdit] = useState(false)
    let isDataValid = true;

    const baseURL = "https://localhost:7223/api/admin"
    const [token, setToken] = useState("init val");

    const getEmployees = async (token) => {
        try {
            const resp = await axios.get(`${baseURL}/GetEmployees`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            setEmps(resp?.data.map((o) => ({ ...o, ['dateOfBirth']: o['dateOfBirth'].substring(0, 10), ['dateOfJoining']: o['dateOfJoining'].substring(0, 10) })));
        } catch (err) {
            swal("Failed in Fetching Employeee Details", "Some unexpected error occured, please try again", "error")
            console.log(err)
        }
    }

    const updateEmployee = async (data) => {
        try {
            const resp = await axios.put(`${baseURL}/UpdateEmployee`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (resp.status == 200) {
                swal("Updated Successful", "The Employee details has been edited succesfully", "success")
                const editedEmps = emps.filter(e => e.employeeId !== data.EmployeeId)
                setEmps([...editedEmps, { employeeId: data.EmployeeId, employeeName: data.EmployeeName, department: data.Department, gender: data.Gender, designation: data.Designation, dateOfBirth: data.DateOfBirth, dateOfJoining: data.DateOfJoining }])
            }
        } catch (err) {
            swal("Update not succesful", "Some unexpected error occured, please try again", "error")
            console.log(err)
        }
    }

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        setToken(sessionToken);
        getEmployees(sessionToken);
    }, []);

    const validateEntries = async () => {
        if (eName.length === 0) {
            swal("Validation Error", "Please enter a name", "error")
            isDataValid = false;
        }
        if (!eName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)) {
            swal("Validation Error", "Please enter a valid name", "error")
            isDataValid = false;
        }
        if (dob.length === 0) {
            swal("Validation Error", "Please provide the date of birth", "error")
            isDataValid = false;
        }
        if (doj.length === 0) {
            swal("Validation Error", "Please Provide the date of joining", "error")
            isDataValid = false;
        }
        if(doj<=dob){
            swal("Validation Failed","Please ensure date of joining is after date of birth","error");
            isDataValid=false;
        }


        if (isDataValid === false) {
            return;
        }

        const userData = {
            EmployeeName: eName,
            EmployeeId: eID,
            Designation: designation,
            Department: department,
            Gender: gender,
            DateOfBirth: dob,
            DateOfJoining: doj,
        }

        updateEmployee(userData);
    }


    const editEmployee = (val) => {

        setEName(val.employeeName)
        setEID(val.employeeId)
        setGender(val.gender)
        setDepartment(val.department)
        setDesignation(val.designation)
        setDob(val.dateOfBirth.substring(0, 10))
        setDoj(val.dateOfJoining.substring(0, 10))
        setEdit(true)
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const deleteEmployee = async (val) => {
        try {
            const resp = await axios.delete(`${baseURL}/DeleteEmployee?id=${val.employeeId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (resp.status == 200) {
                swal("Delete Successful", "The Employee details has been deleted succesfully", "success")
                const editedEmps = emps.filter(e => e.employeeId !== val.employeeId)
                setEmps(editedEmps)
            }
        } catch (err) {
            swal("Delete not succesful", "Some unexpected error occured, please try again", "error")
            console.log(err)
        }
    }
    const handleCancel = () => {
        setEID("")
        setEName("")
        setGender("M")
        setDepartment("it")
        setDesignation("manager")
        setDob("")
        setDoj("")
        setEdit(false)
    }

    return (
        <Container fluid>
            <NavbarAdmin />
            <Row>
                <Col className="p-1 m-2 text-white bg-primary">
                    <h6 className="display-6">Customer Data Management</h6>
                </Col>
            </Row>
            <Row className="justify-content-end mt-2">
                <Col></Col>
                <Col xs="6"></Col>
                <Col>
                    <Link to="/register">
                        <Button variant="success" className='mb-2'>
                            <Plus className="fs-4"></Plus>Add Employee
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row className="m-4">
                <TableComponent
                    headerData={["Employee ID", "Employee Name", "Gender", "Designation", "Department", "Date of Birth", "Date of joining"]}
                    tableData={responseFilter(emps, ["employeeId", "employeeName", "gender", "designation", "department", "dateOfBirth", "dateOfJoining"])}
                    tableActions={[{ actionName: "Edit", actionCallback: (e) => editEmployee(e) }, { actionName: "Delete", actionCallback: (val) => deleteEmployee(val) }]}
                    noDataMessage={{ title: "No employees are present", message: "Use the Add Employee button above to add an employee" }} />
            </Row>
                {edit ? (
                    <Row className="justify-content-md-center" ref={scrollRef}>
                        <Card className="w-50">
                            <Card.Title className="m-3 bg-light text-dark p-2">
                                Edit Employee
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
                                    controlId="ename"
                                >
                                    <Form.Label column sm={2}>
                                        Employee ID
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            placeholder={eID}
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
                                <Row>
                                    <Col>
                                        <Button variant="success" onClick={() => {
                                            setEdit(false);
                                            validateEntries();

                                        }}>
                                            Edit Data
                                        </Button>
                                        <Button
                                            className="m-3"
                                            variant="outline-danger"
                                            onClick={() => setEdit(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Row>
                ) : null}

        </Container>
    )
}

export default CustomerDataManagement;