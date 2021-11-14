const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form');

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);

function handleAnimalFormSubmit(event) {
	event.preventDefault();

	// Gets animal data and organizes it.
	const name = $animalForm.querySelector('[name="animal-name"]').value;
	const species = $animalForm.querySelector('[name="species"]').value;
	const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
	let diet;

	for (let i = 0; i < dietRadioHTML.length; i += 1) {
		if (dietRadioHTML[i].checked) {
			diet = dietRadioHTML[i].value;
		}
	}

	if (diet === undefined) {
		diet = '';
	}

	const selectedTraits = $animalForm.querySelector('[name="personality"]').selectedOptions;
	const personalityTraits = [];
	for (let i = 0; i < selectedTraits.length; i += 1) {
		personalityTraits.push(selectedTraits[i].value);
	}
	const animalObject = { name, species, diet, personalityTraits };
	// Updates server by adding an animal.
	fetch('/api/animals', {
		method: 'POST',
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(animalObject)
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		alert('Error: ' + response.statusText);
	}).then(function () {
		alert('Thank you for adding an animal!');
	});
}

function handleZookeeperFormSubmit(event) {
	event.preventDefault();

	// Gets zookeeper data and organizes it.
	const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
	const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
	const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

	const zookeeperObj = { name, age, favoriteAnimal };
	// Updates server by adding a zookeeper.
	fetch('api/zookeepers', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(zookeeperObj)
	}).then(function (response) {
			if (response.ok) {
				return response.json();
			}
			alert('Error: ' + response.statusText);
	}).then(function () {
		alert('Thank you for adding a zookeeper!');
	});
}