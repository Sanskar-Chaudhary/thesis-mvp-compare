<script>
  let nextId = 1;
  let text = '';
  let tasks = [];

  $: remaining = tasks.filter(t => !t.done).length;

  function addOne(label) {
    const v = (label ?? text).trim();
    if (!v) return;
    tasks = [...tasks, { id: nextId++, text: v, done: false }];
    text = '';
  }

  function toggleTask(id) {
    tasks = tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
  }

  function raf2() {
    return new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
  }

  async function addN(n) {
    const t0 = performance.now();
    const start = nextId;
    const extra = Array.from({ length: n }, (_, i) => ({
      id: start + i, text: `Task ${start + i}`, done: false
    }));
    tasks = [...tasks, ...extra];
    nextId += n;
    await raf2();
    const t1 = performance.now();
    console.log(`Svelte: add ${n} items (ms):`, (t1 - t0).toFixed(2));
  }

  async function deleteAll() {
    const t0 = performance.now();
    tasks = [];
    await raf2();
    const t1 = performance.now();
    console.log('Svelte: delete ALL items (ms):', (t1 - t0).toFixed(2));
  }
</script>

<div style="max-width:560px;margin:40px auto;font-family:system-ui,sans-serif;">
  <h1 style="text-align:center">Svelte To-Do</h1>

  <div style="display:flex;gap:8px">
    <input bind:value={text} placeholder="Add a task" style="flex:1;padding:8px" />
    <button on:click={() => addOne()}>Add</button>
  </div>

  <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
    <button on:click={() => addN(100)}>+100</button>
    <button on:click={() => addN(1000)}>+1,000</button>
    <button on:click={() => addN(10000)}>+10,000</button>
    <button on:click={() => addN(20000)}>+20,000</button>
    <button on:click={deleteAll} style="margin-left:auto">Delete All</button>
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
