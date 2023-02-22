<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	/** @type {import('./$types').PageServerData} */
	export let data;
</script>

<svelte:head>
    <title>Traefik App Dashboard</title> 
</svelte:head>

<div class="container px-4 py-5" id="icon-grid">
	<h2 class="pb-2 border-bottom">Apps</h2>

	<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
		{#each data.items as { name, host }}
			<div class="col d-flex align-items-start">
				<svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"
					><use xlink:href="#bootstrap" /></svg
				>
				<div>
					<h3 class="fw-bold mb-0 fs-4">
						<a href="https://{host}" target="_blank" rel="noreferrer">{name}</a>
					</h3>
					<!-- <p>Paragraph of text beneath the heading to explain the heading.</p> -->
				</div>
			</div>
		{/each}
	</div>
</div>
