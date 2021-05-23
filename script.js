const defaults = {
  primary: "rgb(10, 180, 255)",
  secondary: "rgb(232, 12, 255)",
  text: "tvoja_shiza",
  timeout: 2000,
};

const timeout = defaults.timeout;
let root = document.documentElement;

const search = window.location.search;

const data = parseSearch(search);

let colors = [
  data?.primary || defaults.primary,
  data?.secondary || defaults.secondary,
];

let innertext = data?.text || defaults.text;

root.style.setProperty("--timeout", `${data?.timeout || timeout}ms`);

const text = document.querySelector(".text");
text.innerHTML = innertext;

function parseSearch(str) {
  if (!str.length) return {};
  const properties = str
    .substring(1) //removing first question mark
    .split("&");

  return properties.reduce((obj, x) => {
    const [key, value] = x.split("=");
    return {
      ...obj,
      [key]: value,
    };
  }, {});
}

setInterval(() => {
  root.style.setProperty("--color-primary", colors[0]);
  root.style.setProperty("--color-secondary", colors[1]);
  colors.reverse();
}, data?.timeout || timeout);
