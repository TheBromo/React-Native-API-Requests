class Requests {
  static host = "https://geodb.thecodinglab.dev/";
  static version = "v1/";
  static address = Requests.host + Requests.version;

  async getData(url = ``) {
    const response = await fetch(url);
    return await response.json();
  }

  async postDataXauth(url = ``, x_auth_token, data = {}) {
    const response = await fetch(url, {
      method: "POST", // GET(default), POST, PUT, DELETE, etc.
      headers: {
        "X-Auth-Token": x_auth_token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json();
  }
  
  async getDataXauth(url = ``, x_auth_token) {
    const response = await fetch(url, {
      method: "GET", // GET(default), POST, PUT, DELETE, etc.
      headers: {
        "X-Auth-Token": x_auth_token,
      },
    });
    return await response.json();
  }

  async postData(url = ``, data) {
    const response = await postJsonData(url, data);
    return await response.json();
  }

  postJsonData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST", // GET(default), POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
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
    if (this.notNull(username) && this.notNull(email) && this.notNull(password)) {
      return await this.postData(`${Requests.address}auth/register`,
        {
          'username': username,
          'email': email,
          'password': password
        });
    } else {
      throw "username, password or email not set";
    }
  }

  async loginAsUser(username, password) {
    if (this.notNull(username) && this.notNull(password)) {
      return await this.postJsonData(`${Requests.address}auth/login`, {
        'username': username,
        'password': password
      });
    } else {
      throw "username or password not set";
    }
  }

  //x_auth_token is returned from "loginAsUser" function
  async getAccountDetails(x_auth_token) {
    if (this.notNull(x_auth_token)) {
      return await this.getDataXauth(`${Requests.address}user/me/details`);
    }else{
      throw "no x_auth_token set"
    }
  }

  async getOwnCapabilities(x_auth_token) {
    if (this.notNull(x_auth_token)) {
      return await this.getDataXauth(`${Requests.address}user/me/capabilities`);
    }else{
      throw "no x_auth_token set"
    }
  }

  async forgotPassword(username) {
    if (this.notNull(username)) {
      return await this.postJsonData(`${Requests.address}user/me/forgot-password`, {
        "username": username
      });
    } else {
      throw "username not set";
    }
  }



  //02_Discticts
  //https://documenter.getpostman.com/view/5848189/Rzfni6B2

  async getAllDistricts() {
    console.log(`${Requests.address}districts/`);
    return await this.getData(`${Requests.address}districts/`);
  }

  async queryDistricts(districtname, zipcode) {
    if (this.notNull(districtname) && this.notNull(zipcode)) {
      return await this.getData(`${Requests.address}districts/?name?=${districtname}&zip_code?=${zipcode}`
      );
    } else {
      throw "disctrictname or zipcode not set";
    }
  }

  async getDistrictViaId(districtId) {
    if (this.notNull(districtId)) {
      return await this.getData(`${Requests.address}districts/${districtId}`);
    } else {
      throw "district id not set";
    }
  }

  //03_Routes
  //https://documenter.getpostman.com/view/5848189/Rzfni6B3

  async queryRoutes(routename, approxtime) {
    if (this.notNull(approxtime)) {
      if (this.notNull(name)) {
        return await this.getData(`${Requests.address}routes/?name=${routename}&approx_time=${approxtime}`);
      } else {
        return await this.getData(`${Requests.address}routes/?approx_time=${approxtime}`);
      }
    } else {
      throw "approx time not set";
    }
  }

  async getRoutesForDistrict(discrictId) {
    if (this.notNull(districtId)) {
      return await this.getData(`${Requests.address}districts/${discrictId}/routes`);
    } else {
      throw "district id not set";
    }
  }

  async getRouteViaID(routeId) {
    if (this.notNull(routeId)) {
      return await this.getData(`${Requests.address}routes/${routeId}`);
    } else {
      throw "routeId not set";
    }
  }

  //04_Locations
  //https://documenter.getpostman.com/view/5848189/Rzfni6B4

  async queryLocation(name) {
    if (this.notNull(name))
      return await this.getData(`${Requests.address}locations/?name=${name}`);
  }

  async getLocationsForRoute(routeId) {
    if (this.notNull(routeId))
      return await this.getData(`${Requests.address}routes/${routeId}/locations`);
  }

  async getLocatoinViaId(locationId) {
    if (this.notNull(locationId)) return await this.getData(`${Requests.address}locations/${locationId}`);
  }

  async getLocationsForDistrict(districtId) {
    if (this.notNull(districtId)) return await this.getData(`${Requests.address}districts/${districtId}/locations`);
  }
}

const requests = new Requests();
export default requests;
