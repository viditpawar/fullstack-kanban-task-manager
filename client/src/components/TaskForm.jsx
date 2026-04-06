import { useState } from "react";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task.");
      }

      const newTask = await response.json();
      onTaskCreated(newTask);

      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Create New Task</h2>
        <p>Add details once, then move tasks across columns as work progresses.</p>
      </div>

      <div className="form-grid">
        <label className="field" htmlFor="task-title">
          <span>Title</span>
          <input
            id="task-title"
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field field-wide" htmlFor="task-description">
          <span>Description</span>
          <textarea
            id="task-description"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field" htmlFor="task-status">
          <span>Status</span>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label className="field" htmlFor="task-priority">
          <span>Priority</span>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </div>

      <div className="form-footer">
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Add Task"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </div>
    </form>
  );
}

export default TaskForm;
