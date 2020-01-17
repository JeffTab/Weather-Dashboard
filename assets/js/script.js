var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var cityList = document.getElementById("city-list");
var rightColumn = document.getElementById("right-column");
var latitude;
var longitude;
var APIKey = "4089f4064051788f3dc75b639c3e0619";
var uvValue = 0;


function formSubmit(event) {
    event.preventDefault();
    let searchTerm = searchInput.value;
    if (!searchTerm) {
        return false;
    }
    callSearch(searchTerm);
    searchInput.value = "";
    fiveDayforecast(searchTerm);

};

function printCities(name) {

    var listItem = document.createElement("div");
    listItem.setAttribute("class", "cityBox");
    listItem.innerText = name;
    cityList.prepend(listItem);
    // $(".cityBox").on("click", function (event) {

    //     console.log(event.target.innerText);
    //     callSearch(event.target.innerText);
    // });

};

function UVIndex() {

    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
    $.ajax({
        url: queryURLUV,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            console.log(response.value);
            uvFunction(response.value);
        });
};

function uvFunction(response) {
    var currentUV = document.createElement("p");
    currentUV.setAttribute("class", "currentDayPTag");
    uvValue = UVIndex();
    console.log(uvValue);
    currentUV.innerText = uvValue;
    currentWeatherBox.append(currentUV);
};



function currentWeather(response) {

    var currentWeatherBox = document.createElement("div");
    currentWeatherBox.setAttribute("class", "right-side-box");
    var title = document.createElement("h2");
    title.setAttribute("id", "weatherTitle");
    var currentDate = moment().format("MM/D/YYYY");
    title.innerText = response.name + " (" + currentDate + ") ";

    var currentTemperature = document.createElement("p");
    currentTemperature.setAttribute("class", "currentDayPTag");
    currentTemperature.innerHTML = "Temperature: " + response.main.temp + "&#8457";

    var currentHumidity = document.createElement("p");
    currentHumidity.setAttribute("class", "currentDayPTag");
    currentHumidity.innerText = "Humidity: " + response.main.humidity + "%";

    var currentWindSpeed = document.createElement("p");
    currentWindSpeed.setAttribute("class", "currentDayPTag");
    currentWindSpeed.innerText = "Wind Speed: " + response.wind.speed;

    var icon = document.createElement("img");
    icon.setAttribute("id", "weatherIcon");
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    icon.setAttribute("src", iconurl);

    var titleBox = document.createElement("div");
    titleBox.setAttribute("id", "title-box");

    longitude = response.coord.lon;
    latitude = response.coord.lat;


    titleBox.append(title);
    titleBox.append(icon);
    currentWeatherBox.append(titleBox);
    currentWeatherBox.append(currentTemperature);
    currentWeatherBox.append(currentHumidity);
    currentWeatherBox.append(currentWindSpeed);

    rightColumn.append(currentWeatherBox);
};



function printFiveDay(fiveDayArr) {

    var fiveDayBox = document.createElement("div");
    fiveDayBox.setAttribute("class", "five-week");

    for (i = 0; i < fiveDayArr.length; i++) {


        var blueBox = document.createElement("div");
        blueBox.setAttribute("class", "blue-box");
        var dateLine = document.createElement("p");
        dateLine.setAttribute("class", "fiveDayPTag");
        var futureDay = moment(new Date()).add(i + 1, 'days').format("MM/D/YYYY");
        dateLine.innerText = futureDay;

        var icon = document.createElement("img");
        icon.setAttribute("id", "weatherIcon");
        var iconcode = fiveDayArr[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        icon.setAttribute("src", iconurl);

        var futureTemperature = document.createElement("p");
        futureTemperature.setAttribute("class", "fiveDayPTag");
        futureTemperature.innerHTML = "Temperature: " + fiveDayArr[0].main.temp + "&#8457";

        var futureHumidity = document.createElement("p");
        futureHumidity.setAttribute("class", "fiveDayPTag");
        futureHumidity.innerText = "Humidity: " + fiveDayArr[0].main.humidity + "%";

        blueBox.append(dateLine);
        blueBox.append(icon);
        blueBox.append(futureTemperature);
        blueBox.append(futureHumidity);
        fiveDayBox.append(blueBox);
        rightColumn.append(fiveDayBox);

    };


};

function callSearch(searchTerm) {

    rightColumn.innerHTML = "";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchTerm + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            printCities(response.name);

            currentWeather(response);

        });

};

function fiveDayforecast(searchTerm) {

    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + searchTerm + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURLFiveDay,
        method: "GET"
    })
        .then(function (weatherResponse) {

            var fiveDayArr = weatherResponse.list.filter(function (weatherObj) {
                if (weatherObj.dt_txt.includes('06:00:00')) {
                    return true;
                }
                else {
                    return false;
                }
            });

            printFiveDay(fiveDayArr);
        });
};
searchForm.addEventListener("submit", formSubmit);

