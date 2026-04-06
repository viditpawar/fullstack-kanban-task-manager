import { useState } from "react";
import TaskCard from "./TaskCard";

function Column({
  title,
  columnKey,
  tasks,
  emptyMessage,
  canAddTask,
  onTaskCreate,
  onTaskDrop,
  onDeleteTask,
}) {
  const [isDropTarget, setIsDropTarget] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsDropTarget(true);
  };

  const handleDragLeave = () => {
    setIsDropTarget(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDropTarget(false);

    const rawTaskId = event.dataTransfer.getData("text/task-id");
    const taskId = Number(rawTaskId);

    if (!taskId) {
      return;
    }

    onTaskDrop(taskId, columnKey);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
    });
    setFormError("");
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title) {
      setFormError("Title is required.");
      return;
    }

    setCreating(true);
    setFormError("");

    const createdTask = await onTaskCreate({
      title,
      description: description || title,
      priority: formData.priority,
    });

    if (!createdTask) {
      setFormError("Unable to add task right now.");
      setCreating(false);
      return;
    }

    resetForm();
    setShowAddForm(false);
    setCreating(false);
  };

  const handleToggleAddForm = () => {
    if (showAddForm) {
      resetForm();
      setShowAddForm(false);
      return;
    }

    setShowAddForm(true);
  };

  return (
    <section
      className={`column ${columnKey} ${isDropTarget ? "is-drop-target" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <div className="column-title">
          <h2>{title}</h2>
          <span className="column-count">{tasks.length}</span>
        </div>

        {canAddTask && (
          <button
            type="button"
            className="add-task-button"
            onClick={handleToggleAddForm}
          >
            {showAddForm ? "Cancel" : "+ Add"}
          </button>
        )}
      </header>

      {canAddTask && showAddForm && (
        <form className="inline-add-form" onSubmit={handleAddSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            placeholder="Work item title"
            maxLength={120}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Description (optional)"
            maxLength={280}
          />
          <div className="inline-add-footer">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleFormChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" disabled={creating}>
              {creating ? "Adding..." : "Add task"}
            </button>
          </div>
          {formError && <p className="inline-form-error">{formError}</p>}
        </form>
      )}

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <p className="empty-state">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}

export default Column;
