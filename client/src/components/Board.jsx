import Column from "./Column";

function Board() {
  const tasks = [
    {
      id: 1,
      title: "Set up project repository",
      description: "Initialize the full-stack Kanban task manager project",
      status: "todo",
      priority: "high",
    },
    {
      id: 2,
      title: "Build backend API",
      description: "Create Express routes for task management",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Design frontend UI",
      description: "Create Kanban board columns and task cards",
      status: "done",
      priority: "low",
    },
  ];

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="board">
      <Column title="To Do" tasks={todoTasks} />
      <Column title="In Progress" tasks={inProgressTasks} />
      <Column title="Done" tasks={doneTasks} />
    </div>
  );
}

export default Board;