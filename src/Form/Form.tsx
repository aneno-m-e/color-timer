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
      const updatedIntervals = [...intervals];
      const updatedInterval = {
        ...updatedIntervals[index],
        duration: duration,
      };
      updatedIntervals[index] = updatedInterval;

      setIntervals(updatedIntervals);

      // to review with Lydie
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
      if (intervals.length > 1 && id === "firstColour" && index > 0) {
        updatedIntervals[index - 1] = {
          ...updatedIntervals[index - 1],
          lastColour: colour,
        };
      }
      if (
        intervals.length > 1 &&
        id === "lastColour" &&
        index < intervals.length - 1
      ) {
        updatedIntervals[index + 1] = {
          ...updatedIntervals[index + 1],
          firstColour: colour,
        };
      }
      setIntervals(updatedIntervals);
    },
    [intervals, setIntervals]
  );

  const handleNewInterval = useCallback(() => {
    const newIntervals = [...intervals];
    const newInterval = {
      ...newIntervals[0],
      firstColour: {
        ...newIntervals[newIntervals.length - 1].lastColour,
      },
      lastColour: { r: 255, g: 255, b: 255 },
    };
    newIntervals.push(newInterval);
    setIntervals(newIntervals);
  }, [intervals, setIntervals]);

  const handleDeleteInterval = (index: number) => {
    const updatedIntervals = [...intervals];
    updatedIntervals.splice(index, 1);

    // //Makes sure new element's firstColour at index matches previous element's lastColour
    if (0 < index && index < intervals.length - 1) {
      updatedIntervals[index] = {
        ...updatedIntervals[index],
        firstColour: { ...updatedIntervals[index - 1].lastColour },
      };
    }
    setIntervals(updatedIntervals);
  };

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
          onDelete={handleDeleteInterval}
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
