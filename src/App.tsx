import { useState, useEffect, memo } from "react";
import "./App.css";
import { BottomContent } from "./components/BottomContent";

type Option = {
  value: string;
  x: number;
  y: number;
  id: string;
};

function App() {
  const [guess, setGuess] = useState<GuessTypes>("scissors");
  const [playing, setPlaying] = useState(false);
  const [scissors, setScissors] = useState<Option[]>([]);
  const [rocks, setRocks] = useState<Option[]>([]);
  const [papers, setPapers] = useState<Option[]>([]);

  const box = document.getElementById("game-box");
  const position = box?.getBoundingClientRect();
  const left = position?.left;
  const top = position?.top;
  const right = position?.right;
  const bottom = position?.bottom;

  useEffect(() => {
    if (left && top && right && bottom) {
      setScissors(() => {
        let value = [];
        for (let i = 0; i < 10; i++) {
          value.push({
            value: "✂️",
            x: Math.floor(Math.random() * (right - left) + left),
            y: Math.floor(Math.random() * (bottom - top) + top),
            id: i + "scissor",
          });
        }
        return value;
      });

      setRocks(() => {
        let value = [];
        for (let i = 0; i < 10; i++) {
          value.push({
            value: "🪨",
            x: Math.floor(Math.random() * (right - left) + left),
            y: Math.floor(Math.random() * (bottom - top) + top),
            id: i + "rock",
          });
        }
        return value;
      });

      setPapers(() => {
        let value = [];
        for (let i = 0; i < 10; i++) {
          value.push({
            value: "📄",
            x: Math.floor(Math.random() * (right - left) + left),
            y: Math.floor(Math.random() * (bottom - top) + top),
            id: i + "paper",
          });
        }
        return value;
      });
    }
  }, [guess, left, top, right, bottom]);

  const handleHit = (option: Option, optionList: Option[]) => {
    // return true or false for hit
    const hit = optionList.some(item => {
      return (
        option.x > item.x - 20 &&
        option.x < item.x + 20 &&
        option.y > item.y - 20 &&
        option.y < item.y + 20
      );
    });

    return hit;
  };

  const handleTransferItem = (
    option: Option,
    optionList: Option[],
    optionList2: Option[],
    value: string
  ) => {
    const index = optionList.findIndex(item => item.id === option.id);
    const newList = [...optionList];
    newList.splice(index, 1);
    const newItem = {
      ...option,
      value,
    };
    optionList = newList;
    optionList2.push(newItem);
    return [optionList, optionList2];
  };

  useEffect(() => {
    if (!playing) return;
    const timeout = setTimeout(() => {
      if (left && top && right && bottom) {
        let newScissors = [...scissors];
        let newRocks = [...rocks];
        let newPapers = [...papers];

        newScissors.forEach(() => {
          let value = newScissors.map(item => {
            const x = Math.round(Math.random() * 10 - 5 + item.x);
            const y = Math.round(Math.random() * 10 - 5 + item.y);
            return {
              ...item,
              x: x > left && x < right ? x : item.x,
              y: y > top && y < bottom ? y : item.y,
            };
          });

          value.forEach(item => {
            if (handleHit(item, rocks)) {
              const [newScissorsValue, newRocksValue] = handleTransferItem(
                item,
                value,
                newRocks,
                "🪨"
              );
              value = newScissorsValue;
              newRocks = newRocksValue;
            }
          });

          newScissors = value;
        });

        newRocks.forEach(() => {
          let value = newRocks.map(item => {
            const x = Math.round(Math.random() * 10 - 5 + item.x);
            const y = Math.round(Math.random() * 10 - 5 + item.y);
            return {
              ...item,
              x: x > left && x < right ? x : item.x,
              y: y > top && y < bottom ? y : item.y,
            };
          });

          value.forEach(item => {
            if (handleHit(item, papers)) {
              const [newRocksValue, newPapersValue] = handleTransferItem(
                item,
                value,
                newPapers,
                "📄"
              );
              value = newRocksValue;
              newPapers = newPapersValue;
            }
          });

          newRocks = value;
        });

        newPapers.forEach(() => {
          let value = newPapers.map(item => {
            const x = Math.round(Math.random() * 10 - 5 + item.x);
            const y = Math.round(Math.random() * 10 - 5 + item.y);
            return {
              ...item,
              x: x > left && x < right ? x : item.x,
              y: y > top && y < bottom ? y : item.y,
            };
          });

          value.forEach(item => {
            if (handleHit(item, scissors)) {
              const [newPapersValue, newScissorsValue] = handleTransferItem(
                item,
                value,
                newScissors,
                "✂️"
              );
              value = newPapersValue;
              newScissors = newScissorsValue;
            }
          });

          newPapers = value;
        });

        setScissors(newScissors);
        setRocks(newRocks);
        setPapers(newPapers);
      }

      if (
        playing &&
        guess === "scissors" &&
        scissors.length > 0 &&
        rocks.length === 0
      ) {
        alert("You win!");
        setPlaying(false);
      } else if (playing && guess === "scissors" && scissors.length === 0) {
        alert("You lose!");
        setPlaying(false);
      } else if (playing && guess === "scissors" && rocks.length === 0) {
        alert("You win!");
        setPlaying(false);
      } else if (
        playing &&
        guess === "scissors" &&
        papers.length === 0 &&
        rocks.length > 0
      ) {
        alert("You lose!");
        setPlaying(false);
      } else if (
        playing &&
        guess === "rocks" &&
        rocks.length > 0 &&
        papers.length === 0
      ) {
        alert("You win!");
        setPlaying(false);
      } else if (playing && guess === "rocks" && rocks.length === 0) {
        alert("You lose!");
        setPlaying(false);
      } else if (playing && guess === "rocks" && papers.length === 0) {
        alert("You win!");
        setPlaying(false);
      } else if (
        playing &&
        guess === "rocks" &&
        scissors.length === 0 &&
        papers.length > 0
      ) {
        alert("You lose!");
        setPlaying(false);
      } else if (
        playing &&
        guess === "papers" &&
        papers.length > 0 &&
        scissors.length === 0
      ) {
        alert("You win!");
        setPlaying(false);
      } else if (playing && guess === "papers" && papers.length === 0) {
        alert("You lose!");
        setPlaying(false);
      } else if (playing && guess === "papers" && scissors.length === 0) {
        alert("You win!");
        setPlaying(false);
      } else if (
        playing &&
        guess === "papers" &&
        rocks.length === 0 &&
        scissors.length > 0
      ) {
        alert("You lose!");
        setPlaying(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [playing, scissors, rocks, papers]);

  return (
    <div className='App'>
      <div className='container'>
        <div className='game-box' id='game-box'>
          {scissors.map(scissor => (
            <div
              key={scissor.id}
              className='option'
              style={{
                position: "absolute",
                left: scissor.x,
                top: scissor.y,
                transition: "0.25s all linear",
              }}
            >
              {scissor.value}
            </div>
          ))}
          {rocks.map(rock => (
            <div
              key={rock.id}
              className='option'
              style={{
                position: "absolute",
                left: rock.x,
                top: rock.y,
                transition: "0.25s all linear",
              }}
            >
              {rock.value}
            </div>
          ))}
          {papers.map(paper => (
            <div
              key={paper.id}
              className='option'
              style={{
                position: "absolute",
                left: paper.x,
                top: paper.y,
                transition: "0.25s all linear",
              }}
            >
              {paper.value}
            </div>
          ))}
        </div>
      </div>
      <BottomContent guess={guess} setGuess={setGuess} setPlaying={setPlaying} />
    </div>
  );
}

export default memo(App);
