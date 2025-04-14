const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("Search-input");
const resultsContainer = document.getElementById("results");

searchBtn.addEventListener("click", async () => {
    const mealName = searchInput.value.trim();

    if (mealName === "") {
        resultsContainer.innerHTML = "<p>Please enter a meal name to search.</p>";
        return;
    }

    resultsContainer.innerHTML = "<p>Loading recipes...</p>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await response.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            resultsContainer.innerHTML = `<p>No recipes found for "${mealName}".</p>`;
        }
    } catch (error) {
        console.error("Error fetching recipe:", error);
        resultsContainer.innerHTML = "<p>Error loading data. Please try again.</p>";
    }
});

function displayRecipes(meals) {
    resultsContainer.innerHTML = "";

    meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe-card");

        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <a href="${meal.strSource || 'https://www.themealdb.com/meal.php?c=' + meal.idMeal}" target="_blank">View Full Recipe</a>
        `;

        resultsContainer.appendChild(recipeDiv);
    });
}
