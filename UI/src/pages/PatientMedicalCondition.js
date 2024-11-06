import React, { useEffect, useRef } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import patientData from "../data";
import { Chart, registerables } from "chart.js";
import { Row, Col, Card, Table } from "antd";

Chart.register(...registerables);

const PatientMedicalCondition = () => {
  const chartRef = useRef(null);

  const getAgeDistribution = () => {
    const ageCount = {
      "0-5": 0,
      "6-10": 0,
      "11-15": 0,
      "16-20": 0,
      "21-25": 0,
      "26-30": 0,
      "31-35": 0,
      "36-40": 0,
      "41-45": 0,
      "46-50": 0,
      "51-55": 0,
      "56-60": 0,
      "61-65": 0,
      "66-70": 0,
      "71-75": 0,
      "76-80": 0,
      "81-85": 0,
      "86+": 0,
    };

    patientData.forEach((patient) => {
      const age = patient.Age;
      if (age >= 0 && age <= 5) ageCount["0-5"]++;
      else if (age >= 6 && age <= 10) ageCount["6-10"]++;
      else if (age >= 11 && age <= 15) ageCount["11-15"]++;
      else if (age >= 16 && age <= 20) ageCount["16-20"]++;
      else if (age >= 21 && age <= 25) ageCount["21-25"]++;
      else if (age >= 26 && age <= 30) ageCount["26-30"]++;
      else if (age >= 31 && age <= 35) ageCount["31-35"]++;
      else if (age >= 36 && age <= 40) ageCount["36-40"]++;
      else if (age >= 41 && age <= 45) ageCount["41-45"]++;
      else if (age >= 46 && age <= 50) ageCount["46-50"]++;
      else if (age >= 51 && age <= 55) ageCount["51-55"]++;
      else if (age >= 56 && age <= 60) ageCount["56-60"]++;
      else if (age >= 61 && age <= 65) ageCount["61-65"]++;
      else if (age >= 66 && age <= 70) ageCount["66-70"]++;
      else if (age >= 71 && age <= 75) ageCount["71-75"]++;
      else if (age >= 76 && age <= 80) ageCount["76-80"]++;
      else if (age >= 81 && age <= 85) ageCount["81-85"]++;
      else ageCount["86+"]++;
    });

    return ageCount;
  };

  const getGenderDistribution = () => {
    const genderCount = {
      Male: 0,
      Female: 0,
    };

    patientData.forEach((patient) => {
      const gender = patient.Gender;
      if (gender === "Male") {
        genderCount.Male++;
      } else if (gender === "Female") {
        genderCount.Female++;
      }
    });

    return genderCount;
  };

  const getBloodTypeDistribution = () => {
    const bloodTypeCount = {
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 0,
      "AB+": 0,
      "AB-": 0,
      "O+": 0,
      "O-": 0,
    };

    patientData.forEach((patient) => {
      const bloodType = patient.BloodType;
      if (bloodTypeCount.hasOwnProperty(bloodType)) {
        bloodTypeCount[bloodType]++;
      }
    });

    return bloodTypeCount;
  };

  const getConditionCountByYear = () => {
    const conditionCountByYear = {};

    patientData.forEach((patient) => {
      const year = new Date(patient.DateOfAdmission).getFullYear();

      const condition = patient.MedicalCondition;

      if (!conditionCountByYear[year]) {
        conditionCountByYear[year] = {};
      }

      if (!conditionCountByYear[year][condition]) {
        conditionCountByYear[year][condition] = 0;
      }

      conditionCountByYear[year][condition]++;
    });

    return conditionCountByYear;
  };
  const conditionCountByYear = getConditionCountByYear();

  const years = Object.keys(conditionCountByYear);

  const conditions = Array.from(
    new Set(patientData.map((patient) => patient.MedicalCondition))
  );

  const lineChartData = {
    labels: years,

    datasets: conditions.map((condition) => ({
      label: condition,

      data: years.map((year) => conditionCountByYear[year][condition] || 0),

      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,

      fill: false,
    })),
  };

  const lineChartOptions = {
    responsive: true,

    plugins: {
      legend: { display: true, position: "top" },

      title: { display: true, text: "Condition Count by Year" },
    },

    scales: { y: { beginAtZero: true } },
  };

  const ageDistribution = getAgeDistribution();
  const labels = Object.keys(ageDistribution);
  const data = Object.values(ageDistribution);

  const genderDistribution = getGenderDistribution();
  const genderLabels = Object.keys(genderDistribution);
  const genderData = Object.values(genderDistribution);

  const bloodTypeDistribution = getBloodTypeDistribution();
  const bloodTypeLabels = Object.keys(bloodTypeDistribution);
  const bloodTypeData = Object.values(bloodTypeDistribution);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Patient Count by Age",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const genderChartData = {
    labels: genderLabels,
    datasets: [
      {
        data: genderData,
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const bloodTypeChartData = {
    labels: bloodTypeLabels,
    datasets: [
      {
        data: bloodTypeData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Patient Count by Age",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const genderOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Gender Ratio",
      },
    },
  };

  const bloodTypeOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Patient Count by Blood Type",
      },
    },
  };

  const getMedicalConditionCounts = () => {
    const conditionCounts = {};
    patientData.forEach((patient) => {
      const condition = patient.MedicalCondition;
      if (!conditionCounts[condition]) {
        conditionCounts[condition] = 0;
      }
      conditionCounts[condition]++;
    });
    return conditionCounts;
  };

  const conditionCounts = getMedicalConditionCounts();

  const conditionData = Object.keys(conditionCounts).map((condition) => ({
    condition,
    count: conditionCounts[condition],
  }));

  const columns = [
    {
      title: "Medical Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [chartRef]);
  const getConditionCountByAgeGroup = () => {
    const ageGroups = {
      "0-5": {},
      "6-10": {},
      "11-15": {},
      "16-20": {},
      "21-25": {},
      "26-30": {},
      "31-35": {},
      "36-40": {},
      "41-45": {},
      "46-50": {},
      "51-55": {},
      "56-60": {},
      "61-65": {},
      "66-70": {},
      "71-75": {},
      "76-80": {},
      "81-85": {},
      "86+": {},
    };

    patientData.forEach((patient) => {
      const age = patient.Age;
      const condition = patient.MedicalCondition;

      // Determine the age group
      let group = "";
      if (age >= 0 && age <= 5) group = "0-5";
      else if (age >= 6 && age <= 10) group = "6-10";
      else if (age >= 11 && age <= 15) group = "11-15";
      else if (age >= 16 && age <= 20) group = "16-20";
      else if (age >= 21 && age <= 25) group = "21-25";
      else if (age >= 26 && age <= 30) group = "26-30";
      else if (age >= 31 && age <= 35) group = "31-35";
      else if (age >= 36 && age <= 40) group = "36-40";
      else if (age >= 41 && age <= 45) group = "41-45";
      else if (age >= 46 && age <= 50) group = "46-50";
      else if (age >= 51 && age <= 55) group = "51-55";
      else if (age >= 56 && age <= 60) group = "56-60";
      else if (age >= 61 && age <= 65) group = "61-65";
      else if (age >= 66 && age <= 70) group = "66-70";
      else if (age >= 71 && age <= 75) group = "71-75";
      else if (age >= 76 && age <= 80) group = "76-80";
      else if (age >= 81 && age <= 85) group = "81-85";
      else group = "86+";

      // Increment condition count for the age group
      if (!ageGroups[group][condition]) {
        ageGroups[group][condition] = 0;
      }
      ageGroups[group][condition]++;
    });

    return ageGroups;
  };
  const ageGroupConditionData = getConditionCountByAgeGroup();

  // Convert the data to table format
  const tableData = Object.keys(ageGroupConditionData).map((ageGroup) => ({
    ageGroup,
    conditions: Object.entries(ageGroupConditionData[ageGroup])
      .map(([condition, count]) => `${condition}: ${count}`)
      .join(", "),
  }));
  const Agecolumns = [
    {
      title: "Age Group",
      dataIndex: "ageGroup",
      key: "ageGroup",
    },
    {
      title: "Med Condition C",
      dataIndex: "conditions",
      key: "conditions",
    },
  ];

  return (
    <div style={{padding:"0 20px 20px 20px"}}>
      <Row>
        <Col span={10}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            <Bar
              ref={chartRef}
              data={chartData}
              options={options}
              style={{ height: "100%" }}
            />
          </Card>
        </Col>
        <Col span={7}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pie
              data={genderChartData}
              options={genderOptions}
              style={{ height: "80%" }}
            />
          </Card>
        </Col>
        <Col span={7}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Doughnut
              data={bloodTypeChartData}
              options={bloodTypeOptions}
              style={{ height: "80%" }}
            />
          </Card>
        </Col>
      </Row>
      <Row >
        <Col span={10}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            <Line
              data={lineChartData}
              options={lineChartOptions}
              style={{ height: "100%" }}
            />
          </Card>
        </Col>
        <Col span={7}>
          <Card
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Table 
              columns={columns}
              dataSource={conditionData}
              pagination={false}
              rowKey="condition"
              scroll={{ y: 220 }}
            />
          </Card>
        </Col>
        <Col span={7}>
          <Card
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Table
              columns={Agecolumns}
              dataSource={tableData}
              pagination={false}
              rowKey="ageGroup"
              scroll={{ y: 220 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientMedicalCondition;
