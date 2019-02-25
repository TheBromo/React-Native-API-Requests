class Requests{
    async getTestData(){
        const response = await fetch('https://facebook.github.io/react-native/movies.json');
        const json = await response.json();
        return json.movies;
    }
}

const requests =new Requests();
export default requests;
