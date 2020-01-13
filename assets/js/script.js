var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var cityList = document.getElementById("city-list");

function formSubmit(event) {
    event.preventDefault();
    let searchTerm = searchInput.value;
    if (!searchTerm) {
        return false;
    }
    printCities(searchTerm);
    searchInput.value = "";
    cityDataDisplay(searchTerm);
};

function printCities(searchTerm) {
    console.log(searchTerm);
    var listItem = document.createElement("div");
    listItem.setAttribute("class", "cityBox");
    listItem.innerText = searchTerm;
    cityList.prepend(listItem);

};


function cityDataDisplay(searchTerm) {

    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    fetch("https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=" + searchTerm + "%252Cuk", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "6810fa7ef1msh4961884680403f2p17bac4jsnd77de8b9da63"
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });

};

searchForm.addEventListener("submit", formSubmit);

