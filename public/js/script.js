const searchBtn = document.querySelector('#recipe-search');
const timeSlider = document.querySelector('#time-slider')
const recipesContainer = document.querySelector('#recipes-container');

let foodInput

const userSelections = {
    includeIngredients: [],
    intolerances: ['dairy'],
    maxReadyTime: 0
}

const findRecipes = () => {
    createQueryFilters(userSelections);
    displayRecipes();
}

let baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=36808371f778457eb823b528e2d0a3a6&instructionsRequired=true&sort=random`

const getRecipes = async () => {
    const response = await fetch(baseURL)
    const data = await response.json()
    console.log(data)
}

const joinFilters = (queryFilters) => {
    let newQueryFilters = queryFilters.slice(0, -1)
    baseURL += newQueryFilters
    getRecipes(baseURL)
}

const createQueryFilters = (selection) => {

    let queryFilters = `?`

    for (key in selection) {
        if (key === 'includeIngredients' && selection[key] != '') {
            queryFilters += `${key}=${selection[key].join(',+')}&`
        } else if (key === 'intolerances' && selection[key] != '') {
            queryFilters += `${key}=${selection[key].join(',+')}&`
        } else if (key === 'maxReadyTime' && selection[key] != 0) {
            queryFilters += `${key}=${selection[key]}&`
        }
    }

    joinFilters(queryFilters)
}

const ingredients = 'chicken, rice, eggs'
const ingredients2 = ingredients.split(', ')
console.log(ingredients2)

searchBtn.addEventListener('click', findRecipes);


let recipeID = 715415

const getSpecificRecipe = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=36808371f778457eb823b528e2d0a3a6`)
    const data = await response.json()
    console.log(data)
}

getSpecificRecipe()

const displayRecipes = (data) => {
    recipesContainer.textContent = '';

    const recipeInfoEl = document.createElement('article');
    const recipeName = document.createElement('h2');
    const maxReadyTime = document.createElement('p');
    const recipeImage = document.createElement('img');

    recipeName.textContent = data.results.title;
    maxReadyTime.textContent = data.readyInMinutes;
    recipeImage.src = data.image;
    // need to adjust these ^^ so they're getting the info

    recipesContainer.appendChild(recipeInfoEl);
    recipeInfoEl.appendChild(recipeName);
    recipeInfoEl.appendChild(maxReadyTime);
    recipeInfoEl.appendChild(recipeImage);
}

/**
 * Uncomment the below code to POST data to the database
 */


// const postTrips = async(tripObj) => {
//     const response = await fetch('/api/trips', {
//         method: 'POST',
//         body: JSON.stringify(tripObj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })

//     const data = await response.json()

//     console.log(data)
// }

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'more than okay!!!'
// }

// postTrips(newTrip)

/**
 * Uncomment the below code to GET data from the database
 */


// const getTrips = async() => {
//     const response = await fetch('/api/trips')
//     const data = await response.json()
//     console.log(data)
// }

// getTrips()


/**
 * Uncomment the below code to DELETE data from the database
 */


// const deleteTrips = async(id) => {
//    const response = await fetch(`/api/trips/{id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// deleteTrip(1)


/**
 * Uncomment the below code to Update data in the database
 */

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'WAY WAY more than okay!!!'
// }


// const updateTrip = async(id, newTripObj) => {
//    const response = await fetch(`/api/trips/{id}`, {
//         method: 'PUT',
//         body: JSON.stringify(newTripObj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// updateTrip(1, newTrip)




