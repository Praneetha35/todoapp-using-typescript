import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import TodoTask from "./components/toDoTask";
import { task } from "./interfaces";
  
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<task[]>(
    JSON.parse(localStorage.getItem("list") ?? "[]")
  );

  //set a state to the value of the input --> ChangeEvent
  //HTMLInputElement -- > changing the input of an html event
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      //Convert the input string into number
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    addData({ taskName: task, days: deadline }).then((data) => {
      const newTask = { taskName: task, deadline: deadline, _id: data.id };
      setTodoList([...todoList, newTask]);
      //Reset everything before adding new task
      setTask("");
      setDealine(0);
    });
  };

  const completeTask = (id: string): void => {
    removeData(id);
    console.log(id);
    console.log(todoList);
    console.table(todoList);
    setTodoList(
      todoList.filter((task) => {
        return task._id !== id;
      })
    );
  };

  const API_URL = "http://localhost:3000/tasks";

  async function fetchData() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (err: any) {
      console.log(Object.entries(err));
    }
  }

  fetchData().then((data) => {
    console.log(data);
  });

  async function addData(newTask: { taskName: string; days: number }) {
    try {
      let response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          ...newTask,
          someBoolean: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      return result;
    } catch (err) {}
  }

  async function removeData(id: string) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
    } catch (err) {}
  }

  useEffect(() => {
    const list = localStorage.getItem("list");
    console.log(list);
    if (list) {
      setTodoList(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todoList);
    localStorage.setItem("list", json);
  }, [todoList]);

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task"
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in days)"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: task, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;







//The Headers interface of the Fetch API allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing headers from the list of the request's headers.
//task --> contains the list of all the tasks
