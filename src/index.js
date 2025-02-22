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
	const addForm = document.getElementById("new-ramen")
	addForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const newRamen = {
			name: e.target["new-name"].value,
			image: e.target["new-image"].value,
			restaurant: e.target["new-restaurant"].value,
			rating: e.target["new-rating"].value,	
			comment: e.target["new-comment"].value,
		}
		createRamenImage(newRamen)		
		addForm.reset();
	})
}

const createRamenImage = (ramen) => {
	const ramenMenu = document.getElementById("ramen-menu");
	let image = document.createElement("img");
	image.id = ramen.id;
	image.src = ramen.image;
	ramenMenu.append(image);

	//load 1st ramen in ramen details with handleClick
	if (ramen.id === "1"){
		handleClick(ramen)
	}
	
	image.addEventListener("click", () => handleClick(ramen));
}

const displayRamens = () => {
	fetch("http://localhost:3000/ramens")
	.then((res) => res.json())
	.then((json) => {
		json.forEach((ramen) => {
			createRamenImage(ramen)
	})
})};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
	document.addEventListener("DOMContentLoaded", () => {
		displayRamens();
		addSubmitListener();
		editSubmitListener();
	})
}

//Advanced Deliverables
const editSubmitListener = () => {
	const editForm = document.getElementById("edit-ramen");

	editForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const ramenRating = document.getElementById("rating-display");
		const ramenComment = document.getElementById("comment-display");

		ramenRating.textContent = e.target["edit-rating"].value;
		ramenComment.textContent = e.target["edit-comment"].value;

		editForm.reset()
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