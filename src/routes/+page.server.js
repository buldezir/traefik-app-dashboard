export const ssr = true;

import 'bootstrap/dist/css/bootstrap.min.css';
import { env } from '$env/dynamic/private';

const traefikApis = env.TRAEFIK_API?.split(',');

const filterOutSelf = (item) => item.service !== 'dash';
const filterDocker = (item) => item.provider === 'docker';

const mapHost = (item) => {
	const m = item.rule.match(/Host\(`(.+)`\)/);
	item.host = m[1];
	return item;
};

const mapName = (item) => {
	item.name = item.name.replace('@docker', '');
	return item;
};

async function getTraefikRoutes(url)
{
	const res = await fetch(url);
	let items = await res.json();

	items = items.filter(filterDocker);
	items = items.filter(filterOutSelf);

	items = items.map(mapHost);
	items = items.map(mapName);

	return items;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {

	let items = [];

	for (const url of traefikApis) {
		items = items.concat(await getTraefikRoutes(url));
	}
	
	return { items };
}
