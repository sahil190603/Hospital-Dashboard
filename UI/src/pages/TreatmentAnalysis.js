import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import patientData from "../data"; 
import { Row, Col, Card, Table } from "antd";

Chart.register(...registerables);

const TreatmentAnalysis = () => {
  const [chartData, setChartData] = useState({});
  const [chartsData, setChartsData] = useState([]);
  const [normalCounts, setNormalCounts] = useState([]);
  const [doctorChartData, setDoctorChartData] = useState({});

  useEffect(() => {
    const getNormalTestCounts = () => {
      const normalCounts = {};

      patientData.forEach((patient) => {
        const condition = patient.MedicalCondition;
        const testResult = patient.TestResults;

        if (testResult === "Normal") {
          if (!normalCounts[condition]) {
            normalCounts[condition] = 0;
          }
          normalCounts[condition]++;
        }
      });

      return normalCounts;
    };

    const normalTestCounts = getNormalTestCounts();
    const conditions = Object.keys(normalTestCounts);
    const counts = conditions.map((condition) => normalTestCounts[condition]);

    const colors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];

    const backgroundColors = conditions.map(
      (_, index) => colors[index % colors.length]
    );

    setChartData({
      labels: conditions,
      datasets: [
        {
          label: "Count of Normal Test Conditions",
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 1,
        },
      ],
    });

    const getNormalTestCountsByMedication = () => {
      const medicationCounts = {};

      patientData.forEach((patient) => {
        const condition = patient.MedicalCondition;
        const medication = patient.Medication;
        const testResult = patient.TestResults;

        if (testResult === "Normal") {
          if (!medicationCounts[medication]) {
            medicationCounts[medication] = {};
          }
          if (!medicationCounts[medication][condition]) {
            medicationCounts[medication][condition] = 0;
          }
          medicationCounts[medication][condition]++;
        }
      });

      return medicationCounts;
    };

    const normalTestCount = getNormalTestCountsByMedication();
    const medications = Object.keys(normalTestCount);
    const condition = [
      ...new Set(Object.values(normalTestCount).flatMap(Object.keys)),
    ];

    const data = medications.map((medication) => {
      return condition.map((condition) => {
        return normalTestCount[medication][condition] || 0;
      });
    });

    const color = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];

    const backgroundColor = medications.map(
      (_, index) => color[index % color.length]
    );

    const datasets = condition.map((condition, index) => ({
      label: condition,
      data: data.map((med) => med[index]),
      backgroundColor: backgroundColor[index % backgroundColor.length],
      borderColor: "rgba(0, 0, 0, 1)",
      borderWidth: 1,
    }));

    setChartsData({
      labels: medications,
      datasets: datasets,
    });

    const normalCountArray = conditions.map((condition) => ({
      condition,
      count: normalTestCounts[condition],
    }));
    setNormalCounts(normalCountArray);

    const getNormalTestCountsByDoctor = () => {
      const doctorCounts = {};

      patientData.forEach((patient) => {
        const doctor = patient.Doctor;
        const testResult = patient.TestResults;

        if (testResult === "Normal") {
          if (!doctorCounts[doctor]) {
            doctorCounts[doctor] = 0;
          }
          doctorCounts[doctor]++;
        }
      });

      return doctorCounts;
    };

    const normalTestCountsByDoctor = getNormalTestCountsByDoctor();
    const doctorNames = Object.keys(normalTestCountsByDoctor);
    const doctorData = doctorNames.map((doctor) => normalTestCountsByDoctor[doctor]);

    const doctorBackgroundColors = doctorNames.map(
      (_, index) => colors[index % colors.length]
    );

    setDoctorChartData({
      labels: doctorNames,
      datasets: [
        {
          label: "Count of Normal Test Results by Doctor",
          data: doctorData,
          backgroundColor: doctorBackgroundColors,
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 1,
        },
      ],
    });

  }, []);

  const chartOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Count of Normal Test Conditions by Medical Condition",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Medical Condition",
        },
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  const chartsOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Count of Normal Test Results by Medication and Medical Condition",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Medication",
        },
        stacked: true,
      },
    },
  };

  const doctorChartOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Count of Normal Test Results by Doctor",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Doctor",
        },
      },
    },
  };

  const columns = [
    {
      title: "Med Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Normal Results",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div style={{ padding: "0 20px 20px 20px" }}>
      <Row>
        <Col span={9}>
          <Card
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            {chartData.labels ? (
              <Bar
                data={chartData}
                options={chartOptions}
                style={{ height: "100%" }}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </Card>
        </Col>
        <Col span={9}>
          <Card
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            {chartsData.labels ? (
              <Bar
                data={chartsData}
                options={chartsOptions}
                style={{ height: "100%" }}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            <Table
              columns={columns}
              dataSource={normalCounts}
              pagination={false}
              rowKey="condition"
              scroll={{ y: 220 }}
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
              flexDirection: "column",
            }}
          >
            {doctorChartData.labels ? (
              <Bar
                data={doctorChartData}
                options={doctorChartOptions}
                style={{ height: "100%" }}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TreatmentAnalysis;
