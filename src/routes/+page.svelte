<script>
	import Navbar from '$lib/components/Navbar.svelte';
	let isAuth = false;
</script>

<div class="page">
	<Navbar {isAuth} />

	<div class="home-center">
		<h2 class="big-btn">Made by <a href="https://nivesh-bansal.vercel.app/">Nivesh Bansal </a>❤️</h2>
	</div>
</div>

<style>
	.home-center {
		height: 70vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.big-btn {
		height: 60px;
		padding: 0 40px;
		font-size: 18px;
	}

	.home-center a{
		text-decoration: none;
		color: #5a2d82;
	}
</style>
