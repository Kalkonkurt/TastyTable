const loadRecipe = async () => {
    const response = await fetch('https://dummyjson.com/recipes/3')
    const recipe = await response.json()

    // image
    let mainImage = document.querySelector('.recipe-image')
    mainImage.src = recipe.image
    mainImage.alt = recipe.title

    // title
    setRecipeDetail('.recipe-card h2', recipe.name)

    // prep minutes
    setRecipeDetail('.prep-minutes', recipe.prepTimeMinutes)

    // cook minutes

    setRecipeDetail('.cook-minutes', recipe.cookTimeMinutes)

    // servings
    setRecipeDetail('.servings', recipe.servings)

    // ingredients OLD
    // let ingredientsContainer = document.querySelector('.ingredients')
    // recipe.ingredients.forEach((ingredient) => {
    //     const newLi = document.createElement('li')
    //     newLi.append(ingredient)
    //     ingredientsContainer.append(newLi)
    // })

    let ingredientsContainer = document.querySelector('.ingredients')
    let instructionsContainer = document.querySelector('.instructions')

    //ingredients
    setRecipeText(recipe.ingredients, ingredientsContainer)

    //instructions
    setRecipeText(recipe.instructions, instructionsContainer)
}

const setRecipeDetail = function (className, n) {
    document.querySelector(className).textContent = n
}

const setRecipeText = function (arr, container) {
    arr.forEach((element) => {
        const newLi = document.createElement('li')
        newLi.append(element)
        container.append(newLi)
    })
}

loadRecipe()
