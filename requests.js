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
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    }

    notNull(data) {
        return data !== null && data !== '';
    }

    //02_Discticts
    async getAllDistricts() {
        return getData(host + version + "/districts");
    }

    async queryDistricts(districtname, zipcode) {
        if (notNull(districtname) && notNull(zipcode)) return getData(host + version + "/districts/?name?=" + districtname + "&zip_code?=" + zipcode);

    }

    async getDistrictViaId(id) {
        if (notNull(id)) return getData(host + "/v1/districts/" + id);
    }

    //03_Routes
    async queryRoutes(name, approxtime) {
        if (notNull(approxtime)) {
            if (notNull(name)) {
                return getData(host + version + "/routes/?" + name + "=routename&approx_time=" + approxtime);
            } else {
                return getData(host + version + "/routes/?approx_time=" + approxtime);
            }
        }
    }

    async getRoutesForDistrict(discrictId) {
        if (notNull(districtId)) return getData(host + version + "/districts/" + discrictId + "/routes");
    }

    async getRouteViaID(routeId) {
        if (notNull(routeId)) return getData(host + version + "/routes/" + routeId);
    }

    //04_Locations
    async queryLocation(name) {
        if (notNull(name)) return getData(host + version + "/locations/?name=" + name);
    }

    async getLocationsForRoute(id) {
        if (notNull(id)) return getData(host + version + "routes/" + id + "/locations");
    }
}

const requests = new Requests();
export default requests;