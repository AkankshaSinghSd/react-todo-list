import React from "react";
import "../components/todo.css";
import DeleteIcon from "../components/delete.svg";
const TodoList = (props) => {
  return (
    <>
      <div className="todo-Style">
        <span className="fa-times">
          <img
            height={24}
            width={24}
            src={DeleteIcon}
            onClick={() => {
              props.onSelect(props.id);
            }}
          />
        </span>
        <li>{props.text}</li>
      </div>
    </>
  );
};

export default TodoList;
