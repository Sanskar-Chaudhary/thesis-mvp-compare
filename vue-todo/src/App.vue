<script setup>
import { ref, computed } from 'vue';

let nextId = 1;
const text = ref('');
const tasks = ref([]);

const remaining = computed(() => tasks.value.filter(t => !t.done).length);

function addTask(label) {
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

async function add100() {
  const t0 = performance.now();
  const start = nextId;
  for (let i = 0; i < 100; i++) {
    tasks.value.push({ id: start + i, text: `Task ${start + i}`, done: false });
  }
  nextId += 100;
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  const t1 = performance.now();
  console.log('Vue: render for +100 items (ms):', (t1 - t0).toFixed(2));
}
</script>

<template>
  <div style="max-width:560px;margin:40px auto;font-family:system-ui,sans-serif;">
    <h1>Vue To-Do</h1>
    <div style="display:flex;gap:8px">
      <input v-model="text" placeholder="Add a task" style="flex:1;padding:8px" />
      <button @click="addTask()">Add</button>
      <button @click="add100" title="Add 100 tasks for measurement">+100</button>
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
