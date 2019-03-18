class Requests {
    async getData(url) {
        const response = await fetch(url);
        return  await response.json();
        }

    async postData(url,data) {
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
}

const requests = new Requests();
export default requests;