import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line
} from "recharts";

export default function CTDPage1() {
  // Sample Data
  const policyData = [
    { name: "Acknowledged", value: 78 },
    { name: "Pending", value: 22 },
  ];

  const trainingData = [
    { name: "Completed", value: 65 },
    { name: "Not Completed", value: 35 },
  ];

  const incidentData = [
    { month: "Jan", incidents: 8 },
    { month: "Feb", incidents: 6 },
    { month: "Mar", incidents: 10 },
    { month: "Apr", incidents: 12 },
    { month: "May", incidents: 7 },
  ];

  const COLORS = ["#711bb5", "#333"];

  return (
    <div
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "white"
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: "Poppins, sans-serif",
          color: "#711bb5",
          fontSize: "2.5rem",
          marginBottom: "20px"
        }}
      >
        Compliance Tracking Dashboard
      </h1>

      {/* Charts Section */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {/* Policy Acknowledgement (Pie Chart) */}
        <div
          style={{
            backgroundColor: "#111",
            border: "1px solid #711bb5",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}
        >
          <h3 style={{ fontFamily: "Poppins", color: "#711bb5" }}>
            Policy Acknowledgements
          </h3>
          <PieChart width={250} height={250}>
            <Pie
              data={policyData}
              dataKey="value"
              outerRadius={80}
              label
            >
              {policyData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Training Completion (Bar Chart) */}
        <div
          style={{
            backgroundColor: "#111",
            border: "1px solid #711bb5",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}
        >
          <h3 style={{ fontFamily: "Poppins", color: "#711bb5" }}>
            Training Completion
          </h3>
          <BarChart width={300} height={250} data={trainingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#711bb5" />
          </BarChart>
        </div>

        {/* Incident Reports (Line Chart) */}
        <div
          style={{
            backgroundColor: "#111",
            border: "1px solid #711bb5",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}
        >
          <h3 style={{ fontFamily: "Poppins", color: "#711bb5" }}>
            Incident Reports (Monthly)
          </h3>
          <LineChart width={350} height={250} data={incidentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="incidents" stroke="#711bb5" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
