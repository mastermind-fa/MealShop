const loadAllMeals = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.error("Error fetching meals:", error));
};

const displayMeals = (meals) => {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // Clear previous results

    if (meals) {
        meals.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.classList.add("meal");
            mealDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory.slice(0,12)}</p>
                <button onclick="singleMeal('${meal.idMeal}')" id="details-btn">Details</button>


            `;
            menuContainer.appendChild(mealDiv);
        });
    } else {
        menuContainer.innerHTML = "<p>No meals found.</p>";
    }
};

const searchMeals = () => {
    const searchField = document.getElementById("search");
    const searchText = searchField.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.error("Error fetching meals:", error));
};

// Event listener for search button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchMeals);

singleMeal = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => displaySingleMeal(data.meals[0]))
        .catch(error => console.error("Error fetching single meal:", error));
};

const displaySingleMeal = (meal) => {
    const detailsCard = document.getElementById("details-card");
    detailsCard.classList.add("meal");
    detailsCard.innerHTML = `
        
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions.slice(0,50)}</p>
        <p><b>Category:</b> ${meal.strCategory}</p>
    `;
}

// Load all meals on initial page load
loadAllMeals();
