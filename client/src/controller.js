export default class Controller {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(getRoute) {
    this.getUrl = this.baseUrl + getRoute;
    await fetch(this.getUrl)
      .then(res => res.json())
      .then((data) => {
        this.data = data;
      });
    return this.data;
  }

  async post(postRoute, method) {
    this.postUrl = this.baseUrl + postRoute;
    this.method = method;
    await fetch(this.postUrl, method)
      .then(res => res.json())
      .then((data) => {
        this.data = data;
      });
    return this.data;
  }

  async put(putRoute, method) {
    this.puUrl = this.baseUrl + putRoute;
    this.method = method;
    await fetch(this.putUrl, method)
      .then(res => res.json())
      .then((data) => {
        this.data = data;
      });
    return this.data;
  }

  async delete(deleteRoute, method) {
    this.deleteUrl = this.baseUrl + deleteRoute;
    this.method = method;
    await fetch(this.deleteUrl, method)
      .then(res => res.json())
      .then((data) => {
        this.data = data;
      });
    return this.data;
  }
}
