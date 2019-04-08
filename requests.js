class Requests {
  static host = "https://geodb.thecodinglab.ch/";
  static version = "v1/";

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

  notNull(data) {
    return data !== null && data !== "";
  }

  //02_Discticts
  //https://documenter.getpostman.com/view/5848189/Rzfni6B2

  async getAllDistricts() {
    return getData(host + version + "/districts");
  }

  async queryDistricts(districtname, zipcode) {
    if (notNull(districtname) && notNull(zipcode))
      return getData(
        host +
          version +
          "/districts/?name?=" +
          districtname +
          "&zip_code?=" +
          zipcode
      );
  }

  async getDistrictViaId(districtId) {
    if (notNull(districtId)) return getData(host + "/v1/districts/" + districtId);
  }

  //03_Routes
  //https://documenter.getpostman.com/view/5848189/Rzfni6B3
  
  async queryRoutes(name, approxtime) {
    if (notNull(approxtime)) {
      if (notNull(name)) {
        return getData(
          host +
            version +
            "/routes/?" +
            name +
            "=routename&approx_time=" +
            approxtime
        );
      } else {
        return getData(host + version + "/routes/?approx_time=" + approxtime);
      }
    }
  }

  async getRoutesForDistrict(discrictId) {
    if (notNull(districtId))
      return getData(host + version + "/districts/" + discrictId + "/routes");
  }

  async getRouteViaID(routeId) {
    if (notNull(routeId)) return getData(host + version + "/routes/" + routeId);
  }

  //04_Locations
  //https://documenter.getpostman.com/view/5848189/Rzfni6B4
  
  async queryLocation(name) {
    if (notNull(name))
      return getData(host + version + "/locations/?name=" + name);
  }

  async getLocationsForRoute(routeId) {
    if (notNull(routeId))
      return getData(host + version + "routes/" + routeId + "/locations");
  }

  async getLocatoinViaId(locationId) {
    if (notNull(locationId)) return getData(host + version + "locations/" + locationId);
  }

  async getLocationsForDistrict(districtId){
    if (notNull(districtId)) return getData(host + version + "districts/" + districtId+"/locations");
  }
}

const requests = new Requests();
export default requests;
