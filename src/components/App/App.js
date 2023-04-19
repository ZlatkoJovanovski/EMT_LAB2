import './App.css';
import {Component} from "react";
import React from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Books from "../Books/books";
import Countries from "../Countries/countries";
import Authors from "../Authors/authors";
import libraryService from "../../repository/libraryRepository";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            countries: []
        }
    }
    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/countries"} exact render={() =>
                            <Countries countries={this.state.countries}/>}/>
                        <Route path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BooksAdd books={this.state.books}
                                        authors={this.state.authors}
                                        onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit books={this.state.books}
                                         authors={this.state.authors}
                                         onEditBook={this.editBook}
                                         book={this.state.selectedBook}/>}/>
                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books}
                                      onDelete={this.deleteBook}
                                      onEdit={this.getBook}/>}/>
                        <Redirect to={"/books"}/>
                    </div>
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
}

export default App;
