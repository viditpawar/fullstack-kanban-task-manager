import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Full Stack Kanban Task Manager</h1>
        <p>Task tracking dashboard with CI/CD-ready architecture</p>
      </header>
      <Board />
    </div>
  );
}

export default App;