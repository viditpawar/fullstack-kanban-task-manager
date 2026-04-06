function TaskCard({ task, index, onDeleteTask }) {
  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/task-id", String(task.id));
  };

  return (
    <article
      className={`task-card priority-${task.priority}`}
      style={{ "--card-index": index }}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="task-card-top">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>

      <p>{task.description}</p>

      <div className="task-footer">
        <span className="drag-hint">Drag to move</span>
        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
