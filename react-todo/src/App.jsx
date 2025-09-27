import { useMemo, useState } from 'react';

let nextId = 1;

function raf2() {
  return new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
}

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  const remaining = useMemo(() => tasks.filter(t => !t.done).length, [tasks]);

  function addOne(label) {
    const v = (label ?? text).trim();
    if (!v) return;
    setTasks(prev => [...prev, { id: nextId++, text: v, done: false }]);
    setText('');
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  async function addN(n) {
    const t0 = performance.now();
    setTasks(prev => {
      const start = nextId;
      const arr = prev.slice();
      for (let i = 0; i < n; i++) {
        arr.push({ id: start + i, text: `Task ${start + i}`, done: false });
      }
      nextId += n;
      return arr;
    });
    await raf2();
    const t1 = performance.now();
    console.log(`React: add ${n} items (ms):`, (t1 - t0).toFixed(2));
  }

  async function deleteAll() {
    const t0 = performance.now();
    setTasks([]);
    await raf2();
    const t1 = performance.now();
    console.log('React: delete ALL items (ms):', (t1 - t0).toFixed(2));
  }

  return (
    <div style={{maxWidth: 560, margin: '40px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1 style={{textAlign:'center'}}>React To-Do</h1>

      <div style={{display:'flex', gap:8}}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task"
          style={{flex:1, padding:8}}
        />
        <button onClick={() => addOne()}>Add</button>
      </div>

      <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
        <button onClick={() => addN(100)}>+100</button>
        <button onClick={() => addN(1000)}>+1,000</button>
        <button onClick={() => addN(10000)}>+10,000</button>
        <button onClick={() => addN(20000)}>+20,000</button>
        <button onClick={deleteAll} style={{marginLeft:'auto'}}>Delete All</button>
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
