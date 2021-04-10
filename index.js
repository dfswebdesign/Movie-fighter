// Make a network request to a 3rd party API

const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'ff0c6e25',
            s: searchTerm,
        },
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const root = document.querySelector('.autocomplete');

// autocomplete widget created in JS instead of index.html

root.innerHTML = `
<label><b>Search For A Movie</b></label>
<input class="input" />
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
    </div>
</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    const movies = await fetchData(event.target.value);

    //this removes the dropdown empty box
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return
    }

    resultsWrapper.innerHTML = '' //removes content from the input field
    dropdown.classList.add('is-active');

    for (let movie of movies) {
        const option = document.createElement('a');
        //this line of code prevents broken img from displaying
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;


        option.classList.add('dropdown-item');

        option.innerHTML = `
        <img src= "${imgSrc}" />
        ${movie.Title}
        `;

        //When a selection for a movie is made, the input field is updated the the correct title
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active')
            input.value = movie.Title;
        })

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener('input', debounce(onInput, 1000));


//This will close the dropdown, when clicked outside of the dropdown element
document.addEventListener('click', event => {
    if (!root.contains(event.target))
        dropdown.classList.remove('is-active')
})