//Loader
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loading-veiwport')
    const content = document.getElementById('website-content')

    content.style.display = 'block'

    const minDisplayTime = 10000
    const loadTime = data.now()

    function hideLoader() {
        loader.style.opacity = 0
        loader.addEventListener('transitioned', () => {
            loader.style.display = 'none'
        })
    }
    const timeElapsed = Date.now() - loadTime
    if (timeElapsed < minDisplayTime) {
        setTimeout(hideLoader, mindisplay - timeElapsed)
    } else {
        hideLoader
    }
})

const loadRecipe = async () => {
    try {
        const params = new URLSearchParams(window.location.search)
        const recipeId = params.get('id')
        const response = await fetch(
            `https://dummyjson.com/recipes/${recipeId}`
        )
        const data = await response.json()
        renderRecipe(data)
    } catch (e) {
        console.error('Kunde inte hitta receptet', error)
    }
}

//Hårdkodad fetch
// const loadRecipe = async () => {
//     try {
//         const response = await fetch('https://dummyjson.com/recipes/22')
//         const data = await response.json()
//         renderRecipe(data)
//     } catch (e) {
//         console.error('Kunde inte hitta receptet', error)
//     }
// }

// Skapar Receptkortet
const renderRecipe = function (recipe) {
    // image
    let mainImage = document.querySelector('.recipe-image')
    mainImage.src = recipe.image
    mainImage.alt = recipe.title

    // title
    setRecipeDetail('.mainContainer h2', recipe.name)

    // prep minutes
    setRecipeDetail('.prep-minutes', recipe.prepTimeMinutes)

    // cook minutes
    setRecipeDetail('.cook-minutes', recipe.cookTimeMinutes)

    // servings
    setRecipeDetail('.servings', recipe.servings)

    // // ingredients OLD
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

/*fetch av kommentarer*/
async function fetchComments() {
    const result = await fetch('https://dummyjson.com/comments?limit=2')
    const data = await result.json()

    console.log(data)
    const comment = data.comments
    const container = document.querySelector('.comment-section')

    displayAllComments(comment, container)
}

function displayAllComments(allComments, container) {
    // töm html containern på alla kommentarer

    container.innerHTML = ''
    allComments.forEach((comment) => {
        addCommentCard(comment, container)
    })
}

// Kör fetch och sparar data
// kalla på displayAllComments(sparadeDatan, kont)

function addCommentCard(commentData, container) {
    const comment = document.createElement('div')
    comment.className = 'user-comment'
    comment.innerHTML = `
    <strong>${commentData.user.username}</strong>
    <p>${commentData.body}</p>
    `
    // populera html containern med en kommentar
    container.appendChild(comment)
}

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
