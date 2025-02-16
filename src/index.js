// index.js

//Callbacks

const ramenMenu = document.getElementById("ramen-menu");

const handleClick = (ramen) => {
	//get the ramenDetail div
	const ramenDetail = document.getElementById('ramen-detail');

	//set the ramenDetail elements with the clicked ramen details
	ramenDetail.querySelector(`.detail-image`).src = ramen.image;
	ramenDetail.querySelector(`.name`).textContent = ramen.name;
	ramenDetail.querySelector(`.restaurant`).textContent = ramen.restaurant;
	document.getElementById(`rating-display`).textContent = ramen.rating;
	document.getElementById(`comment-display`).textContent = ramen.comment;
};

const addSubmitListener = () => {
	const form = document.getElementById("new-ramen");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		//create ramen object with input values from form so that it can be passed to handleClick

		const newRamen = {
			name: e.target["new-name"].value,
			image: e.target["new-image"].value,
			restaurant: e.target["new-restaurant"].value,
			rating: e.target["new-rating"].value,	
			comment: e.target["new-comment"].value
		};

		let image = document.createElement("img")
		image.src = newRamen.image;
		image.addEventListener('click', () => handleClick(newRamen));

		ramenMenu.appendChild(image)

		form.reset();

	})
}

const displayRamens = () => {
	fetch("http://localhost:3000/ramens")
	.then((res) => res.json())
	.then((json) => {
		json.forEach((ramen) => {
			let image = document.createElement("img");
			image.src = ramen.image;
			ramenMenu.append(image)
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
	} )

}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};