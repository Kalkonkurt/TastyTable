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
                <a class="viewRecipe" href="http://127.0.0.1:5500/recipe.html?id=${recipe.id}">View recipe</a>
                <button class="deleteBtn">Delete</button>
            </div>
        </div>
      `
        const deleteBtn = card.querySelector('.deleteBtn')

        deleteBtn.addEventListener('click', async () => {
            try {
                if (!confirm('Are you sure you want to delete this product?'))
                    return

                const res = await fetch(
                    `https://dummyjson.com/recipes/${recipe.id}`,
                    {
                        method: 'DELETE'
                    }
                )
                const result = await res.json()
                console.log('Deleted:', result)
                alert(`🗑️ Deleted: ${result.name}`)
                card.remove()
            } catch (err) {
                console.error('Kunde inte radera recept:', err)
            }
        })

        container.appendChild(card)
    })
}

getRecipes()
