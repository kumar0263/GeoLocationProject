document.addEventListener("DOMContentLoaded", () => {
    const fetchLocationButton = document.getElementById("Fetch_details");
    const weatherInfoElement = document.getElementById("weatherInfo");

    // Handle button click
    function fetchLocation(){
        // Check if geolocation is available in the browser
        if ("geolocation" in navigator) {
            // Get user's current position
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetch weather data
                fetchWeatherData(latitude, longitude);
            }, (error) => {
                // Handle geolocation errors
                console.error("Geolocation error:", error);
                weatherInfoElement.textContent = "Failed to fetch location. Please try again.";
            });
        } else {
            weatherInfoElement.textContent = "Geolocation is not available in your browser.";
        }
    };

    // Function to fetch weather data
    function fetchWeatherData(latitude, longitude) {
        const apiKey = "8bae1549ee5bf8e59225181727785cb4";
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        // Make a GET request to OpenWeatherMap API
        fetch(apiUrl,{method: "GET"})
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log(response.json());
                return response.json();
            })
            .then((data) => {
                // Process and display weather data
                displayWeatherData(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                weatherInfoElement.textContent = "Failed to fetch weather data. Please try again.";
            });
    }

    // Function to display weather data
    function displayWeatherData(data) {
        // Customize this part to display the weather information as per your design
        const temperature = data.current.temp;
        const description = data.current.weather[0].description;
        console.log(temperature);
        console.log(description);

        weatherInfoElement.innerHTML = `Temperature: ${temperature}°C<br>Condition: ${description}`;
    }
});
