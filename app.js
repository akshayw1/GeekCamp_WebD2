
function onHomeload() {
	for (let i = 102; i < 135; i++) {
		let targetUrl = `https://api.tvmaze.com/shows/${i}`;
		fetch(targetUrl)
			.then((response) => response.json())
			.then((data) => renderElement(data));
	}
}

function search(showno) {
	const url = `https://api.tvmaze.com/search/shows?q=${showno}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => Searchdata(data));
}

function cutword(str ,n){
    return str?.length > n ? str.substr(0,n-1) + "..." : str;
  }


window.onload = () => {
	onHomeload();
	const searchBar = document.getElementById('searchBar');
	searchBar.onkeyup = (event) => {
		search(searchBar.value);
	};
};
function renderElement(data) {
	const listmovies = document.getElementById('listmovies');
	let element = document.createElement('div');
	element.innerHTML = `
    <div class="card" onclick="window.location.href = '${data.url}';">
        <img src="${data.image.medium}"  alt="Movie Image">
        <div class="card-overlay" style="background-image:; background-repeat: no-repeat;background-size:cover;
		height: 100%;">
		
          <h3 class="card-title">${data.name}</h3>
          <p class="card-desc">${cutword(data.summary,200)}</p>
		  <div class = "dur-con">
          <p class="card-duration"> <b> ${data.averageRuntime} Hours </b></p>
          <p class="card-rating"><b> IMBD Rated: ${data.rating.average} </b></p>

		  </div>
		  <button class="watch-but" onclick="window.location.href = '${data.url}';" > Watch Now </button>
        </div>
    </div>`;
	element.style.display = 'flex';
	element.style.float = 'left';
	
	element.style.cursor = 'pointer';
	listmovies.appendChild(element);
}

function Searchdata(data) {
	const list = document.getElementById('list');
	let nameArr = data.map((element) => element.show.name);
	let imgArr = data.map((element) => element.show.image);
	let summaryArr = data.map((element) => element.show.summary);
	let ratingArr = data.map((element) => element.show.rating.average);
	let runtimeArr = data.map((element) => element.show.averageRuntime);
	let urlArr = data.map((element) => element.show.url);
	list.innerHTML = '';
	imgArr.forEach((image, i) => {
		let element = document.createElement('div');
		element.style.display = 'flex';
		element.style.float = 'left';
		element.style.marginLeft = '10px';
		element.style.marginRight = '1rem';
		let img = document.createElement('img');
		img.src = image.medium;
		img.style.borderRadius = '10px';
		let title = document.createElement('p');
		title.innerText = nameArr[i];
		title.style.fontSize = '20px';
		title.style.alignSelf = 'center';

		const details = document.createElement('div');
		details.className = 'details';
		details.innerHTML = `
        <a id='headingMov' href=${urlArr[i]}>${nameArr[i]}</a>
        <p>${summaryArr[i]}</p>
        <p><b>Rating:</b> ${ratingArr[i]}</p>
        <p><b>Duration:</b> ${runtimeArr[i]} min</p>
    `;
		element.style.marginBottom = '30px';
		details.style.margin = '20px';
		details.style.display = 'inline';
		element.appendChild(img);
		element.appendChild(details);
		list.appendChild(element);
	});
}
