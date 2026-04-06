import TaskCard from "./TaskCard";

function Column({
  title,
  columnKey,
  tasks,
  onStatusChange,
  onDeleteTask,
  emptyMessage,
}) {
  return (
    <section className={`column ${columnKey}`}>
      <header className="column-header">
        <h2>{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </header>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onStatusChange={onStatusChange}
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
