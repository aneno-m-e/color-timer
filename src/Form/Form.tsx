import React, { FormEvent, useCallback } from "react";
import Interval from "../Interval/Interval";
import { TInterval } from "../App";
import "./Form.css";
import { RgbColor } from "react-colorful";
import { TinyColor, random } from "@ctrl/tinycolor";

type Props = {
  start: (event: FormEvent) => void;
  intervals: TInterval[];
  setIntervals: (intervals: TInterval[]) => void;
  setTotalDuration: (duration: number) => void;
};

function Form({ start, intervals, setIntervals, setTotalDuration }: Props) {
  const handleDurationChange = useCallback(
    (index: number, duration: number) => {
      const updatedIntervals = [...intervals];
      const updatedInterval = {
        ...updatedIntervals[index],
        duration: duration,
      };
      updatedIntervals[index] = updatedInterval;

      setTotalDuration(
        updatedIntervals.reduce((total, interval) => {
          return total + interval.duration;
        }, 0)
      );
      setIntervals(updatedIntervals);
    },
    [intervals, setIntervals, setTotalDuration]
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
    const previousInterval = newIntervals[newIntervals.length - 1];

    // Find best way to generate new colour with a good contraste to previous colour
    const newIntervalLastColour = (colour: RgbColor) => {
      if (newIntervals.indexOf(previousInterval) % 2 == 0) {
        return new TinyColor(previousInterval.lastColour)
          .tetrad()[3]
          .darken(20);
      }
      return new TinyColor(previousInterval.lastColour).triad()[2].lighten(20);
    };
    const newInterval = {
      ...newIntervals[0],
      firstColour: previousInterval.lastColour,
      lastColour: newIntervalLastColour(previousInterval.lastColour),
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
          showDeleteButton={intervals.length > 1}
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
