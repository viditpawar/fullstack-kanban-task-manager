function TaskCard({ task, onStatusChange }) {
  const handleChange = (event) => {
    onStatusChange(task.id, event.target.value);
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-meta">
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>

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
      </div>
    </div>
  );
}

export default TaskCard;