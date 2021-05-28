HTMLCollection.prototype.forEach = Array.prototype.forEach;
const detailsList = document.getElementsByTagName("details");
document.getElementsByTagName("summary").forEach(element => {
	element.addEventListener("click", event => {
		const myDetails = event.target.parentNode;
		detailsList.forEach(detailsTag => {
			if (detailsTag !== myDetails) {
				detailsTag.removeAttribute("open");
			}
		});
	});
});

const pj = {
	props2json: {
		"query.port": "query-port",
		"rcon.password": "rcon-password",
		"rcon.port": "rcon-port"
	},
	json2props: {
		"query-port": "query.port",
		"rcon-password": "rcon.password",
		"rcon-port": "rcon.port"
	}
}
function generatePropsFile(json) {
	return Object.getOwnPropertyNames(json).map(k => {
		const v = json[k];
		k = pj.json2props[k] || k;
		return [k,v].join("=");
	}).join("\n");
}
function parsePropsFile(propsFile) {
	let json = {};
	propsFile.split("\n").filter(line => {
		return line[0] != "#" && line[0] != "!" && line != "";
	}).forEach(line => {
		let [k, v] = line.split("=");
		k = pj.props2json[k] || k;
		json[k] = v;
	});
	return json;
}
function wrapPropsFileWithRedirection(propsFile) {

}

function populateForm(json) {
	Object.getOwnPropertyNames(json).forEach(k => {
		const v = json[k];
		const e = document.getElementById(k);
		if (e.type == "checkbox") {
			e.checked = (("" + v) == "true");
		} else {
			e.value = v;
		}
	});
}
NodeList.prototype.map = Array.prototype.map;
function scrapeForm() {
	let json = {};
	document.querySelectorAll(".proper label").forEach(label => {
		const k = label.getAttribute("for");
		const e = document.getElementById(k);
		const v = e[["value", "checked"][0+(e.type == "checkbox")]]
		json[k] = v;
	});
	return json;
}

window.addEventListener("change", event => {
	localStorage.current = JSON.stringify(scrapeForm());
});
