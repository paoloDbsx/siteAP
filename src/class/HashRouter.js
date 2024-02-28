class HashRouter {
  constructor(routes) {
    this.routes = routes;
  }

  getCurrentPath() {
    return window.location.hash.slice(1);
  }

  get(path) {
    const matchedRoute = this.routes.find((route) => route.path == path);
    if (!matchedRoute) {
      throw new Error("Route not found");
    }

    matchedRoute.callback();
  }

  navigateTo(path) {
    window.location.href = "#" + path;
    this.get(path);
  }

  extractParams(path) {
    const params = path.slice(1).split("/");
    return params;
  }
}
