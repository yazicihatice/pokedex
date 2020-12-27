import React from "react";
import StatBar from "./StatBar";
import "./statchart.css";

const StatChart = (props) => {
  const { chunkCount, statChartData } = props;

  return (
    <>
      <div className="pokemon-stats-info-wrapper">
        <span className="stats-header">Stats</span>
        <ul className="pokemon-stats-columns-list">
          {statChartData.map((stat, index) => (
            <StatBar barData={stat} key={index} chunkCount={chunkCount} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default StatChart;

// const statChartData = [
//     {name: 'HP', value: 150 ,maxValue: MAX_STAT_VALUE},
//     {name: 'Attack', value: 60, maxValue: MAX_STAT_VALUE},
//     {name: 'Defense', value: 45 ,maxValue: MAX_STAT_VALUE},
//     {name: 'Speed Attack', value: 90, maxValue: MAX_STAT_VALUE},
//     {name: 'Special Defense', value: 45, maxValue: MAX_STAT_VALUE},
//     {name: 'Speed', value: 200, maxValue: MAX_STAT_VALUE},
// ]
