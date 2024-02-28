class Page {
  constructor(data) {
    this.data = data;
    this.setPageData();
  }
  setPageData() {
    clear("main");
    clone("main", this.data.template);
    one(".meta-description").content = this.data.metaDescription;
    one("title").textContent = this.data.title;
    window.scrollTo(0, 0);
    this.data.after();
  }
}
