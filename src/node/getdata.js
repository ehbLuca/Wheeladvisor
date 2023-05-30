// IMPORTANT:
// If we don't know We will assume latitude first and longitude second.

const AC_APIKEY = "SECRETKEY"
const AC_URL = `https://accessibility-cloud.freetls.fastly.net/place-infos?appToken=${AC_APIKEY}`

/**
* Searches for wheelchair accessible places in a 5km(default) radius
* @coordinate: an object with two elements latitude and longitude used for searching places
*/
async function searchPlaces(coordinate, radius = 5000) {
	const {latitude, longitude} = coordinate;
	const url = `${AC_URL}&latitude=${latitude}&longitude=${longitude}&accuracy=${radius}`;

	return await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': 'application/json'
		},
	}).then(response => {

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		return response.json();
	}).then(data => {

		let results = [];
		let names = new Set(); // we only want one result per name
		for (let feature of data.features) {

			// skip places that are not accessible by wheelchair
			if (!(
				feature.properties?.accessibility?.accessibleWith?.wheelchair == true
			)) continue;

			let [longitude, latitude] = feature.geometry.coordinates;
			// if name is defined and new, add result to array
			let name = feature.properties?.name?.en;
			let category = feature.properties?.category;
			if (name && category && !names.has(name)) {
				names.add(name);
				results.push({ name, latitude, longitude, category });
			}

		}
		// return array with results
		return results;
	}).catch(error =>
		console.log(error)
	);
}

module.exports = {
	searchPlaces
}
