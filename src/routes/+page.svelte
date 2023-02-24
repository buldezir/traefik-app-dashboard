<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
	/** @type {import('./$types').PageServerData} */
	export let data;

	// console.log(data);
</script>

<svelte:head>
    <title>Traefik App Dashboard</title> 
</svelte:head>

<div class="container px-4 py-5" id="icon-grid">
	{#each Object.entries(data.grouped) as [grp, items]}
		<h2 class="pb-2 border-bottom">{grp}</h2>

		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
			{#each items as { name, host, scheme }}
				<div class="col d-flex align-items-start">
					<div>
						<h3 class="fw-bold mb-0 fs-4">
							<a href="{scheme}://{host}" target="_blank" rel="noreferrer">
								<i class="bi {scheme === 'https' ? 'bi-lock-fill' : 'bi-box-arrow-up-right'} text-muted flex-shrink-0 me-1"></i>{name}
							</a>
						</h3>
						<!-- <p>desc</p> -->
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
