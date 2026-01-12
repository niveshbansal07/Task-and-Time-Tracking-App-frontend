<script>
	import { onMount, onDestroy } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let isAuth = false;
	let username = 'User';
	let tasks = [];
	let timerInterval;

	const API_BASE = '/api/tasks';

	/* ================= AUTH ================= */

	// const token = localStorage.getItem('token');
	import { browser } from '$app/environment';

	let token = null;

	if (browser) {
		token = localStorage.getItem('token');
	}

	function authHeaders() {
		return {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
	}

	/* ================= UTILS ================= */

	function secsToHHMMSS(s) {
		s = Math.max(0, Math.floor(s));
		const h = String(Math.floor(s / 3600)).padStart(2, '0');
		const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
		const sec = String(s % 60).padStart(2, '0');
		return `${h}:${m}:${sec}`;
	}

	function livePresentSeconds(t) {
		if (t.running && t.started_at) {
			const started = new Date(t.started_at).getTime();
			return t.present_seconds + Math.floor((Date.now() - started) / 1000);
		}
		return t.present_seconds;
	}

	/* ================= API ================= */

	async function fetchTasks() {
		const res = await fetch(API_BASE, { headers: authHeaders() });
		if (!res.ok) return console.error('Failed to fetch tasks');
		tasks = await res.json();
	}

	async function startTask(t) {
		const res = await fetch(`${API_BASE}/${t.id}/start`, {
			method: 'POST',
			headers: authHeaders()
		});
		Object.assign(t, await res.json());
	}

	async function stopTask(t) {
		const res = await fetch(`${API_BASE}/${t.id}/stop`, {
			method: 'POST',
			headers: authHeaders()
		});
		Object.assign(t, await res.json());
	}

	async function updateTask(t) {
		const res = await fetch(`${API_BASE}/${t.id}`, {
			method: 'PUT',
			headers: authHeaders(),
			body: JSON.stringify({
				name: t.name,
				status: t.status,
				present_seconds: t.present_seconds,
				today_seconds: t.today_seconds
			})
		});
		if (!res.ok) return alert('Update failed');
		Object.assign(t, await res.json());
	}

	async function deleteTask(t) {
		if (!confirm('Delete task?')) return;
		await fetch(`${API_BASE}/${t.id}`, {
			method: 'DELETE',
			headers: authHeaders()
		});
		tasks = tasks.filter((x) => x.id !== t.id);
	}

	/* ================= CREATE ================= */

	let newTaskName = '';

	async function createTask() {
		if (!newTaskName.trim()) return;
		const res = await fetch(API_BASE, {
			method: 'POST',
			headers: authHeaders(),
			body: JSON.stringify({ name: newTaskName })
		});
		tasks = [await res.json(), ...tasks];
		newTaskName = '';
	}

	/* ================= LIFECYCLE ================= */

	onMount(async () => {
		if (!browser || !token) {
			window.location.href = '/login';
		}

		if (browser && token) {
			isAuth = true;
			username = localStorage.getItem('username') || 'User';
			await fetchTasks();

			timerInterval = setInterval(() => {
				tasks = tasks.map((t) => ({ ...t }));
			}, 1000);
		}
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});
</script>

<div class="page">
	<Navbar {isAuth} {username} />

	<div class="task-board">
		<div class="task-header">
			<div>Task</div>
			<div>Start / Stop</div>
			<div>Present Time</div>
			<div>Today Time</div>
			<div>Status</div>
			<div>Update</div>
			<div>Delete</div>
		</div>

		{#each tasks as t (t.id)}
			<div class="task-row">
				<div class="cell wide">
					<input class="task-input" bind:value={t.name} />
				</div>

				<div class="cell">
					{#if t.running}
						<button class="stop" on:click={() => stopTask(t)}>Stop</button>
					{:else}
						<button class="start" on:click={() => startTask(t)}>Start</button>
					{/if}
				</div>

				<div class="cell">{secsToHHMMSS(livePresentSeconds(t))}</div>
				<div class="cell">{secsToHHMMSS(t.today_seconds)}</div>

				<div class="cell">
					<select bind:value={t.status}>
						<option value="pending">Pending</option>
						<option value="in_progress">In Progress</option>
						<option value="success">Success</option>
					</select>
				</div>

				<div class="cell">
					<button class="icon update" on:click={() => updateTask(t)} title="Update">
						<!-- yellow update svg -->
						<svg
							class="w-6 h-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
							/>
						</svg>
					</button>
				</div>

				<div class="cell">
					<button class="icon delete" on:click={() => deleteTask(t)} title="Delete">
						<!-- red trash svg -->
						<svg
							class="w-6 h-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		{/each}

		<!-- create new task area -->
		<div class="create-row">
			<input placeholder="New task name" class="new-input" bind:value={newTaskName} />
			<button class="add-task" on:click={createTask}>+ Create new task</button>
		</div>
	</div>
</div>

<style>
	.task-board {
		background: var(--color-white);
		padding: 20px;
		border-radius: var(--radius-panel);
	}
	.task-header,
	.task-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr 0.5fr 0.5fr;
		gap: 10px;
		margin-bottom: 12px;
		align-items: center;
	}
	.task-header {
		font-weight: 700;
	}
	.cell {
		background: transparent;
		height: 48px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		padding: 6px;
	}
	.cell.wide {
		border-radius: 14px;
	}
	.task-input,
	.new-input {
		width: 100%;
		padding: 8px;
		border-radius: 8px;
		border: 1px solid #ddd;
	}
	.start,
	.stop {
		padding: 6px 10px;
		border-radius: 8px;
		border: none;
		cursor: pointer;
	}
	.start {
		background: #10b981;
		color: white;
	}
	.stop {
		background: #ef4444;
		color: white;
	}
	.icon {
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
	}
	.update svg {
		filter: hue-rotate(40deg) saturate(1.8);
	} /* yellowish */
	.delete svg {
		filter: hue-rotate(-120deg) saturate(1.8);
	} /* reddish */
	.create-row {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
	.add-task {
		background: none;
		border: 1px solid #222;
		padding: 6px 10px;
		cursor: pointer;
		border-radius: 8px;
	}
</style>
