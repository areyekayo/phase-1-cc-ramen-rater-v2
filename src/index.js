// index.js

//Callbacks
//Core Deliverables

const handleClick = (ramen) => {
	//get the ramenDetail div
	const ramenDetail = document.getElementById('ramen-detail');

	//set the ramenDetail elements with the clicked ramen details
	ramenDetail.querySelector(`.detail-image`).src = ramen.image;
	ramenDetail.querySelector(`.detail-image`).id = ramen.id;
	ramenDetail.querySelector(`.name`).textContent = ramen.name;
	ramenDetail.querySelector(`.restaurant`).textContent = ramen.restaurant;
	document.getElementById(`rating-display`).textContent = ramen.rating;
	document.getElementById(`comment-display`).textContent = ramen.comment;
};

const addSubmitListener = () => {
	const addForm = document.getElementById("new-ramen");

	addForm.addEventListener("submit", (e) => {
		e.preventDefault();

		//create ramen request object to send post request

		const newRamen = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				name: e.target["new-name"].value,
				image: e.target["new-image"].value,
				restaurant: e.target["new-restaurant"].value,
				rating: e.target["new-rating"].value,	
				comment: e.target["new-comment"].value
			})};

		fetch("http://localhost:3000/ramens", newRamen)
			.then(res => res.json())
			.then(data => displayRamens())

		addForm.reset();

	})
}

const displayRamens = () => {
	const ramenMenu = document.getElementById("ramen-menu");

	fetch("http://localhost:3000/ramens")
	.then((res) => res.json())
	.then((json) => {
		json.forEach((ramen) => {
			let image = document.createElement("img");
			image.src = ramen.image;
			image.id = ramen.id;
			//Load the first ramen in ramen detail using handleClick
			if (ramen.id === "1"){
				handleClick(ramen)
			}
			ramenMenu.append(image);
			image.addEventListener("click", () => handleClick(ramen))
		})
	})
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
	document.addEventListener("DOMContentLoaded", () => {
		displayRamens();
		addSubmitListener();
		editSubmitListener();
		deleteRamen();
	})
}

//Advanced Deliverables
const editSubmitListener = () => {
	const editForm = document.getElementById("edit-ramen");

	editForm.addEventListener("submit", (e) => {
		e.preventDefault();
		//get the Ramen's ID from image in Ramen Detail Div
		const ramenDetail = document.getElementById('ramen-detail');
		const ramenImage = ramenDetail.querySelector("img")
		const ramenId = ramenImage.id

		//create edited ramen patch request
		const editedRamen = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				id: ramenId,
				rating: e.target["edit-rating"].value,
				comment: e.target["edit-comment"].value
			})

		};
		fetch(`http://localhost:3000/ramens/${ramenId}`, editedRamen)
			.then(res => res.json())
			.then(data => displayRamens())
		editForm.reset()
	})
}

const deleteRamen = () => {
	const deleteButton = document.getElementById("delete");

	deleteButton.addEventListener("click", () => {
		//get the Ramen's ID from image in Ramen Detail Div
		const ramenDetail = document.getElementById('ramen-detail');
		const ramenImage = ramenDetail.querySelector("img")
		const ramenId = ramenImage.id

		//create delete request object to send
		const deleteRequest = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				id: ramenId
			})
		}

		fetch(`http://localhost:3000/ramens/${ramenId}`, deleteRequest)
			.then(res => res.json())
			.then(data => displayRamens())
	})
}


main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};