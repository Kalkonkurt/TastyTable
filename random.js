//Random recipe
//Loader

function hideLoader() {
    const loader = document.getElementById('loading-viewport')
    const content = document.getElementById('website-content')

    content.style.display = 'none'

    loader.style.opacity = 0
    loader.addEventListener('transitionend', () => {
        loader.style.display = 'none'
        content.style.display = 'block'
    })
}

/* GET */
async function getRecipes() {
    try {
        const res = await fetch('https://dummyjson.com/recipes')
        const data = await res.json()
        return data.recipes
    } catch (error) {
        console.error('Kunde inte hämta recept:', error)
    }
}

/* Funktion som ger slumpmässiga recept */
function getRandomRecipe(recipes) {
    const index = Math.floor(Math.random() * recipes.length)
    return recipes[index]
}

/* Funktion som "visar" vart vi vill ha datan och skapar innehållet */
function renderRandomRecipe(recipe) {
    const container = document.querySelector('.recipe-container')
    container.innerHTML = ''

    const card = document.createElement('div')
    card.className = 'recipe'
    card.innerHTML = `
    <img class="recipe-image" src="${recipe.image}" alt="recipe image" />
                <section class="recipe-card">
                    <h2>${recipe.name}</h2>

                    <div class="recipe-details">
                        <article>
                            <p>Prep Minutes: </p>
                            <strong><label class="prep-minutes">${recipe.prepTimeMinutes}</label></strong>
                        </article>
                        <article>
                            <p>Cook minutes: </p>
                            <strong><label class="cook-minutes">${recipe.cookTimeMinutes}</label></strong>
                        </article>
                        <article>
                            <p>Servings: </p>
                            <strong><label class="servings">${recipe.servings}</label></strong>
                        </article>
                    </div>
                </section>
                <div class="recipe-instructions">
                    <section class="ingredient-section">
                        <h3>Ingredients</h3>
                        <ul class="ingredients"></ul>
                    </section>
                    <section class="instruction-section">
                        <h3>Instructions</h3>
                        <ol class="instructions"></ol>
                    </section>
                </div>`

    container.appendChild(card)

    /* Behövdes två variabler för att kunna lägga arrayerna in i listorna */

    const ul = card.querySelector('.ingredients')
    recipe.ingredients.forEach((item) => {
        ul.innerHTML += `<li>${item}</li>`
    })

    const ol = card.querySelector('.instructions')
    recipe.instructions.forEach((step) => {
        ol.innerHTML += `<li>${step}</li>`
    })
}

/*Funktion av högre ordning(?) Den funktion som gör att allting kör */
async function showRandomRecipe() {
    const recipes = await getRecipes()
    const randomRecipe = getRandomRecipe(recipes)
    hideLoader()
    renderRandomRecipe(randomRecipe)
}

/* En addEventListner som gör att "Random recipe"-knappen genererar ett nytt slumpmässigt recept varje gång den trycks. */
const randomBtn = document.querySelector('#randomBtn')
randomBtn.addEventListener('click', showRandomRecipe)

showRandomRecipe()

/*Display av input från formulär*/
const form = document.querySelector('.comment-form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const text = document.getElementById('comment').value

    const res = await fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: text,
            postId: 3,
            userId: 5
        })
    })
    const data = await res.json()

    const container = document.querySelector('.comment-section')

    /*Funktion som displayar texten och username*/
    addCommentCard(data, container)
})

fetchComments()

/*Local Storage */
const textarea = document.getElementById('comment')
const commentForm = document.getElementById('comment-form')

textarea.value = localStorage.getItem('textDraft') || ''
textarea.addEventListener('input', () => {
    localStorage.setItem('textDraft', textarea.value)
})
commentForm.addEventListener('submit', () => {
    localStorage.removeItem('textDraft')
    textarea.value = ''
})
