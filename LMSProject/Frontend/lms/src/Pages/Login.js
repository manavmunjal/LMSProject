import React from 'react';
import '../Styles/Login.css'
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import {useAuth} from '../Contexts/AuthContext'
import swal from 'sweetalert';
import { sha256 } from 'js-sha256';


const Login=()=>{

    const navigate = useNavigate();
    const [eID,setEID]=useState("");
    const [ePass, setEPass] = useState("");
    const {login, register} = useAuth();
    let isDataValid=true;

    const [user, setUser] =useState({});
    const [eName,setEName]=useState("John Doe");
    const [eRole,setERole]=useState('customer');
    const [department,setDepartment]=useState("it");
    const [gender,setGender]=useState("M");
    const [designation,setDesignation]=useState("manager");
    const [dob,setDob]=useState("");
    const [doj,setDoj]=useState("");


    const validateRegisterEntries=async (e)=>{
        e.preventDefault();

        if(eName.length===0){
            swal("Validation Failed","Please enter employee name!","error");
            isDataValid=false;
        }
        if(ePass.length===0){
            swal("Validation Failed","Please enter password","error");
            isDataValid=false;
        }
        if(!eName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)){
            swal("Validation Failed","Employee name is invalid!\nUse of special characters and numbers is not allowed","Error")
            isDataValid=false;
        }
        if(dob.length===0){
            swal("Validation Failed","Please enter date of birth","error");
            isDataValid=false;
        }
        if(doj.length===0){
            swal("Validation Failed","Please enter date of joining","error");
            isDataValid=false;
        }
        if(doj<=dob){
            swal("Validation Failed","Please ensure date of joining is after date of birth","error");
            isDataValid=false;
        }
        if(eRole.length===0){
            swal("Validation failed","Please mention the role of employee","error");
            isDataValid = false;
        }

        if(isDataValid===false){
            return;
        }

        const userData = {
            EmployeeName: eName,
            Designation:designation,
            Department:department,
            Gender:gender,
            DateOfBirth: dob,
            DateOfJoining: doj,
            Employee: {
                EmployeePassword: sha256(ePass),
                EmployeeRole: eRole
            }
        }
        register(userData, (newEmpId)=>{
            const res = login(newEmpId, ePass);
            if(res) {
                res.then((r) => {
                    if(r==="admin") {
                        navigate("AdminDashboard");
                    }
                    else if(r==="customer"){
                        navigate("UserDashboard");
                    }
                });
            }
        });      
    }

    const validateEntries=(e)=>{
        e.preventDefault();
       
        if (!eID.match(/[A-Z]{1}[0-9]/)){
            swal("Error","Invalid employee ID format!","error");
            isDataValid=false;
        }
        if(ePass.length===0){
            swal("Error","Please enter a valid password","error");
            isDataValid=false;
        }
        if(isDataValid) {
            const res = login(eID, ePass);
            if(res) {
               
                console.log(res);
                res.then((r) => {
                    if(r==="admin") {
                        navigate("AdminDashboard");
                    }
                    else if(r==="customer"){
                        navigate("UserDashboard");
                    }
                });
            }
        }
    }
    return (
        <div>
            <Navbar bg="light" expand="lg" style={{padding:"15px"}}>
                <Navbar.Brand style={{paddingX:"15px"}}>LMS</Navbar.Brand>
            </Navbar>
            <div className='Authentication'>
                <div className="main">
                    <input type="checkbox" id="chk" />
                    <div className="signup">
                        <form>
                            <label htmlFor="chk" className="sig">Register</label>
                            <div className='user-box'>
                                <input type="text" id="ename" value={eName} onChange={(e) => setEName(e.target.value)}/>
                                <label>Employee Name</label>
                            </div>
                            <div className='user-box'>
                                <input type="password" id="pass" value={ePass} onChange={(p) => setEPass(p.target.value)} />
                                <label>Password</label>
                            </div>
                            <div>
                                <span className='user-box'>
                                    <select name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}> 
                                        <option value="it">IT</option> 
                                        <option value="finance">Finance</option> 
                                        <option value="sales">Sales</option> 
                                        <option value="hr">HR</option> 
                                    </select>
                                    <label>Department</label>
                                </span>
                                <span className='user-box'>
                                    <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}> 
                                        <option value="M">Male</option> 
                                        <option value="F">Female</option>
                                    </select>   
                                    <label>Gender</label>
                                </span>
                                <span className='user-box'>
                                    <select name="designation" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)}> 
                                        <option value="manager">Manager</option> 
                                        <option value="ca">CA</option> 
                                        <option value="dgm">DGM</option> 
                                        <option value="associate">Associate</option> 
                                    </select>
                                    <label>Designation</label>
                                </span>
                                {/* <span className='user-box'>
                                    <select name="erole" id="erole" value={eRole} onChange={(e) => setERole(e.target.value)}> 
                                        <option value="customer">Customer</option> 
                                        <option value="admin">Admin</option>
                                    </select>   
                                    <label>Role</label>
                                </span> */}
                            </div>
                            <span className='user-box'>
                                <span>
                                    <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/>
                                    <label>Date Of Birth</label>
                                </span>
                                </span>
                                <span className="user-box">
                                <span>
                                    <input type="date" id="doj" value={doj} onChange={(e) => setDoj(e.target.value)} />
                                    <label>Date Of Joining</label>
                                </span>
                            </span>
                            <div>
                                <button type="submit" className="authBtn" onClick={(e)=>validateRegisterEntries(e)}>Add Data</button>
                            </div>
                        </form>
                    </div>

                    <div className="login">
                        <form onSubmit={validateEntries}>
                            <label htmlFor="chk" className="log">Login</label>
                            <div className="user-box">
                                <input type="text" title="Enter Employee ID" onChange={(e) => setEID(e.target.value)}  required />
                                <label>Employee ID</label>
                            </div>
                            <div className="user-box">
                                <input type="password" title="Enter password" onChange={(p) => setEPass(p.target.value)}  required />
                                <label>Password</label>
                            </div>
                            <button className="authBtn" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;