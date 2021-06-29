import React, { useState, useCallback, FormEvent } from "react";
import { RgbColor } from "react-colorful";
import "./App.css";
import Form from "./Form/Form";
import { formatToRGBString } from "./util";

export type TInterval = {
  firstColour: RgbColor;
  lastColour: RgbColor;
  duration: number;
};

const defaultIntervals = [
  {
    firstColour: { r: 24, g: 31, b: 47 },
    lastColour: { r: 255, g: 238, b: 187 },
    duration: 0,
  },
];

function App() {
  const [isActive, setIsActive] = useState(false);

  const [intervals, setIntervals] = useState<TInterval[]>(defaultIntervals);
  const [totalDuration, setTotalDuration] = useState(0);

  const [startDate, setStartDate] = useState<Date>();
  const [currentDate, setCurrentDate] = useState<Date>();

  const getTotalDuration = (intervals: TInterval[]) => {
    const durationSum: number = intervals.reduce((total, interval) => {
      return total + interval.duration;
    }, 0);
    setTotalDuration(durationSum);
  };

  const start = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      setIsActive(true);
      getTotalDuration(intervals);

      const updatedStartDate = new Date();
      setStartDate(updatedStartDate);
      // To do: Save intervalID outside callback so it can be used to pause or clear timer. const intervalID = useRef
      const intervalID = setInterval(() => {
        const updatedCurrentDate = new Date();
        if (
          updatedCurrentDate.getTime() >=
          updatedStartDate.getTime() + totalDuration
        ) {
          clearInterval(intervalID);
          setIsActive(false);
          setStartDate(undefined);
          setCurrentDate(undefined);
        }
        setCurrentDate(updatedCurrentDate);
      }, totalDuration / 256);
    },
    [totalDuration, intervals]
  );

  let currentColour = defaultIntervals[0].firstColour;

  // How to synch setInterval with each interval?
  // Calculate intervalEndDate for each interval?
  if (currentDate && startDate) {
    intervals.forEach((interval) => {
      const timeSpentRatio =
        (currentDate.getTime() - startDate.getTime()) / interval.duration;

      const changeAmount = {
        r: Math.round(
          (interval.lastColour.r - interval.firstColour.r) * timeSpentRatio
        ),
        g: Math.round(
          (interval.lastColour.g - interval.firstColour.g) * timeSpentRatio
        ),
        b: Math.round(
          (interval.lastColour.b - interval.firstColour.b) * timeSpentRatio
        ),
      };
      // Note: variations can be negative numbers
      // /!\ changeAmount need to be integers /!\

      currentColour = {
        r: interval.firstColour.r + changeAmount.r,
        g: interval.firstColour.g + changeAmount.g,
        b: interval.firstColour.b + changeAmount.b,
      };
    });
  }

  return (
    <div
      className="App"
      style={{ backgroundColor: formatToRGBString(currentColour) }}
    >
      {!isActive && (
        <Form start={start} intervals={intervals} setIntervals={setIntervals} />
      )}
      {isActive && (
        <div
          className="endColourCircle"
          style={{
            backgroundColor: formatToRGBString(
              intervals[intervals.length - 1].lastColour
            ),
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
