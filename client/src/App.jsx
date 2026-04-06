import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">Sprint Board</p>
            <h1>Work Items</h1>
          </div>
        </header>
        <Board />
      </div>
    </div>
  );
}

export default App;
