const $animalForm = document.querySelector('#animals-form');
const $displayArea = document.querySelector('#display-area');

getAnimals();

$animalForm.addEventListener('submit', handleGetAnimalsSubmit);

function getAnimals(formData = {}) {
	let queryUrl = '/api/animals?';

	Object.entries(formData).forEach(function ([key, value]) {
		queryUrl += `${key}=${value}&`;
	});

	fetch(queryUrl).then(function (response) {
		if (!response.ok) {
			return alert('Error: ' + response.statusText);
		}
		return response.json();
	}).then(function (animalData) {
		printResults(animalData);
	});
}

function printResults(resultArr) {
	const animalHTML = resultArr.map(function ({ id, name, personalityTraits, species, diet }) {
			return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Species: ${species.substring(0, 1).toUpperCase() + species.substring(1)}<br/>
      Diet: ${diet.substring(0, 1).toUpperCase() + diet.substring(1)}<br/>
      Personality Traits: ${personalityTraits.map(function (trait) {
			return `${trait.substring(0, 1).toUpperCase() + trait.substring(1)}`;
		}).join(', ')}</p>
    </div>
  </div>
    `;
		});

	$displayArea.innerHTML = animalHTML.join('');
}

function handleGetAnimalsSubmit(event) {
	event.preventDefault();
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

	const personalityTraitArr = [];
	const selectedTraits = $animalForm.querySelector('[name="personality"]').selectedOptions;

	for (let i = 0; i < selectedTraits.length; i += 1) {
		personalityTraitArr.push(selectedTraits[i].value);
	}

	const personalityTraits = personalityTraitArr.join(',');

	const animalObject = { diet, personalityTraits };

	getAnimals(animalObject);
}