import { useState } from "react";
import "./styles.css";

let todos = [];
const ToDoElement = ({ value, idx, onCompleteToDo, removeToDoItem }) => {
  console.log("value:", value);
  return (
    <li
      style={{
        textAlign: "left",
        margin: 15,
        backgroundColor: value.isCompleted ? "#5ae31982" : "#e3251582"
      }}
    >
      {value.todo}
      <button onClick={() => onCompleteToDo(idx)}>
        {value.isCompleted ? "complete task" : "task Completed"}
      </button>
      <button onClick={() => removeToDoItem(idx)}>remove to do item</button>
    </li>
  );
};

export default function App() {
  //for input
  const [inputValue, setToDo] = useState({
    todo: "",
    isCompleted: false
  });
  // for managing todo list
  const [todos, updateToDoList] = useState([]);

  //3 tasks to complete
  //add todo
  addToDo = () => {
    if (inputValue.todo) {
      updateToDoList([...todos, inputValue]);
      setToDo({
        //reset input field
        todo: "",
        isCompleted: false
      });
    }
    console.log("our todos", todos);
  };

  //complete todo
  onCompleteToDo = (idx) => {
    const ourItem = todos[idx];
    const mTodos = [...todos];
    //change object property isCompleted
    const updatedItem = {
      ...ourItem,
      isCompleted: !ourItem.isCompleted
    };
    //put updated item into todo list
    mTodos[idx] = updatedItem;
    updateToDoList(mTodos);
  };

  //remove todo
  removeToDoItem = (idx) => {
    const mTodos = [...todos];
    mTodos.splice(idx, 1);
    //update todos list
    updateToDoList(mTodos);
  };

  return (
    <div className="App">
      <h1 style={{ textDecoration: "underline" }}>Simple To Do List</h1>
      <input
        className="inputField"
        type="text"
        value={inputValue.todo}
        placeHolder="add to do item"
        onChange={(e) =>
          setToDo({
            todo: e.target.value,
            isCompleted: false
          })
        }
      />
      <button onClick={addToDo}>add To Do</button>
      <ul>
        {todos.length > 0 &&
          todos.map((value, idx) => {
            return (
              <ToDoElement
                key={value.todo + idx}
                value={value}
                idx={idx}
                onCompleteToDo={onCompleteToDo}
                removeToDoItem={removeToDoItem}
              />
            );
          })}
      </ul>
    </div>
  );
}
