import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-shell">
        <header className="app-header">
          <p className="eyebrow">Kanban Workspace</p>
          <h1>Full Stack Kanban Task Manager</h1>
          <p className="subtitle">
            Plan clearly, ship faster, and keep every task in one focused board.
          </p>
        </header>
        <Board />
      </div>
    </div>
  );
}

export default App;
