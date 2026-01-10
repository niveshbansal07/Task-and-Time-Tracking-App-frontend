<script>

	let email = '';
	let password = '';
	let error = '';
	let loading = false;


	async function handleSubmit(e) {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			const res = await api.login({ email, password });
			localStorage.setItem('token', res.token);
			window.location.href = '/';
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<main class="auth-wrapper">
	<div class="auth-container">
		<!-- LEFT FORM -->
		<div class="panel form-panel">
			<div class="form-inner">
				<h1 class="panel-title">Log In</h1>

				{#if error}
					<p style="color:red">{error}</p>
				{/if}

				<form class="form" on:submit={handleSubmit}>
					<div class="form-row">
						<div class="input-group">
							<label for="email">Email</label>
							<input
								type="email"
								bind:value={email}
								placeholder="niveshbansal@example.com"
								required
							/>
						</div>
					</div>

					<div class="form-row">
						<div class="input-group">
							<label for="password">Password</label>
							<input type="password" bind:value={password} placeholder="••••••••" required />
						</div>
					</div>

					<div class="form-actions">
						<button class="btn btn-primary" disabled={loading}>
							{loading ? 'Logging in...' : 'LOG IN'}
						</button>
					</div>
				</form>

				<div class="form-secondary">
					<a href="/signup" class="link"> Sign Up </a>
					<span>to get started</span>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.auth-wrapper {
		min-height: 100vh;
		display: grid;
		place-items: center;
	}

	.auth-container {
		background: transparent;
	}

	.panel-title {
		text-align: center;
		margin-bottom: 24px;
	}

	.form-row {
		margin-bottom: 16px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.input-group label {
		font-size: 14px;
		font-weight: 600;
	}

	.input-group input {
		height: 44px;
		width: 300px;
		border-radius: var(--radius-input);
		border: 1px solid var(--color-gray-300);
		padding: 0 14px;
	}
	.input-group input::placeholder {
		color: var(--color-gray-600);
		opacity: 0.7;
	}

	.form-actions {
		margin-top: 20px;
	}

	.form-secondary {
		margin-top: 14px;
		gap: 16px;
		flex-wrap: wrap;
	}
</style>
