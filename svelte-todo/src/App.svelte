<script>
  let nextId = 1;
  let text = '';
  let tasks = [];

  $: remaining = tasks.filter(t => !t.done).length;

  function addTask(label) {
    const v = (label ?? text).trim();
    if (!v) return;
    tasks = [...tasks, { id: nextId++, text: v, done: false }];
    text = '';
  }

  function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
  }

  async function add100() {
    const t0 = performance.now();
    const start = nextId;
    const extra = Array.from({length:100}, (_,i) => ({ id: start+i, text: `Task ${start+i}`, done:false }));
    tasks = [...tasks, ...extra];
    nextId += 100;
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    const t1 = performance.now();
    console.log('Svelte: render for +100 items (ms):', (t1 - t0).toFixed(2));
  }
</script>

<div style="max-width:560px;margin:40px auto;font-family:system-ui,sans-serif;">
  <h1>Svelte To-Do</h1>
  <div style="display:flex;gap:8px">
    <input bind:value={text} placeholder="Add a task" style="flex:1;padding:8px" />
    <button on:click={() => addTask()}>Add</button>
    <button on:click={add100} title="Add 100 tasks for measurement">+100</button>
  </div>

  <p style="margin-top:12px">Total: {tasks.length} · Remaining: {remaining}</p>

  <ul style="list-style:none;padding:0">
    {#each tasks as t (t.id)}
      <li style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #eee">
        <input type="checkbox" checked={t.done} on:change={() => toggleTask(t.id)} />
        <span style="flex:1; text-decoration: {t.done ? 'line-through' : 'none'}">{t.text}</span>
        <button on:click={() => deleteTask(t.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>
