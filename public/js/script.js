const searchBtn = document.querySelector('#recipe-search');
const ingredientsInput = document.querySelector('#ingredients')
const timeSlider = document.querySelector('#time-slider')
const recipesContainer = document.querySelector('#recipes-container');

let recipeID = 715415

let userSelections = {
    includeIngredients: [],
    intolerances: [],
    maxReadyTime: 0
}

const setUserSelections = (event) => {
    userSelections.includeIngredients = ingredientsInput.value.split(' ')
    userSelections.maxReadyTime = timeSlider.value
    ingredientsInput.value = ''
    timeSlider.value = 30
}

searchBtn.addEventListener('click', setUserSelections)

const findRecipes = () => {
    createQueryFilters(userSelections);
}

searchBtn.addEventListener('click', findRecipes);

let baseURL 

const getRecipes = async () => {
    const response = await fetch(baseURL)
    const data = await response.json()
    console.log(data)
    clearResultArea()
    data.results.forEach(displayRecipes)
}

const joinFilters = (queryFilters) => {
    let newQueryFilters = queryFilters.slice(0, -1)
    baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=36808371f778457eb823b528e2d0a3a6&instructionsRequired=true&sort=random`
    baseURL += newQueryFilters
    console.log(baseURL)
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




const saveClickedID = (event) => {
    recipeID = event.target.id
    getSpecificRecipe()
}


const getSpecificRecipe = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=36808371f778457eb823b528e2d0a3a6`)
    const data = await response.json()
    console.log(data)
    clearResultArea()
    displaySpecificRecipe(data)
}


const clearResultArea = () => {
    recipesContainer.textContent = '';
}


const displayRecipes = (data) => {
    
    const recipeInfoEl = document.createElement('article');
    const recipeName = document.createElement('h2');
    recipeName.setAttribute('id', data.id)
    recipeName.setAttribute('class', 'recipe-name')
    recipeName.addEventListener('click', saveClickedID)
    console.log(recipeName)
    // const maxReadyTime = document.createElement('p');
    const recipeImage = document.createElement('img');

    recipeName.textContent = data.title;
    // maxReadyTime.textContent = data.readyInMinutes;
    recipeImage.src = data.image;
    // need to adjust these ^^ so they're getting the info

    recipesContainer.appendChild(recipeInfoEl);
    recipeInfoEl.appendChild(recipeName);
    // recipeInfoEl.appendChild(maxReadyTime);
    recipeInfoEl.appendChild(recipeImage);
}

const displaySpecificRecipe = (data) => {
    
    const recipeInfoEl = document.createElement('article')
    const recipeName = document.createElement('h2')
    const favoriteButton = document.createElement('button')
    const cookTime = document.createElement('p')
    const dietsTitle = document.createElement('ul')
    const diets = document.createElement('ul')
    const recipeImage = document.createElement('img')
    const ingredientsTitle = document.createElement('p')
    const ingredients = document.createElement('ul')
    const instructionsTitle = document.createElement('p')
    const instructions = document.createElement('ol')

    recipeName.textContent = data.title
    favoriteButton.textContent = 'Favorite'
    cookTime.textContent = "Ready in " + data.readyInMinutes + " minutes."
    dietsTitle.textContent = "Diets:"
    recipeImage.src = data.image
    ingredientsTitle.textContent = "Ingredients:"
    instructionsTitle.textContent = "Instructions:"

    const createDietList = (data) => {
        const diet = document.createElement('li')
        diet.textContent = data
        diets.appendChild(diet)
    }

    data.diets.forEach(createDietList)

    const createIngredientsList = (data) => {
        const ingredient = document.createElement('li')
        ingredient.textContent = data.name
        ingredients.appendChild(ingredient)
    }

    data.extendedIngredients.forEach(createIngredientsList)

    const createInstructionsList = (data) => {
        const instruction = document.createElement('li')
        instruction.textContent = data.step
        instructions.appendChild(instruction)
    }

    data.analyzedInstructions[0].steps.forEach(createInstructionsList)

    recipesContainer.appendChild(recipeInfoEl)
    recipeInfoEl.appendChild(recipeName)
    recipeInfoEl.appendChild(favoriteButton)
    recipeInfoEl.appendChild(cookTime)
    recipeInfoEl.appendChild(dietsTitle)
    recipeInfoEl.appendChild(diets)
    recipeInfoEl.appendChild(recipeImage)
    recipeInfoEl.appendChild(ingredientsTitle)
    recipeInfoEl.appendChild(ingredients)
    recipeInfoEl.appendChild(instructionsTitle)
    recipeInfoEl.appendChild(instructions)
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




