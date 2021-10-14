import StarsDisplay from "./StarsDisplay";
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";
import useGameState from "../hooks/useGameState";
import utils from "../utils/utils";

const Game = props => {
    const { stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();
    
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0
      ? 'won'
      : secondsLeft === 0 ? 'lost' : 'active'
  
    const numberStatus = (number) => {
      if (!availableNums.includes(number)) {
        return "used";
      }
      if (candidateNums.includes(number)) {
        return candidatesAreWrong ? "wrong" : "candidate";
      }

      return 'available';
    };
  
    const onNumberClick = (number, currentStatus) => {
      if ( currentStatus === 'used' || secondsLeft === 0) {
        return;
      }
  
      const newCandidateNums = currentStatus === "available" ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);
  
      setGameState(newCandidateNums)
    }
  
    return (
        <div className="game">
            <div className="help">
                Pick one or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                  {gameStatus !== "active" ? (
                    <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                  ) : (
                    <StarsDisplay utils={utils} count={stars}/>
                  )}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                         onClick={onNumberClick}
                         key={number} 
                         number={number}
                         status={numberStatus(number)} />   
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
  }

  export default Game;