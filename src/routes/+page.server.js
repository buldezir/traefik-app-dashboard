export const ssr = true;

import 'bootstrap/dist/css/bootstrap.min.css';
import { env } from '$env/dynamic/private';

const traefikApis = env.TRAEFIK_API?.split(',');
const showHTTP = Number(env.SHOW_HTTP || 0);

const filterOutSelf = (item) => item.traefik_name !== 'dash@docker' && item.traefik_name !== 'websecure-dash@docker';
const filterDocker = (item) => item.provider === 'docker';

const mapHost = (item) => {
	const m = item.rule.match(/Host\(`(.+)`\)/);
	item.host = m[1];
	return item;
};

const mapProps = (item) => {
	item.traefik_name = item.name;
	item.name = item.name.replace('@docker', '');
	item.name = item.name.replace('websecure-', '');
	item.scheme = item.tls ? 'https' : 'http';

	return item;
};

async function getTraefikRoutes(url)
{
	const res = await fetch(url);
	let items = await res.json();

	items = items.filter(filterDocker);

	items = items.map(mapHost);
	items = items.map(mapProps);

	items = items.filter(filterOutSelf);

	if (!showHTTP) {
		items = items.filter((item) => item.scheme === 'https');
	}

	items = items.map((item) => {
		item.source_url = url
			.replace('/api/http/routers', '')
			.replace('http://', '')
			.replace('https://', '');
		return item;
	});

	items.sort((a, b) => {
		const cmp1 = a.service.localeCompare(b.service);
		if (cmp1 === 0) {
			return a.name.localeCompare(b.name);
		}
		return cmp1;
	});

	return items;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {

	let items = [];

	for (const url of traefikApis) {
		items = items.concat(await getTraefikRoutes(url));
	}


	const grouped = items.reduce(function (r, a) {
        r[a.source_url] = r[a.source_url] || [];
        r[a.source_url].push(a);
        return r;
    }, Object.create(null));
	
	return { grouped };
}
