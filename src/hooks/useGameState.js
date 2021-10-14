import { useEffect, useState } from "react";
import utils from "../utils/utils";

const useGameState = timeLimit => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState([1, 2, 3, 4, 5]);
    const [candidateNums, setCandidateNums] = useState([2, 3]);
    const [secondsLeft, setSecondsLeft] = useState(10);
  
    useEffect(() => {
      if (secondsLeft > 0) {
        const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
        return () => clearTimeout(timerId);
      }
    });

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
          } else {
            const newAvailableNums = availableNums.filter(
              n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
          }
    }

    return { stars, availableNums, candidateNums, secondsLeft, setGameState}
}

export default useGameState;