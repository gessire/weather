const citySelect = document.getElementById("citySelect");
const cityInfo = document.getElementById("cityInfo");

const API_KEY = "3045dd712ffe6e702e3245525ac7fa38"; 

fetch("city.list.json")
  .then(response => response.json())
  .then(data => {
    const iranCities = data.filter(city => city.country === "IR");

    iranCities.forEach(city => {
      const option = document.createElement("option");
      option.value = city.id;
      option.textContent = city.name;
      citySelect.appendChild(option);
    });
  })
  .catch(error => console.error("خطا در بارگذاری داده‌ها:", error));

citySelect.addEventListener("change", (event) => {
  const cityId = event.target.value;

  if (cityId) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&lang=fa&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        weatherinfo.innerHTML = `
          <p id=temp > ${data.main.temp} °C</p>
          <p id='date'> ${data.name} , ${new Date().toLocaleDateString("fa-IR")} </p>
          <p class="detail">رطوبت: <span> ${data.main.humidity} % </span> </p>
          <p class="detail">سرعت باد: <span> ${data.wind.speed} km/h </span> </p>
        `;
      })
      .catch(error => {
        cityInfo.innerHTML = '<p>خطا در دریافت اطلاعات هواشناسی</p>';
        console.error(error);
      });
  } else {
    cityInfo.innerHTML = '<p>لطفاً یک شهر انتخاب کنید.</p>';
  }
});