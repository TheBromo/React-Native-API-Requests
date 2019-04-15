class Requests {
  static host = "https://geodb.thecodinglab.ch/";
  static version = "v1/";
  static address = this.host+this.version;

  async getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async postData(url, data) {
    const response = await postJsonData(url, data);
    return await response.json();
  }

  postJsonData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST", // GET(default), POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }

  postJsonData(url = ``, token) {
    return fetch(url, {
      method: "GET", // GET(default), POST, PUT, DELETE, etc.
      headers: {
        "X-Auth-Token": token
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }

  notNull(data) {
    return data !== null && data !== "";
  }

  //01_User Account Control
  //https://documenter.getpostman.com/view/5848189/Rzfni6B1

  async registerNewUser(username, email, password) {
    if (notNull(username) && notNull(email) && notNull(password)) {
      return await postData(`${this.address}auth/register`,
        {
          'username': username,
          'email': email,
          'password': password
        });
    }else{
      throw "not all parameters set";
    }
  }

  async loginAsUser(username, password) {
    if (notNull(username) && notNull(password)) {
      return await postJsonData(`${this.address}auth/login`, {
        'username': username,
        'password': password
      });
    }else{
      throw "username or password not set";
    }
  }
  //not sure if it has to be implemented
  async getAccountDetails() { }

  async getOwnCapabilities() { }

  async forgotPassword(username) {
    if (notNull(username)) {
      return await postJsonData(`${this.address}/user/me/forgot-password`, {
        "username": username
      });
    }else{
      throw "username not set";
    }
  }



  //02_Discticts
  //https://documenter.getpostman.com/view/5848189/Rzfni6B2

  async getAllDistricts() {
    return await getData(`${address}districts/`);
  }

  async queryDistricts(districtname, zipcode) {
    if (notNull(districtname) && notNull(zipcode))
      return await getData(`${this.address}districts/?name?=${districtname}&zip_code?=${zipcode}`
      );
  }

  async getDistrictViaId(districtId) {
    if (notNull(districtId)) return await getData(`${this.address}districts/${districtId}`);
  }

  //03_Routes
  //https://documenter.getpostman.com/view/5848189/Rzfni6B3

  async queryRoutes(routename, approxtime) {
    if (notNull(approxtime)) {
      if (notNull(name)) {
        return await getData(`${this.address}routes/?name=${routename}&approx_time=${approxtime}`);
      } else {
        return await getData(`${this.address}routes/?approx_time=${approxtime}`);
      }
    }
  }

  async getRoutesForDistrict(discrictId) {
    if (notNull(districtId))
      return await getData(`${this.address}districts/${discrictId}/routes`);
  }

  async getRouteViaID(routeId) {
    if (notNull(routeId)) return await getData(`${this.address}routes/${routeId}`);
  }

  //04_Locations
  //https://documenter.getpostman.com/view/5848189/Rzfni6B4

  async queryLocation(name) {
    if (notNull(name))
      return await getData(`${this.address}locations/?name=${name}`);
  }

  async getLocationsForRoute(routeId) {
    if (notNull(routeId))
      return await getData(`${this.address}routes/${routeId}/locations`);
  }

  async getLocatoinViaId(locationId) {
    if (notNull(locationId)) return await getData(`${this.address}locations/${locationId}`);
  }

  async getLocationsForDistrict(districtId) {
    if (notNull(districtId)) return await getData(`${this.address}districts/${districtId}/locations`);
  }
}

const requests = new Requests();
export default requests;
