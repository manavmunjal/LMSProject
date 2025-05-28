import React, { useEffect, useState, useRef } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import NavbarAdmin from "../Components/NavbarAdmin";

export const AdminLoanDataEdit = () => {
  const scrollRef = useRef(null);

  const [loanCards, setLoanCards] = useState([]);
  const [loanId, setLoanId] = useState("");
  const [loanType, setLoanType] = useState("furniture");
  const [duration, setDuration] = useState(0);
  const [valuation, setValuation] = useState(0);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var isDataValid = true
    if (duration <= 0) {
      swal("Validation Failed", "Please enter a Duration value greater than 0", "error");
      isDataValid = false;
    }

    if (isDataValid === false) {
      return;
    }

    const data = {
      loanId: loanId,
      loanType: loanType,
      durationInYears: duration,
      valuation: valuation
    };

    try {
      const resp = await axios.put(`${baseURL}/UpdateLoan`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.status == 200) {
        swal(
          "Edit Successful",
          "The Loan Card details has been edited succesfully",
          "success"
        );
        const edittedLoanCards = loanCards.filter(
          (l) => l.loanId != data.loanId
        );
        setLoanCards([
          ...edittedLoanCards,
          {
            loanId: data.loanId,
            loanType: data.loanType,
            durationInYears: data.durationInYears,
            valuation: valuation
          },
        ]);
      }
    } catch (err) {
      swal(
        "Edit not succesful",
        "Some unexpected error occured, please try again",
        "error"
      );
      console.log(err);
    }
  };

  const baseURL = "https://localhost:7223/api/admin";
  const [token, setToken] = useState("init val");

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    setToken(sessionToken);
    getLoanCards(sessionToken);
  }, []);

  const getLoanCards = async (token) => {
    try {
      const resp = await axios.get(`${baseURL}/GetLoans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoanCards(resp.data);
    } catch (err) {
      swal(
        "Failed fetching Loan Cards",
        "Some unexpected error occured, please try again",
        "error"
      );
      console.log(err);
    }
  };

  const editLoan = (val) => {
    const loanDetails = val;
    setLoanId(val.loanId);
    setLoanType(val.loanType);
    setDuration(val.durationInYears);
    setValuation(val.valuation);
    setEdit(true);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteLoan = async (val) => {
    const loanDetails = val;
    try {
      const resp = await axios.delete(
        `${baseURL}/DeleteLoanById?id=${val.loanId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (resp.status == 200) {
        swal(
          "Delete Successful",
          "The Loan Card details has been deleted succesfully",
          "success"
        );
        const edittedLoanCards = loanCards.filter(
          (loanCard) => loanCard.loanId !== val.loanId
        );
        setLoanCards(edittedLoanCards);
      }
    } catch (err) {
      swal(
        "Delete not succesful",
        "Some unexpected error occured, please try again",
        "error"
      );
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <NavbarAdmin />
      <Row>
        <Col className="p-1 m-2 text-white bg-primary">
          <h6 className="display-6">Loan Card Details</h6>
        </Col>
      </Row>
      <Row className="justify-content-end mt-2">
        <Col></Col>
        <Col xs="6"></Col>
        <Col>
          <Link to="/AdminLoanDataInsert">
            <Button variant="success">
              <Plus className="fs-4"></Plus>Add Loan Card
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="m-4">
        <TableComponent
          headerData={["Loan ID", "Loan Type", "Duration (in years)", "Valuation (₹)"]}
          tableData={responseFilter(loanCards, [
            "loanId",
            "loanType",
            "durationInYears",
            "valuation"
          ])}
          tableActions={[
            { actionName: "Edit", actionCallback: (e) => editLoan(e) },
            { actionName: "Delete", actionCallback: (e) => deleteLoan(e) },
          ]}
          noDataMessage={{ title: "No loan cards are present", message: "Use the Add Loan Card button above to add a loan card" }}
        />
      </Row>
      {edit ? (
        <Row className="justify-content-md-center" ref={scrollRef}>
          <Card className="w-50">
            <Card.Title className="m-3 bg-light text-dark p-2">
              Edit Loan
            </Card.Title>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="loanId"
              >
                <Form.Label column sm={2}>
                  Loan Id
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    placeholder={loanId}
                    disabled={true}
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
                  <Form.Control
                    type="text"
                    placeholder={loanType}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="duration"
              >
                <Form.Label column sm={2}>
                  {"Loan Duration (in years)"}
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-md-center"
                controlId="valuation"
              >
                <Form.Label column sm={2}>
                  {"Loan Valuation (₹)"}
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="number"
                    placeholder={valuation}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="success" onClick={(e) => {
                    setEdit(false);
                    handleSubmit(e);
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
  );
};

export default AdminLoanDataEdit;
