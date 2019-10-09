import React, { Component } from 'react';
import Book from "./book";
import LibraryTable from './LibraryTable';
import NewBookForm from './NewBookForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const library = this.loadLibrary();

    this.state = {
      library: library,
      formOpen: false,
    }
  }

  componentDidUpdate = () => {
    this.updateStorage();
  }

  updateStorage = () => {
    localStorage.setItem('library', JSON.stringify(this.state.library))
  }

  loadLibrary = () => {
    if (!localStorage.getItem('library')) 
      return this.sampleLib();
    return JSON.parse(localStorage.getItem('library'));
  }

  sampleLib() {
    return [ 
      new Book("The Hobbit", "J. R. R. Tolkein", 295, "No"),
      new Book("East of Eden", "John Steinbeck", 601, 'Yes'),
      new Book("Steppenwolf", "Herman Hesse", 237, 'Yes'),
      new Book("The Issue at Hand", "Gil Fronsdal", 161, 'Yes'),
    ];
  }

  deleteBook = (i) => { // Optional: pass a book as argument; delete using "findIndex"
    const { library } = this.state
    const newLibrary = library.filter((book, idx) => {
      return i !== idx;
    })
    this.setState({
      library: newLibrary
    })
  }

  toggleRead = (i) => {
    const { library } = this.state
    const newLibrary = library.map((book, idx) => {
      if (idx === i) {
        book.read = (book.read === "Yes") ? "No" : "Yes";
      }
      return book;
    });
    this.setState({
      library: newLibrary
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { title, author, pages, read } = e.target.elements;
    const newBook = new Book(
      title.value, 
      author.value, 
      pages.value, 
      read.value
    );
    this.setState({
      library: [...this.state.library, newBook],
      formOpen: false,
    })
  }

  toggleForm = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Library</h1>
        </header>
  
        <LibraryTable 
          library={this.state.library}
          deleteBook={this.deleteBook}
          toggleRead={this.toggleRead}
        />
        
        <div id="form-wrapper">
          <button onClick={() => this.toggleForm()}>New Book</button>
          {
            this.state.formOpen 
            && <NewBookForm submitForm={this.submitForm}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
