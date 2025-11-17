//Recept

async function getRecipes() {
    try {
        const res = await fetch('https://dummyjson.com/recipes')
        const data = await res.json()
        renderRecipes(data.recipes)
    } catch (error) {
        console.error('Kunde inte hämta recept:', error)
    }
}

function renderRecipes(recipes) {
    const container = document.querySelector('#mainSection')
    container.innerHTML = ''
    recipes.forEach((recipe) => {
        console.log(recipe)
        const card = document.createElement('div')
        card.className = 'recipe'
        card.innerHTML = `
        <a href="http://127.0.0.1:5500/recipe.html?id=${recipe.id}">
            <img
                src="${recipe.image}"
                alt="test"
            />
        </a>
        <div class="content">
            <h2>${recipe.name}</h2>
            <p>Preparation time: <b>${recipe.prepTimeMinutes} min</b></p>
            <p>Cooking time: <b>${recipe.cookTimeMinutes} min</b></p>
            <div class="btn-container">
                <a class="viewRecipe" href="#">View recept</a>
                <button>Delete</button>
            </div>
        </div>
      `
        container.appendChild(card)
    })
}

getRecipes()
