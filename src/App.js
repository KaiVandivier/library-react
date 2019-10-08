import React, { Component } from 'react';
// import LibraryTable from './LibraryTable';
// import NewBookForm from './NewBookForm';
import './App.css';

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  }
}

class App extends Component {
  // load library from storage in constructor?
  state = {
    library: this.sampleLib()
  }

  sampleLib() { // temporary for testing
    const hobbit = new Book("The Hobbit", "J. R. R. Tolkein", 295, "No");
    const eden = new Book("East of Eden", "John Steinbeck", 601, 'Yes');
    const steppenwolf = new Book("Steppenwolf", "Herman Hesse", 237, 'Yes');
    const issueAtHand = new Book("The Issue at Hand", "Gil Fronsdal", 161, 'Yes');
    const library = [];
    library.push(hobbit, eden, steppenwolf, issueAtHand);
    return library; // Optional: .map((book) => JSON.stringify(book));
  }

  deleteBook(i) { // Optional: pass a book as argument; delete using "findIndex"
    const { library } = this.state
    const newLibrary = library.filter((book, idx) => {
      return i !== idx;
    })
    this.setState({
      library: newLibrary
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Library</h1>
        </header>
  
        <LibraryTable 
          library={this.state.library}
          deleteBook={this.deleteBook.bind(this)}
        />
        
        <div id="form-wrapper">
          <button onClick={ () => {} /* todo */}>{/* new book */}New Book</button>
          <NewBookForm />
        </div>
      </div>
    );
  }
}

class BookRow extends Component {
  // Optional: const { title, author, pages, read } = JSON.parse(book);
  // TODO: Sort out the "Key" situation: Use stringified book as key?
  // Use a unique key from "React.Children.map"?

  render() {
    const { book, i, deleteBook } = this.props;

    return (
      <tr>
        <td>{ book.title }</td>
        <td>{ book.author }</td>
        <td>{ book.pages }</td>
        <td>{ book.read }</td> 
        <td><button onClick={() => deleteBook(i)}>Delete Book</button></td>
      </tr>
    );
  }
}

class LibraryTable extends Component {
  // should this hold a "book" state to facilitate deletion?

  mapTitlesToHeaders(title) {
    return (
      <th scope="col">{ title }</th>
    );
  }

  render() {
    const { library, deleteBook } = this.props;
    const bookRows = library.map((book, i) => {
      return <BookRow book={book} key={i} i={i} deleteBook={deleteBook} />
    }); // Option: set key to book.name, then search by that later?


    const columnTitles = [
      "Title",
      "Author",
      "Pages",
      "Read?",
      "Delete Book"
    ];

    // Optional: { React.Children.map(books, this.mapBooksToRows) }

    return (
      <table>
        <thead>
          <tr>
            { React.Children.map(
              columnTitles,
              this.mapTitlesToHeaders
            ) }
          </tr>
        </thead>
        <tbody>
          { bookRows }
        </tbody>
      </table>
    );
  }
}

class NewBookForm extends Component {
  submitForm(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.submitForm }>
        <p>Book Title: 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input type="text" name="title" required />
        </p>
        <p>Author: 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input type="text" name="author" required />
        </p>
        <p>Number of pages: 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input type="number" name="pages" min="1" required />
        </p>
        <p>Have you read it yet? 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input type="radio" name="read" value="Yes" required />
          <label htmlFor="yes">Yes</label>
          <input type="radio" name="read" value="No" required />
          <label htmlFor="no">No</label>
        </p>
        <input type="submit" value="Save Book" />
      </form>
    );
  }
}

export default App;
