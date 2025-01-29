import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

const Histogram = ({
  simulationResultsHome,
  simulationResultsAway,
  homeTeam,
  awayTeam,
}) => {
  const bucketData = (homeData, awayData) => {
    const buckets = [
      { range: "100-120", homeCount: 0, awayCount: 0 },
      { range: "120-140", homeCount: 0, awayCount: 0 },
      { range: "140-160", homeCount: 0, awayCount: 0 },
      { range: "160-180", homeCount: 0, awayCount: 0 },
      { range: "180-200", homeCount: 0, awayCount: 0 },
    ];

    homeData.forEach((item) => {
      const score = item.results;
      if (score >= 100 && score < 120) buckets[0].homeCount += 1;
      else if (score >= 120 && score < 140) buckets[1].homeCount += 1;
      else if (score >= 140 && score < 160) buckets[2].homeCount += 1;
      else if (score >= 160 && score < 180) buckets[3].homeCount += 1;
      else if (score >= 180 && score <= 200) buckets[4].homeCount += 1;
    });

    awayData.forEach((item) => {
      const score = item.results;
      if (score >= 100 && score < 120) buckets[0].awayCount += 1;
      else if (score >= 120 && score < 140) buckets[1].awayCount += 1;
      else if (score >= 140 && score < 160) buckets[2].awayCount += 1;
      else if (score >= 160 && score < 180) buckets[3].awayCount += 1;
      else if (score >= 180 && score <= 200) buckets[4].awayCount += 1;
    });

    return buckets;
  };

  const data = bucketData(simulationResultsHome, simulationResultsAway);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range">
          <Label value="Simulation score ranges" offset={5} position="bottom" />
        </XAxis>
        <YAxis>
          <Label
            value="Score frequency"
            offset={2}
            position="insideLeft"
            angle="-90"
          />
        </YAxis>
        <Tooltip />
        <Legend align="center" verticalAlign="top" />
        <Bar dataKey="homeCount" name={homeTeam} fill="#f6ae2d" />
        <Bar dataKey="awayCount" name={awayTeam} fill="#86bbd8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
