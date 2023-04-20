import './App.css';
import {Component} from "react";
import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Books from "../Books/BooksList/books";
import Countries from "../Countries/countries";
import Authors from "../Authors/authors";
import libraryService from "../../repository/libraryRepository";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import Header from "../Header/Header";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            countries: [],
            selectedBook: {}
        }
    }
    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <Routes>
                        <Route path={"/countries"} exact render={() =>
                            <Countries countries={this.state.countries}/>}/>
                        <Route path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>
                        <Route path={"/add"} exact render={() =>
                            <BookAdd books={this.state.books}
                                        authors={this.state.authors}
                                        onAddBook={this.addBook}/>}/>
                        <Route path={"/edit/:id"} exact render={() =>
                            <BookEdit books={this.state.books}
                                         authors={this.state.authors}
                                         onEditBook={this.editBook}
                                         book={this.state.selectedBook}/>}/>
                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books}
                                      onDelete={this.deleteBook}
                                      onEdit={this.getBook}/>}/>
                    </Routes>
                    <Navigate to={"/books"}/>
                </main>
            </Router>
        );
    }
    componentDidMount() {
        this.loadCountries();
        this.loadAuthors();
        this.loadBooks();
    }
    loadAuthors = () => {
        libraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }
    loadCountries = () => {
        libraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            });
    }
    loadBooks = () => {
        libraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    deleteBook = (id) => {
        libraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    addBook = (name, category, availableCopies, author) => {
        libraryService.addBook(name, availableCopies, category, author)
            .then(() => {
                this.loadBooks()
            });
    }
    editBook = (id, name, category, availableCopies, author) => {
        libraryService.editBook(id, name, availableCopies, category, author)
            .then(() => {
                this.loadBooks()
            });
    }
    getBook = (id) => {
        libraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            });
    }
}

export default App;
