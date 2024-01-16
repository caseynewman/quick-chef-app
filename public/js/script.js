const searchBtn = document.querySelector('#recipe-search');
const timeSlider = document.querySelector('#time-slider')

let foodInput

const userSelections = {
    includeIngredients: [],
    intolerances: ['dairy'],
    maxReadyTime: 0
}

const findRecipes = () => {
    createQueryFilters(userSelections);
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

/**
 * Uncomment the below code to POST data to the database
 */


// const postRecipes = async(recipeObj) => {
//     const response = await fetch('/api/recipes', {
//         method: 'POST',
//         body: JSON.stringify(recipeObj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })

//     const data = await response.json()

//     console.log(data)
// }

// const newRecipe = {
//     name: 'pretty cool mountain adventure',
//     description: 'more than okay!!!'
// }

// postRecipes(newRecipe)

/**
 * Uncomment the below code to GET data from the database
 */


// const getRecipes = async() => {
//     const response = await fetch('/api/recipes')
//     const data = await response.json()
//     console.log(data)
// }

// getRecipes()


/**
 * Uncomment the below code to DELETE data from the database
 */


// const deleteRecipes = async(id) => {
//    const response = await fetch(`/api/recipes/{id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// deleteRecipe(1)


/**
 * Uncomment the below code to Update data in the database
 */

// const newRecipe = {
//     name: 'pretty cool mountain adventure',
//     description: 'WAY WAY more than okay!!!'
// }


// const updateRecipe = async(id, newRecipeObj) => {
//    const response = await fetch(`/api/recipes/{id}`, {
//         method: 'PUT',
//         body: JSON.stringify(newRecipeObj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// updateRecipe(1, newRecipe)




