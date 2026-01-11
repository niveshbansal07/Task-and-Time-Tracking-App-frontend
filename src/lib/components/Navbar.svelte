<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let isAuth = false;
	
	function logout() {
		if (browser) {
			localStorage.removeItem('token');
			localStorage.removeItem('username');
		}
		isAuth = false;
		goto('/login');
	}
</script>

<nav class="navbar">
	<div class="nav-left">
		<h2 class="logo">Task and Time Tracking App</h2>
	</div>

	<div class="nav-right">
		{#if isAuth}
			<button class="btn btn-primary" on:click={logout}>Logout</button>
		{:else}
			<a href="/login" class="nav-link">Login</a>
			<a href="/signup" class="nav-link">Signup</a>
		{/if}
	</div>
</nav>


<style>
	.navbar {
		background: var(--color-white);
		padding: 16px 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: var(--radius-panel);
		margin-bottom: 24px;
	}

	.logo {
		margin: 0;
		font-weight: 700;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.nav-link {
		height: 44px;
		padding: 10px 22px;
		border-radius: var(--radius-button);
		border: none;
		cursor: pointer;
		font-weight: 700;
		transition: var(--transition-slow);
		background: var(--color-accent);
		color: var(--color-white);
		box-shadow: 0 6px 16px rgba(90, 45, 130, 0.35);
        text-decoration: none;
	}

    .nav-link:hover{
        transform: translateY(-1px);
    }
</style>
