function TaskCard({ task, index, onStatusChange, onDeleteTask }) {
  const handleChange = (event) => {
    onStatusChange(task.id, event.target.value);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <article
      className={`task-card priority-${task.priority}`}
      style={{ "--card-index": index }}
    >
      <div className="task-card-top">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>
      <p>{task.description}</p>

      <div className="task-actions">
        <label htmlFor={`status-${task.id}`}>Status</label>
        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={handleChange}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button type="button" className="delete-button" onClick={handleDelete}>
          Delete Task
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
