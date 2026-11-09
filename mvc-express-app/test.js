const url = "http://localhost:8000/api/v1/movies";

const readAllMovies = () => {
    fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log("Error while fetching data", err);
        });
};

const readMovieById = (id) => {
    fetch(`${url}/${id}`, { method: "GET" })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log("Error while fetching data", err);
        });
};

// The remaining code follows the same structure
// for create, update, and delete operations.
// The exact ending is not fully visible in the images.