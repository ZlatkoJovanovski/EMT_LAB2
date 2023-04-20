import axios from '../custom-axios/axios';
const libraryService = {
    fetchBooks: () => {
        return axios.get("/books" + "/")
    },
    fetchAuthors: () => {
        return axios.get("/authors")
    },
    fetchCountries: () => {
        return axios.get("/countries")
    },
    deleteBook: (id) => {
        return axios.delete(`/delete/${id}`);
    },
    addBook: (name, availableCopies, category, author) => {
        return axios.post("/add", {
            "name" : name,
            "availableCopies" : availableCopies,
            "category" : category,
            "author" : author
        });
    },
    editBook: (id, name, availableCopies, category, author) => {
        return axios.put(`/edit/${id}`, {
            "name" : name,
            "availableCopies" : availableCopies,
            "category" : category,
            "author" : author
        });
    },
    getBook: (id) => {
        return axios.get(`/${id}`);
    }
}
export default libraryService;