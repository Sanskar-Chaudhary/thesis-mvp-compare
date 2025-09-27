import { useMemo, useState } from 'react';

let nextId = 1;

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  const remaining = useMemo(() => tasks.filter(t => !t.done).length, [tasks]);

  function addTask(label) {
    setTasks(prev => [...prev, { id: nextId++, text: (label ?? text).trim(), done: false }]);
    setText('');
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  async function add100() {
    const t0 = performance.now();
    // batch: set state once to include 100 new tasks
    setTasks(prev => {
      const start = nextId;
      const arr = [...prev];
      for (let i = 0; i < 100; i++) {
        arr.push({ id: start + i, text: `Task ${start + i}`, done: false });
      }
      nextId += 100;
      return arr;
    });
    // wait 2 frames to allow paint
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    const t1 = performance.now();
    console.log('React: render for +100 items (ms):', (t1 - t0).toFixed(2));
  }

  return (
    <div style={{maxWidth: 560, margin: '40px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1>React To-Do</h1>
      <div style={{display:'flex', gap:8}}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task"
          style={{flex:1, padding:8}}
        />
        <button onClick={() => text.trim() && addTask()}>Add</button>
        <button onClick={add100} title="Add 100 tasks for measurement">+100</button>
      </div>

      <p style={{marginTop:12}}>
        Total: {tasks.length} · Remaining: {remaining}
      </p>

      <ul style={{listStyle:'none', padding:0}}>
        {tasks.map(t => (
          <li key={t.id} style={{display:'flex', alignItems:'center', gap:8, padding:'6px 0', borderBottom:'1px solid #eee'}}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
            <span style={{flex:1, textDecoration: t.done ? 'line-through' : 'none'}}>{t.text}</span>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
