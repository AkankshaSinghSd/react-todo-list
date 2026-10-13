import { useEffect, useMemo, useState } from "react";
import "./TodoApp.css";

const starterTasks = [
  { id: 1, text: "Review project proposal", completed: true },
  { id: 2, text: "Send meeting notes to the team", completed: false },
  { id: 3, text: "Plan the week ahead", completed: false },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem("little-list-tasks");
    return saved ? JSON.parse(saved) : starterTasks;
  } catch {
    return starterTasks;
  }
}

export default function TodoApp() {
  const [tasks, setTasks] = useState(loadTasks);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("little-list-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const remaining = tasks.filter((task) => !task.completed).length;
  const done = tasks.length - remaining;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const visibleTasks = useMemo(
    () => tasks.filter((task) => filter === "all" || (filter === "active" ? !task.completed : task.completed)),
    [tasks, filter],
  );

  function addTask(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTasks((current) => [{ id: crypto.randomUUID(), text, completed: false }, ...current]);
    setDraft("");
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed));
  }

  return (
    <main className="todo-shell">
      <section className="todo-card" aria-label="Todo list">
        <header className="todo-header">
          <div className="eyebrow"><span className="sun-dot" /> YOUR DAY, YOUR PACE</div>
          <h1>A little list<span>.</span></h1>
          <p className="subtitle">Small steps add up. What would you like to do?</p>
          <div className="progress-row">
            <div className="progress-copy"><span>Today’s progress</span><strong>{progress}%</strong></div>
            <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label="Today's progress">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </header>

        <form className="add-form" onSubmit={addTask}>
          <span className="input-plus" aria-hidden="true">＋</span>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add a task to your list…" aria-label="New task" />
          <button type="submit" disabled={!draft.trim()}>Add task</button>
        </form>

        <div className="list-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
            {[ ["all", "All"], ["active", "To do"], ["completed", "Done"] ].map(([value, label]) => (
              <button key={value} type="button" role="tab" aria-selected={filter === value} className={filter === value ? "filter-tab selected" : "filter-tab"} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
          <span className="task-count">{remaining} {remaining === 1 ? "task" : "tasks"} left</span>
        </div>

        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li className={task.completed ? "task-row is-complete" : "task-row"} key={task.id}>
              <button className="check-button" type="button" aria-label={task.completed ? `Mark ${task.text} as not done` : `Complete ${task.text}`} onClick={() => toggleTask(task.id)}>
                {task.completed && <span aria-hidden="true">✓</span>}
              </button>
              <span className="task-text">{task.text}</span>
              <button className="delete-button" type="button" aria-label={`Delete ${task.text}`} onClick={() => deleteTask(task.id)}>×</button>
            </li>
          ))}
          {visibleTasks.length === 0 && (
            <li className="empty-state"><span className="empty-sparkle">✳</span><strong>{filter === "completed" ? "Nothing done just yet" : filter === "active" ? "You’re all caught up" : "Your list is clear"}</strong><span>{filter === "active" ? "Take a breath. You’ve earned it." : "Add a task above to get started."}</span></li>
          )}
        </ul>

        <footer className="todo-footer">
          <span><span className="footer-sparkle">✳</span> One thing at a time.</span>
          {done > 0 && <button type="button" onClick={clearCompleted}>Clear completed</button>}
        </footer>
      </section>
      <p className="page-note">MAKE ROOM FOR WHAT MATTERS</p>
    </main>
  );
}
