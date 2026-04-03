import { useEffect, useState } from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";

function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks from the server.");
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  if (loading) {
    return <p className="status-message">Loading tasks...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  return (
    <>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <div className="board">
        <Column title="To Do" tasks={todoTasks} />
        <Column title="In Progress" tasks={inProgressTasks} />
        <Column title="Done" tasks={doneTasks} />
      </div>
    </>
  );
}

export default Board;