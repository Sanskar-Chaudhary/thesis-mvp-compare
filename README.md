# Thesis MVP Compare — React vs Vue vs Svelte (To-Do App)

This repository hosts three identical **To-Do** MVPs implemented with **React**, **Vue**, and **Svelte** (Vite templates).  
Scope: **create**, **toggle**, **delete**, and **counters** (no persistence).  
Each app also provides benchmark buttons to insert **+100**, **+1,000**, **+10,000**, **+20,000** items and a **Delete All** button.  
Every action logs elapsed time (ms) using the **Performance API**.

## Quick Start (GitHub Codespaces or local Node 18+)

### Run (development)
```bash
# React
cd react-todo && npm install && npm run dev
# Vue
cd vue-todo && npm install && npm run dev
# Svelte
cd svelte-todo && npm install && npm run dev
````

Open the forwarded URL (Codespaces) or local URL. </br>
Open **DevTools → Console**. Click **+100**, **+1,000**, **+10,000**, **+20,000**, and **Delete All** to see timings.

### Build (production)

```bash
cd react-todo && npm run build && cd ..
cd vue-todo && npm run build && cd ..
cd svelte-todo && npm run build && cd ..
```

Vite prints **bundle sizes** in the terminal and writes outputs to `dist/`.
Optional preview (example):

```bash
cd react-todo && npm run preview
```

## App Features

* Add a task (input + Add)
* Toggle done/undone (checkbox)
* Delete task (button)
* Counters: **Total** and **Remaining**
* Benchmark buttons: **+100**, **+1,000**, **+10,000**, **+20,000**
* **Delete All** to measure clear time
* Logs render time with `performance.now()` (MDN Performance API)

## Repository Structure

```
react-todo/     # React (Vite)
vue-todo/       # Vue (Vite)
svelte-todo/    # Svelte (Vite)
thesis-assets/  # screenshots used in the thesis
results.md      # raw measurements (render ms, bundle kB, LoC)
README.md
```

## Screenshots for the Thesis

Place images in `thesis-assets/`:

* `fig-react-empty.png`, `fig-react-all_tests.png`
* `fig-vue-empty.png`, `fig-vue-all_tests.png`
* `fig-svelte-empty.png`, `fig-svelte-all_tests.png`

## Results (from our Codespaces run)

### Add-time (ms) — lower is better

| N items | React |   Vue | Svelte |
| ------: | ----: | ----: | -----: |
|     100 |    47 |    41 |     38 |
|   1,000 |   101 |    77 |     65 |
|  10,000 | 1,838 |   830 |    690 |
|  20,000 | 4,174 | 2,436 |  2,322 |

### Delete-all time (ms)

| After N items | React | Vue | Svelte |
| ------------: | ----: | --: | -----: |
|           100 |    15 |  20 |     12 |
|         1,000 |    35 |  28 |     27 |
|        10,000 |    65 |  90 |     86 |
|        20,000 |   101 | 138 |    133 |

### Production bundle size (main JS)

| Framework |     kB |
| --------- | -----: |
| React     | 189.40 |
| Vue       |  63.20 |
| Svelte    |  29.89 |

### Code size

| Framework | Files in `src/` | Total LoC (`src/`) |
| --------- | --------------: | -----------------: |
| React     |               5 |                216 |
| Vue       |               5 |                206 |
| Svelte    |               5 |                174 |

> Notes: All three apps were built from official Vite templates; measurements were taken in the same Codespaces environment with the browser Performance API.

## Tech

* Vite templates (React / Vue / Svelte)
* No routing, no persistence, no external state libs
* Measurement via `performance.now()`

## License

MIT (or your choice)
