import { useEffect, useMemo, useState } from "react";
import Column from "./Column";

const columns = [
  {
    key: "todo",
    title: "To Do",
    emptyMessage: "No items yet. Add one to start this sprint.",
    canAddTask: true,
  },
  {
    key: "in-progress",
    title: "In Progress",
    emptyMessage: "Drag work items here when you start them.",
    canAddTask: false,
  },
  {
    key: "done",
    title: "Done",
    emptyMessage: "Completed work will stack up here.",
    canAddTask: false,
  },
];

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

  const handleTaskCreate = async (taskDraft) => {
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskDraft,
          status: "todo",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task.");
      }

      const newTask = await response.json();
      setTasks((previousTasks) => [newTask, ...previousTasks]);
      return newTask;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setError("");

    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);

      if (!taskToUpdate) {
        return false;
      }

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
        previousTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleTaskDrop = async (taskId, newStatus) => {
    const taskToMove = tasks.find((task) => task.id === taskId);

    if (!taskToMove || taskToMove.status === newStatus) {
      return;
    }

    await handleStatusChange(taskId, newStatus);
  };

  const handleDeleteTask = async (taskId) => {
    setError("");

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

  const tasksByColumn = useMemo(() => {
    const sortByNewest = (list) => [...list].sort((a, b) => b.id - a.id);

    return {
      todo: sortByNewest(tasks.filter((task) => task.status === "todo")),
      "in-progress": sortByNewest(
        tasks.filter((task) => task.status === "in-progress")
      ),
      done: sortByNewest(tasks.filter((task) => task.status === "done")),
    };
  }, [tasks]);

  if (loading) {
    return <p className="status-message loading-panel">Loading board...</p>;
  }

  return (
    <>
      {error && <p className="status-message error">{error}</p>}

      <section className="board" aria-label="Kanban board">
        {columns.map((column) => (
          <Column
            key={column.key}
            title={column.title}
            columnKey={column.key}
            tasks={tasksByColumn[column.key]}
            emptyMessage={column.emptyMessage}
            canAddTask={column.canAddTask}
            onTaskCreate={handleTaskCreate}
            onTaskDrop={handleTaskDrop}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </section>
    </>
  );
}

export default Board;
