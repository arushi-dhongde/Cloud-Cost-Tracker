"use client";

import { useState } from "react";
import CostChart from "../component/CostChart";
import { mockData } from "../data/mockData";

export default function Page() {
  const [range, setRange] = useState("year");

  const filtered = () => {
    let data = mockData;
    if (range === "last6") data = mockData.slice(6);
    if (range === "quarter") data = mockData.slice(9);
    return {
      labels: data.map((d) => d.month),
      ec2: data.map((d) => d.ec2_hours),
      s3: data.map((d) => d.s3_gb),
      cost: data.map((d) => d.cost),
    };
  };

  const { labels, ec2, s3, cost } = filtered();
  const total = cost.reduce((a, b) => a + b, 0);
  const avg = (total / cost.length).toFixed(2);

  return (
    <main style={{ maxWidth: 980, margin: "32px auto", fontFamily: "sans-serif" }}>
      <h1>Cloud Cost Tracker (Simulated)</h1>
      <p style={{ color: "#555" }}>
        Visualizes EC2, S3, and total monthly costs. Built with Next.js + Chart.js
      </p>

      <div style={{ margin: "12px 0" }}>
        <label>
          <input type="radio" checked={range === "year"} onChange={() => setRange("year")} /> Year
        </label>
        <label style={{ marginLeft: 10 }}>
          <input type="radio" checked={range === "last6"} onChange={() => setRange("last6")} /> Last 6 Months
        </label>
        <label style={{ marginLeft: 10 }}>
          <input type="radio" checked={range === "quarter"} onChange={() => setRange("quarter")} /> Q4
        </label>
      </div>

      <section style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <CostChart labels={labels} ec2Data={ec2} s3Data={s3} costData={cost} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <div><strong>Total Cost:</strong> ${total.toFixed(2)}</div>
          <div><strong>Avg / Month:</strong> ${avg}</div>
        </div>
      </section>
    </main>
  );
}
