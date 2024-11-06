import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import patientData from "../data";
import { Card, Col, Row, Table } from "antd";

Chart.register(...registerables);

const FinancialAnalysis = () => {
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [mergedChartData, setMergedChartData] = useState({});
  const [billingDataTable, setBillingDataTable] = useState([]);
  const [insuranceDataTable, setInsuranceDataTable] = useState([]);

  useEffect(() => {
    const getAdmissionCountByYear = () => {
      const admissionCounts = {};

      patientData.forEach((patient) => {
        const admissionYear = new Date(patient.DateOfAdmission).getFullYear();

        if (!admissionCounts[admissionYear]) {
          admissionCounts[admissionYear] = 0;
        }

        admissionCounts[admissionYear]++;
      });

      return admissionCounts;
    };

    const admissionCounts = getAdmissionCountByYear();
    const years = Object.keys(admissionCounts).sort();
    const counts = years.map((year) => admissionCounts[year]);

    setLineChartData({
      labels: years,
      datasets: [
        {
          label: "Admissions Count by Year",
          data: counts,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    });

    const getBillingData = () => {
      const billingByCondition = {};
      const totalBilling = {};

      patientData.forEach((patient) => {
        const condition = patient.MedicalCondition;
        const billingAmount = patient.BillingAmount;
        if (!billingByCondition[condition]) {
          billingByCondition[condition] = 0;
        }
        billingByCondition[condition] += billingAmount;

        if (!totalBilling[condition]) {
          totalBilling[condition] = 0;
        }
        totalBilling[condition] += billingAmount;
      });

      return billingByCondition;
    };

    const billingData = getBillingData();
    const billingDataArray = Object.entries(billingData).map(
      ([condition, amount]) => ({
        condition,
        totalBilling: amount,
      })
    );

    setBillingDataTable(billingDataArray);

    const getInsuranceData = () => {
      const insuranceBilling = {};
      patientData.forEach((patient) => {
        const insuranceProvider = patient.InsuranceProvider;
        const billingAmount = patient.BillingAmount;
        if (!insuranceBilling[insuranceProvider]) {
          insuranceBilling[insuranceProvider] = 0;
        }
        insuranceBilling[insuranceProvider] += billingAmount;
      });
      return insuranceBilling;
    };
    const insuranceData = getInsuranceData();
    const insuranceDataArray = Object.entries(insuranceData).map(
      ([provider, amount]) => ({
        provider,

        totalBilling: amount,
      })
    );

    setInsuranceDataTable(insuranceDataArray);

    const getAverageLengthOfStayByCondition = () => {
      const lengthOfStayCounts = {};
      const lengthOfStaySums = {};

      patientData.forEach((patient) => {
        const condition = patient.MedicalCondition;
        const admissionDate = new Date(patient.DateOfAdmission);
        const dischargeDate = new Date(patient.DischargeDate);
        const lengthOfStay =
          (dischargeDate - admissionDate) / (1000 * 60 * 60 * 24); // Convert to days

        if (!lengthOfStayCounts[condition]) {
          lengthOfStayCounts[condition] = 0;
          lengthOfStaySums[condition] = 0;
        }

        lengthOfStayCounts[condition]++;
        lengthOfStaySums[condition] += lengthOfStay;
      });

      const averageLengthOfStay = {};
      for (const condition in lengthOfStayCounts) {
        averageLengthOfStay[condition] =
          lengthOfStaySums[condition] / lengthOfStayCounts[condition];
      }

      return averageLengthOfStay;
    };

    const averageLengthOfStay = getAverageLengthOfStayByCondition();
    const conditions = Object.keys(averageLengthOfStay);
    const averages = conditions.map(
      (condition) => averageLengthOfStay[condition]
    );
    const colorPalette = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];
    const barColors = conditions.map(
      (_, index) => colorPalette[index % colorPalette.length]
    );

    setBarChartData({
      labels: conditions,
      datasets: [
        {
          label: "Average Length of Stay (Days)",
          data: averages,
          backgroundColor: barColors,
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 1,
        },
      ],
    });

    const getBillingDataForCharts = () => {
      const billingByYearAndCondition = {};
      const totalBillingByYear = {};

      patientData.forEach((patient) => {
        const admissionYear = new Date(patient.DateOfAdmission).getFullYear();
        const condition = patient.MedicalCondition;
        const billingAmount = patient.BillingAmount;

        if (!billingByYearAndCondition[admissionYear]) {
          billingByYearAndCondition[admissionYear] = {};
        }
        if (!billingByYearAndCondition[admissionYear][condition]) {
          billingByYearAndCondition[admissionYear][condition] = 0;
        }
        billingByYearAndCondition[admissionYear][condition] += billingAmount;

        if (!totalBillingByYear[admissionYear]) {
          totalBillingByYear[admissionYear] = 0;
        }
        totalBillingByYear[admissionYear] += billingAmount;
      });

      return { billingByYearAndCondition, totalBillingByYear };
    };

    const { billingByYearAndCondition, totalBillingByYear } =
      getBillingDataForCharts();

    const yearss = Object.keys(billingByYearAndCondition).sort();
    const conditionss = new Set();

    const colors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];

    const datasets = [];
    yearss.forEach((year) => {
      Object.keys(billingByYearAndCondition[year]).forEach((condition) => {
        conditionss.add(condition);
      });
    });

    let colorIndex = 0;
    conditionss.forEach((condition) => {
      const data = yearss.map(
        (year) => billingByYearAndCondition[year]?.[condition] || 0
      );
      datasets.push({
        label: condition,
        data,
        backgroundColor: colors[colorIndex % colors.length],
        stack: "stack1",
      });
      colorIndex++;
    });

    const totalBillingAmounts = yearss.map(
      (year) => totalBillingByYear[year] || 0
    );

    datasets.push({
      label: "Total Billing Amount",
      data: totalBillingAmounts,
      borderColor: "rgba(0, 0, 0, 1)",
      borderWidth: 2,
      fill: false,
      tension: 0.1,
      yAxisID: "y-axis-2",
    });

    setMergedChartData({
      labels: yearss,
      datasets: datasets,
    });
  }, []);

  const mergedChartOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Sum of Billing Amount by Year and Medical Condition (with Total)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: true,
          text: "Billing Amount",
        },
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Billing Amount",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Average Length of Stay by Medical Condition",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Days",
        },
      },
      x: {
        title: {
          display: true,
          text: "Medical Condition",
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Admission Count by Year",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  const columns = [
    {
      title: "Medical Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Billing Amount",
      dataIndex: "totalBilling",
      key: "totalBilling",
    },
  ];
  const insuranceColumns = [
    {
      title: "Insurance Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Total Billing",
      dataIndex: "totalBilling",
      key: "totalBilling",
    },
  ];

  return (
    <div style={{ padding: "0 20px 20px 20px" }}>
      <Row>
        <Col span={12}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            {lineChartData.labels ? (
              <Line
                data={lineChartData}
                options={lineChartOptions}
                style={{ height: "100%" }}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            {barChartData.labels ? (
              <Bar
                data={barChartData}
                options={barChartOptions}
                style={{ height: "100%" }}
              />
            ) : (
              <p>Loading Length of Stay Data...</p>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Card className="scroll-container"
            style={{
              height: "320px",
              backgroundColor: "#D3D3D3",
              display: "flex",
            }}
          >
            {mergedChartData.labels ? (
              <Bar
                data={mergedChartData}
                options={mergedChartOptions}
                style={{ height: "100%" }}
                type="bar"
              />
            ) : (
              <p>Loading Billing Data...</p>
            )}
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
              dataSource={billingDataTable}
              columns={columns}
              rowKey="condition"
              pagination={false}
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
              dataSource={insuranceDataTable}
              columns={insuranceColumns}
              rowKey="provider"
              pagination={false}
              scroll={{ y: 220 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FinancialAnalysis;
