<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css'
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Task & Time Tracker</title>
</svelte:head>

<slot />

