import React, { useState } from "react";
import { Row, Col, Card } from "antd"; // Import Card along with Row and Col
import PatientMedicalCondition from "./pages/PatientMedicalCondition";
import FinancialAnalysis from "./pages/FinancialAnalysis";
import TreatmentAnalysis from "./pages/TreatmentAnalysis";
import "./Style/Options.css";

const Options = () => {
  const [selectedOption, setSelectedOption] = useState("PatientMedicalCondition");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div >
      <Card style={{ backgroundColor: "#e6f4ff" }}>
      <h2>Hospital Analysis</h2> 
        <Row className="options-container">
          <Col span={8}>
            <div
              className={`option-item ${
                selectedOption === "PatientMedicalCondition" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("PatientMedicalCondition")}
            >
              <div className="option-label">Patient and Medical Condition</div>
            </div>
          </Col>
          <Col span={8}>
            <div
              className={`option-item ${
                selectedOption === "FinancialAnalysis" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("FinancialAnalysis")}
            >
              <div className="option-label">Financial Analysis</div>
            </div>
          </Col>
          <Col span={8}>
            <div
              className={`option-item ${
                selectedOption === "TreatmentAnalysis" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("TreatmentAnalysis")}
            >
              <div className="option-label">Treatment Analysis</div>
            </div>
          </Col>
        </Row>
        {selectedOption === "PatientMedicalCondition" && <PatientMedicalCondition />}
        {selectedOption === "FinancialAnalysis" && <FinancialAnalysis />}
        {selectedOption === "TreatmentAnalysis" && <TreatmentAnalysis />}
      </Card>
    </div>
  );
};

export default Options;
