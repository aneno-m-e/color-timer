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
    lastColour: { r: 70, g: 187, b: 226 },
    duration: 60000,
  },

  {
    firstColour: { r: 70, g: 187, b: 226 },
    lastColour: { r: 170, g: 13, b: 90 },
    duration: 20000,
  },
];

function App() {
  // To do
  // - Check accessibility
  // - Test
  // - Display error message if duration = 0
  // - Implemente pause and restart
  // - Create favicon
  // - Hide delete button of first interval if it's by itself
  // - Create utils with previousInterval and nextInterval to make code more readable?

  const [isActive, setIsActive] = useState(false);

  const [intervals, setIntervals] = useState<TInterval[]>(defaultIntervals);

  const [startDate, setStartDate] = useState<Date>();
  const [currentDate, setCurrentDate] = useState<Date>();
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [index, setIndex] = useState<number>(0); // Remove 0?

  let currentColour = intervals[0].firstColour;

  const timer = useCallback(
    async (interval: TInterval, i: number) => {
      return new Promise<void>((resolve, reject) => {
        const updatedStartDate = new Date();
        setStartDate(updatedStartDate);

        // To do: Save intervalID outside callback so it can be used to pause or clear timer. const intervalID = useRef
        const intervalID = setInterval(() => {
          const updatedCurrentDate = new Date();
          if (
            updatedCurrentDate.getTime() >=
            updatedStartDate.getTime() + interval.duration
          ) {
            if (i === intervals.length - 1) {
              setIsActive(false);
              setStartDate(undefined);
              setCurrentDate(undefined);
            }
            resolve();
            clearInterval(intervalID);
          }
          setCurrentDate(updatedCurrentDate);
        }, interval.duration / 256);
      });
    },
    [intervals.length]
  );

  const loopThroughEachInterval = useCallback(async () => {
    for (let i = 0; i < intervals.length; i++) {
      let interval = intervals[i];

      setIndex(i);
      await timer(interval, i);
    }
  }, [timer, intervals]);

  const start = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      try {
        if (totalDuration === 0) throw new Error("Duration = 0");
      } catch (err) {
        console.error(err.message);
        return false;
      }
      setIsActive(true);
      loopThroughEachInterval();
    },
    [totalDuration, loopThroughEachInterval]
  );

  if (currentDate && startDate) {
    const timeSpentRatio =
      (currentDate.getTime() - startDate.getTime()) / intervals[index].duration;

    const changeAmount = {
      r: Math.round(
        (intervals[index].lastColour.r - intervals[index].firstColour.r) *
          timeSpentRatio
      ),
      g: Math.round(
        (intervals[index].lastColour.g - intervals[index].firstColour.g) *
          timeSpentRatio
      ),
      b: Math.round(
        (intervals[index].lastColour.b - intervals[index].firstColour.b) *
          timeSpentRatio
      ),
    };
    // Note: variations can be negative numbers
    // /!\ changeAmount need to be integers /!\

    currentColour = {
      r: intervals[index].firstColour.r + changeAmount.r,
      g: intervals[index].firstColour.g + changeAmount.g,
      b: intervals[index].firstColour.b + changeAmount.b,
    };
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: formatToRGBString(currentColour),
      }}
    >
      {!isActive && (
        <Form
          start={start}
          intervals={intervals}
          setIntervals={setIntervals}
          setTotalDuration={setTotalDuration}
        />
      )}
      {isActive &&
        intervals.map((interval, index) => (
          <div
            className="firstToLastColourCircle"
            key={index}
            style={{
              backgroundImage: `linear-gradient(to right, ${formatToRGBString(
                interval.firstColour
              )}, ${formatToRGBString(interval.lastColour)})`,
              // backgroundColor:  formatToRGBString(intervals[index].lastColour),
            }}
          ></div>
        ))}
    </div>
  );
}

export default App;
