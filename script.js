const API_KEY = "82a376764fe8ff1d03faf835eabe0319";

async function fetchWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === "404") {
            alert("No such city found!");
            return;
        }

        console.log(data);

        let temp = data.main.temp;
        let locationname = data.name;
        let condition = data.weather[0].description;
        let icon = data.weather[0].icon; // weather icon code

        // Update DOM
        document.querySelector(".temp p").textContent = temp + "°C";
        document.querySelector(".TimeLocation p:first-child").textContent = locationname;
        document.querySelector(".condition p:last-child").innerHTML =
            `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" 
                  alt="${condition}" 
                  title="${condition}">`;
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
    }
}

function searchforlocation(e) {
    e.preventDefault();
    let targetlocation = document.querySelector(".search_area").value.trim();

    if (targetlocation === "") {
        targetlocation = "Dehradun";
    }

    fetchWeather(targetlocation);
}

// Load default city on page load
window.onload = () => {
    fetchWeather("Dehradun");
};
