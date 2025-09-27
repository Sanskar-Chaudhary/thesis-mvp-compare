<script setup>
import { ref, computed } from 'vue';

let nextId = 1;
const text = ref('');
const tasks = ref([]);

const remaining = computed(() => tasks.value.filter(t => !t.done).length);

function addOne(label) {
  const v = (label ?? text.value).trim();
  if (!v) return;
  tasks.value.push({ id: nextId++, text: v, done: false });
  text.value = '';
}

function toggleTask(id) {
  const t = tasks.value.find(t => t.id === id);
  if (t) t.done = !t.done;
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}

function raf2() {
  return new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res)));
}

async function addN(n) {
  const t0 = performance.now();
  const start = nextId;
  // push in one tick
  for (let i = 0; i < n; i++) {
    tasks.value.push({ id: start + i, text: `Task ${start + i}`, done: false });
  }
  nextId += n;
  await raf2();
  const t1 = performance.now();
  console.log(`Vue: add ${n} items (ms):`, (t1 - t0).toFixed(2));
}

async function deleteAll() {
  const t0 = performance.now();
  tasks.value = [];
  await raf2();
  const t1 = performance.now();
  console.log('Vue: delete ALL items (ms):', (t1 - t0).toFixed(2));
}
</script>

<template>
  <div style="max-width:560px;margin:40px auto;font-family:system-ui,sans-serif;">
    <h1 style="text-align:center">Vue To-Do</h1>

    <div style="display:flex;gap:8px">
      <input v-model="text" placeholder="Add a task" style="flex:1;padding:8px" />
      <button @click="addOne()">Add</button>
    </div>

    <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
      <button @click="addN(100)">+100</button>
      <button @click="addN(1000)">+1,000</button>
      <button @click="addN(10000)">+10,000</button>
      <button @click="addN(20000)">+20,000</button>
      <button @click="deleteAll" style="margin-left:auto">Delete All</button>
    </div>

    <p style="margin-top:12px">Total: {{ tasks.length }} · Remaining: {{ remaining }}</p>

    <ul style="list-style:none;padding:0">
      <li v-for="t in tasks" :key="t.id" style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #eee">
        <input type="checkbox" :checked="t.done" @change="toggleTask(t.id)" />
        <span :style="{flex:1,'text-decoration': t.done ? 'line-through' : 'none'}">{{ t.text }}</span>
        <button @click="deleteTask(t.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
