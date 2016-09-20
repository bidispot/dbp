const ROOT_URL = "";

class Api {

  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'Authorization': 'RJS token="5f74e599bda7ed4e09581bc137e4957ebd1312fc"'
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const host = ROOT_URL;
    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers()
    return fetch(url, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(
      json => {
        return json.results
      });
  }

  static getMock() {
    return this.xhrMock();
  }

  static xhrMock() {
    console.log("xhrMock");
    var json = require('./json/db1.json');
    return json;
  }
}
export default Api
