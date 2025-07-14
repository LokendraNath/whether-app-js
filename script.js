document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.querySelector("#type-city");
  const whetherInfoDiv = document.querySelector("#whether-info");
  const cityNameDisplay = document.querySelector("#city-name");
  const tempratureDisplay = document.querySelector("#temprature");
  const descriptionDisplay = document.querySelector("#description");
  const errorDisplay = document.querySelector("#error-message");

  userInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      errorDisplay.style.display = "none";
      const userCity = userInput.value.trim();
      if (!userCity) return;

      try {
        const whetherData = await fetchWhetherData(userCity);
        fetchWheterDisplay(whetherData);
      } catch (error) {
        errorMessage();
      }
      userInput.value = "";
    }
  });

  async function fetchWhetherData(city) {
    const API_KEY = "534c015ba3f8d1d4c3eef5bf65e20fdb";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }
  function fetchWheterDisplay(wheterData) {
    console.log(wheterData);
    const { name, main, weather } = wheterData;
    whetherInfoDiv.style.display = "block";
    cityNameDisplay.textContent = name;
    descriptionDisplay.textContent = `Description :  ${weather[0].description}`;
    tempratureDisplay.textContent = `Temprature ${main.temp}`;

    const wetherMain = weather[0].main;
    let iconPath = "";
    if (wetherMain === "Clouds") {
      iconPath = "./icon/clouds.png";
    } else if (wetherMain === "Rain") {
      iconPath = "./icon/rain.png";
    }

    document.querySelector(".whether-icon").src = iconPath;
  }
  function errorMessage() {
    whetherInfoDiv.style.display = "none";
    errorDisplay.style.display = "block";
  }
});
