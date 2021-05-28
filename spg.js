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
