const timeout = 2000;
let root = document.documentElement;

const search = window.location.search;

const data = parseSearch(search);

let colors = [
  data?.primary || "rgb(10, 180, 255)",
  data?.secondary || "rgb(232, 12, 255)",
];

root.style.setProperty("--timeout", `${data?.timeout || timeout}ms`);

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
  data?.primary && root.style.setProperty("--color-primary", colors[0]);
  data?.secondary && root.style.setProperty("--color-secondary", colors[1]);
  colors.reverse();
}, data?.timeout || timeout);
