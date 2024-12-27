// Movie APP

const movieForm = document.querySelector(".movieForm");
const movieInput = document.querySelector(".movieInput");
const card = document.querySelector(".card");
const apiKey = "4fafc985";

movieForm.addEventListener("submit", async event => {
    event.preventDefault();

    const slug = movieInput.value;
    if (slug) {
        try {
            let movie = slugify(slug, '_')
            const movieData = await getData(movie);
            displayInfo(movieData);
        } catch (err) {
            console.log(err);
            displayError(err);
        }
    } else {
        displayError("Please enter a movie");
    }
});

async function getData(movie) {
    const apiURL = `https://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`;

    const response = await fetch(apiURL);
    console.log(response);

    if (!response.ok) {
        throw new Error("Could not fetch the movie data");
    }

    return await response.json();

}

function displayInfo(data) {
    console.log(data);
    
    try {
        card.textContent = "";
        card.style.display = "flex";

        // movie title
        const movieDisplay = document.createElement("h2");
        movieDisplay.classList.add("movieDisplay");
        movieDisplay.textContent = data.Search[0].Title;

        // movie poster
        const poster = document.createElement("img");
        poster.classList.add("poster");
        poster.alt = "Poster unavailable :(";
        let url = data.Search[0].Poster;
        poster.src = url;

        const newURL = url.replace(/_SX300(?=\.)/, "");
        console.log(newURL);
        const link = document.createElement("a");
        link.href = newURL;
        link.target = "_blank";
        link.appendChild(poster);

        // movie year
        const movieYear = document.createElement("p");
        movieYear.classList.add("movieYear");
        movieYear.textContent = `YEAR OF RELEASE:  ${data.Search[0].Year}`;

        // movie imdb id
        const imdbID = document.createElement("p");
        imdbID.classList.add("imdbID");
        imdbID.textContent = `IMDB ID:  ${data.Search[0].imdbID}`;

        // movie or series etc.
        const movieType = document.createElement("p");
        movieType.classList.add("movieType");
        movieType.textContent = `TYPE:  ${data.Search[0].Type}`;

        const imdbUrl = document.createElement("a");
        imdbUrl.href = `https://www.imdb.com/title/${data.Search[0].imdbID}/`
        imdbUrl.target = "_blank";
        imdbUrl.textContent = "↗ Visit IMDB Page";
        imdbUrl.classList.add("imdbUrl");

        const textContainer = document.createElement("div");
        textContainer.classList.add("textContainer");
        textContainer.appendChild(movieDisplay);
        textContainer.appendChild(movieYear);
        textContainer.appendChild(imdbID);
        textContainer.appendChild(movieType);
        textContainer.appendChild(imdbUrl);

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");
        imageContainer.appendChild(link);
        imageContainer.appendChild(textContainer);

        // card.appendChild(movieDisplay);
        card.appendChild(imageContainer);

        // card.appendChild(movieYear);
        // card.appendChild(imdbID);
        // card.appendChild(movieType);

    } catch (err) {
        displayError("Could not find movie");
    }

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    const errorImg = document.createElement("img");
    errorImg.src = "/img/sad (Custom).png"
    errorImg.classList.add("errorImg");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    if (message == "Could not find movie") {
        card.appendChild(errorImg);
    }
}
