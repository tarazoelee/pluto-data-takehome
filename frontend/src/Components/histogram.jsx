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
      { range: "80-100", count: 0 },
      { range: "100-120", count: 0 },
      { range: "120-140", count: 0 },
      { range: "140-160", count: 0 },
      { range: "160-180", count: 0 },
      { range: "180-200", count: 0 },
    ];

    data.forEach((item) => {
      const score = item.results; // Accessing the results field
      if (score >= 100 && score < 120) buckets[0].count += 1;
      else if (score >= 120 && score < 140) buckets[1].count += 1;
      else if (score >= 140 && score < 160) buckets[2].count += 1;
      else if (score >= 160 && score < 180) buckets[3].count += 1;
      else if (score >= 180 && score <= 200) buckets[4].count += 1;
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
