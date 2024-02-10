import React, { useEffect, useState } from "react";
import Odometer from "react-odometerjs";
import "./index.scss";
function Statistics() {
  const [value, setValue] = useState(100);
  const [value2, setValue2] = useState(100);
  const [value3, setValue3] = useState(100);
  const [value4, setValue4] = useState(100);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(309);
      setValue2(508);
      setValue3(1032);
      setValue4(650);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div id="statistics">
      <div className="container">
        <h1>Nuron Statistics</h1>
        <div className="cards-statistics">
          <div className="card">
            <Odometer
              value={value}
              format="(.ddd),dd"
              classID="odometer-style"
            />
            <p>Nuron All NFT's</p>
          </div>
          <div className="card">
            <Odometer
              value={value2}
              format="(.ddd),dd"
              classID="odometer-style"
            />
            <p>All Creators</p>
          </div>
          <div className="card">
            <Odometer
              value={value3}
              format="(.ddd),dd"
              classID="odometer-style"
            />
            <p>Nuron Earning</p>
          </div>
          <div className="card">
            <Odometer
              value={value4}
              format="(.ddd),dd"
              classID="odometer-style"
            />
            <p>Level One Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
