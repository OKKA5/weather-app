var locationinput = document.querySelector(".locationinput");
var weathercontainer = document.querySelector(".row");
var forecastdata;
var address = "egypt";
var links = document.querySelectorAll(".navbar-light .navbar-nav .nav-link");

for (i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    var activelink = document.querySelector(".active");
    e.target.classList.add("active");
    activelink.classList.remove("active");
  });
}
locationinput.addEventListener("input", function () {
  address = locationinput.value;
  getweather();
});
async function getweather() {
  var forecastresponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=2876c313049e4496af5172007241204&q=${address}&days=3`
  );
  forecastdata = await forecastresponse.json();
  console.log(forecastdata);
  displayweather();
}
getweather();
function displayweather() {
  const startingDate = new Date(forecastdata.forecast.forecastday[0].date);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysToShow = 3;
  const weekdayNames = [];
  
  for (let i = 0; i < daysToShow; i++) {
    const currentDate = new Date(startingDate);
    currentDate.setDate(startingDate.getDate() + i);
    const weekdayIndex = currentDate.getDay();
    const weekdayName = weekdays[weekdayIndex];
    weekdayNames.push(weekdayName);
  }
  
  console.log(weekdayNames);

  weathercontainer.innerHTML = `         
   <div class="card col-md-4 bg-secondary p-0 text-white d-flex flex-column justify-content-between">
    <div class="d-flex justify-content-between bg-grey p-2">
      <span>${weekdayNames[0]}</span>
      <span>${forecastdata.forecast.forecastday[0].date}</span>
    </div>
    <div class="p-2 ">
      <div>
        <h2>${forecastdata.location.name}</h2>
      </div>
      <div class="d-flex justify-content-between h-50 align-items-center">
        <h1>${forecastdata.current.temp_c}C</h1>
        <img src="${forecastdata.current.condition.icon}" alt="" class="w-50 h-fit"/>
      </div>
      <div class="pb-3">
        <span>${forecastdata.current.condition.text}</span>
      </div>
      <div class=" d-flex justify-content-between gap-2">
        <div class="d-flex align-items-center gap-2"><img src="./imgs/icon-umberella@2x.png" alt="sbhcj"class="w-50"><span>${forecastdata.current.humidity}%</span></div>
        <div class="d-flex align-items-center gap-2"><img src="./imgs/icon-wind@2x.png" alt="sbhcj"class="w-50"><span>${forecastdata.current.wind_kph}km/h</span></div>
        <div class="d-flex align-items-center gap-2"><img src="./imgs/icon-compass@2x.png" alt="ajdj" class="w-50"><span>${forecastdata.current.wind_dir}</span></div>
      </div>
    </div>
  </div>
  <div class="card col-md-4 bg-dark p-0 text-white text-center">
    <div class="text-center bg-grey p-2">
      <span>${weekdayNames[1]}</span>
    </div>
    <div class="p-2 my-auto">
      <div class="d-flex flex-column align-items-center">
          <img src="${forecastdata.forecast.forecastday[1].day.condition.icon}" alt="" class="w-10 margin-auto"/>
        <h4>${forecastdata.forecast.forecastday[1].day.avgtemp_c}C</h4>
        <h6>${forecastdata.forecast.forecastday[1].day.avgtemp_f}F</h6>
      </div>
      <div class="pb-5">
        <span>${forecastdata.forecast.forecastday[1].day.condition.text}</span>
      </div>
    </div>
  </div>
  <div class="card col-md-4 bg-secondary p-0 text-white text-center">
    <div class="text-center bg-grey p-2">
      <span>${weekdayNames[2]}</span>
    </div>
    <div class="p-2 my-auto">
      <div class="d-flex flex-column align-items-center ">
          <img src="${forecastdata.forecast.forecastday[2].day.condition.icon}" alt="" class="w-10 margin-auto"/>
        <h4>${forecastdata.forecast.forecastday[2].day.avgtemp_c}C</h4>
        <h6>${forecastdata.forecast.forecastday[2].day.avgtemp_f}F</h6>

      </div>
      <div class="pb-5 p-2">
        <span>${forecastdata.forecast.forecastday[2].day.condition.text}</span>
      </div>
    </div>
  </div>`;
}
