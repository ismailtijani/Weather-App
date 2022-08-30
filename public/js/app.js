const form = document.querySelector("form");
const input = document.querySelector("input");
const message__1 = document.querySelector("#message-1");
const message__2 = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  message__1.textContent = "Loading......";
  message__2.textContent = "";
  fetch(`http://localhost:3000/weather-page?search=${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        message__1.textContent = data.error;
      } else {
        message__1.textContent = data.location;
        message__2.textContent = data.forecast;
      }
    });
});
