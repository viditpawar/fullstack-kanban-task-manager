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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);

      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskToUpdate,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status.");
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");
  const completionRate = tasks.length
    ? Math.round((doneTasks.length / tasks.length) * 100)
    : 0;

  if (loading) {
    return <p className="status-message loading-panel">Loading tasks...</p>;
  }

  return (
    <>
      <section className="board-overview" aria-label="Task metrics">
        <article className="metric-card">
          <p>Total Tasks</p>
          <strong>{tasks.length}</strong>
        </article>
        <article className="metric-card">
          <p>High Priority</p>
          <strong>{highPriorityTasks.length}</strong>
        </article>
        <article className="metric-card">
          <p>Completed</p>
          <strong>{completionRate}%</strong>
        </article>
      </section>

      <TaskForm onTaskCreated={handleTaskCreated} />
      {error && <p className="status-message error">{error}</p>}

      <div className="board">
        <Column
          title="To Do"
          columnKey="todo"
          tasks={todoTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          emptyMessage="No tasks waiting here yet."
        />
        <Column
          title="In Progress"
          columnKey="in-progress"
          tasks={inProgressTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          emptyMessage="Nothing is currently in progress."
        />
        <Column
          title="Done"
          columnKey="done"
          tasks={doneTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          emptyMessage="Completed tasks will appear here."
        />
      </div>
    </>
  );
}

export default Board;
