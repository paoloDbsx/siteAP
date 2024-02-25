const body = document.querySelector("body");
const page = document.querySelector("#page");

const link = (virtualRoute) => {
  sessionStorage.setItem("virtualRoute", virtualRoute);
  const event = new Event("virtualRouteOnChange");
  document.dispatchEvent(event);
};

document.addEventListener("virtualRouteOnChange", () => {
  switch (sessionStorage.getItem("virtualRoute")) {
    case "home":
      page.innerHTML = "<p>Home Page</p>";
      break;
    case "contact":
      page.innerHTML = "<p>Contact Page</p>";
      break;
    case "activity":
      page.innerHTML = "<p>Activity Page</p>";
      break;
    default:
      page.innerHTML = "<p>Error: Page Not Found</p>";
      break;
  }
});
