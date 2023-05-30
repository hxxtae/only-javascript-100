import App from "./src/app.js";

const root = document.querySelector("#app");
const portal = document.querySelector("#portal");

new App({ $target: root, $portal: portal });
