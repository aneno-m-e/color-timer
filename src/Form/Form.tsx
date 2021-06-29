import React, { FormEvent, useCallback } from "react";
import Interval from "../Interval";
import { TInterval } from "../App";
import "./Form.css";

type Props = {
  start: (event: FormEvent) => void;
  intervals: TInterval[];
  setIntervals: (intervals: TInterval[]) => void;
};

function Form({ start, intervals, setIntervals }: Props) {
  const handleDurationChange = useCallback(
    (index, duration) => {
      // to review with Lydie
      const updatedIntervals = [...intervals];
      console.log(intervals, updatedIntervals);
      updatedIntervals[index].duration = duration;
      console.log(intervals, updatedIntervals);

      setIntervals(updatedIntervals);
      // setIntervals((oldIntervals) => {
      //   const updatedIntervals = oldIntervals;
      //   updatedIntervals[index].duration = duration;
      //   return updatedIntervals;
      // });
    },
    [intervals, setIntervals]
  );

  const handleColorChange = () => {}; //need to pass to interval

  const handleNewInterval = () => {};

  const handleDeleteInterval = () => {};

  return (
    <form action="" onSubmit={start}>
      <h1>Colour Timer</h1>

      {intervals.map((interval, index) => (
        <Interval
          key={index}
          index={index}
          onDurationChange={handleDurationChange}
        />
      ))}
      <button type="button" onClick={handleNewInterval}>
        Add interval
      </button>

      <button type="submit">Start !</button>
    </form>
  );
}

export default Form;
