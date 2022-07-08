import * as SecureStore from "expo-secure-store";

import axios from "axios";

const ip_address = "192.168.1.43";

export const backend_url = `http://${ip_address}:8000/`;

export async function get(url, options) {
	let token = await SecureStore.getItemAsync("token");

	console.log(token);

	let res = await axios.get(`http://${ip_address}:8000/${url}`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	return res;
}

export async function post(url, data) {
	let token = await SecureStore.getItemAsync("token");

	let res = await axios.post(`http://${ip_address}:8000/${url}`, data, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	return res;
}
