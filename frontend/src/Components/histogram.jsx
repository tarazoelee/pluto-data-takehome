import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Histogram = ({ simulationResultsHome, simulationResultsAway }) => {
  const bucketData = (data) => {
    const buckets = [
      { range: "0-10", count: 0 },
      { range: "10-20", count: 0 },
      { range: "20-30", count: 0 },
      { range: "30-40", count: 0 },
      { range: "40-50", count: 0 },
    ];

    data.forEach((score) => {
      if (score >= 0 && score <= 10) buckets[0].count += 1;
      else if (score > 10 && score <= 20) buckets[1].count += 1;
      else if (score > 20 && score <= 30) buckets[2].count += 1;
      else if (score > 30 && score <= 40) buckets[3].count += 1;
      else if (score > 40 && score <= 50) buckets[4].count += 1;
    });

    return buckets;
  };

  const homeBuckets = bucketData(simulationResultsHome);
  const awayBuckets = bucketData(simulationResultsAway);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={homeBuckets}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Home Team" fill="#8884d8" />
        <Bar dataKey="count" name="Away Team" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
