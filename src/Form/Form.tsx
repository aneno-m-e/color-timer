import React, { FormEvent, useCallback } from "react";
import Interval from "../Interval";
import { TInterval } from "../App";
import "./Form.css";
import { RgbColor } from "react-colorful";

type Props = {
  start: (event: FormEvent) => void;
  intervals: TInterval[];
  setIntervals: (intervals: TInterval[]) => void;
};

function Form({ start, intervals, setIntervals }: Props) {
  const handleDurationChange = useCallback(
    (index: number, duration: number) => {
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

  const handleColourChange = useCallback(
    (index: number, id: string, colour: RgbColor) => {
      const updatedIntervals = [...intervals];
      const updatedInterval = { ...updatedIntervals[index], [id]: colour };
      updatedIntervals[index] = updatedInterval;
      setIntervals(updatedIntervals);
    },
    [intervals, setIntervals]
  );

  const handleNewInterval = () => {};

  const handleDeleteInterval = () => {};

  return (
    <form action="" onSubmit={start}>
      <h1>Colour Timer</h1>

      {intervals.map((interval, index) => (
        <Interval
          key={index}
          index={index}
          firstColour={interval.firstColour}
          lastColour={interval.lastColour}
          onDurationChange={handleDurationChange}
          onColourChange={handleColourChange}
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
