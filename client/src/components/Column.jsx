import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="empty-state">No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default Column;