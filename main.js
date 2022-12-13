const pokemonCard = document.querySelector('[poke-card]');
const pokemonName = document.querySelector('[poke-name]');
const pokemonImage = document.querySelector('[poke-img]');
const pokemonImgContainer = document.querySelector('[poke-img-container]');
const pokemonId = document.querySelector('[poke-id]');
const pokemonTypes = document.querySelector('[poke-types]');
const pokemonStats = document.querySelector('[poke-stats]');
const form = document.querySelector('[poke-form]');

const fetchPokemon = (id) => {
	isNaN(id)
		? ingresarNumeroError()
		: fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
				.then((res) => res.json())
				.then((data) => {
					renderPokemonData(data);
				}, mensajeError);
};

const buscarPokemon = (event) => {
	event.preventDefault();
	const { value } = event.target.pokemon;
	fetchPokemon(value);
	form.reset();
};

const renderPokemonData = (data) => {
	const sprite = data.sprites.front_default;
	pokemonName.textContent = `Nombre: ${data.name}`;
	pokemonImage.setAttribute('src', sprite);
	pokemonId.textContent = `Nº ${data.id}`;
	pokemonTypes.textContent = `Tipos: ${data.types[0].type.name} - ${data.types[1].type.name}`;
	pokemonStats.textContent = `Altura: ${data.height / 10}mts - Peso: ${data.weight / 10}kg`;
};

const mensajeError = () => {
	pokemonName.textContent = `No encontrado`;
	pokemonImage.setAttribute('src', 'not-found.png');
	pokemonId.textContent = '';
	pokemonTypes.textContent = '';
	pokemonStats.textContent = '';
	form.reset();
};

const ingresarNumeroError = () => {
	pokemonName.textContent = `Debe ingresar un numero`;
	pokemonImage.setAttribute('src', 'not-found.png');
	pokemonId.textContent = '';
	pokemonTypes.textContent = '';
	pokemonStats.textContent = '';
	form.reset();
};
