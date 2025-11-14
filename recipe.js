const loadRecipe = async () => {
    const response = await fetch('https://dummyjson.com/recipes/1')
    const recipe = await response.json()

    // image
    let mainImage = document.querySelector('.recipe-image')
    mainImage.src = recipe.image
    mainImage.alt = recipe.title

    // title
    let name = document.querySelector('.recipe-card h2')
    name.textContent = recipe.name
    // prep minutes
    let prepMinutes = document.querySelector('.prep-minutes')
    prepMinutes.textContent = recipe.prepTimeMinutes
    // cook minutes
    let cookMinutes = document.querySelector('.cook-minutes')
    cookMinutes.textContent = recipe.cookTimeMinutes
    // servings
    let servings = document.querySelector('.servings')
    servings.textContent = recipe.servings
}

loadRecipe()
