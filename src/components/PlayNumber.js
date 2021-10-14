const colors = {
    available: "lightgray",
    used: "lightgreen",
    wrong: "lightcoral",
    candidate: "deepskyblue",
  };

const playNumber = props => (
    <button
     className="number" 
     onClick={() => props.onClick(props.number, props.status)}
     style={{ backgroundColor: colors[props.status]}}
     >
        {props.number}
    </button>
);

export default playNumber;