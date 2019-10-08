import React, {Component} from 'react';
import BookRow from "./BookRow";

class LibraryTable extends Component {
  // should this hold a "book" state to facilitate deletion?

  mapTitlesToHeaders(title) {
    return (
      <th scope="col">{ title }</th>
    );
  }

  render() {
    const { 
      library,
      deleteBook,
      toggleRead,
    } = this.props;

    const bookRows = library.map((book, i) => {
      return (
        <BookRow 
          book={book} 
          key={i} 
          i={i} 
          deleteBook={deleteBook}
          toggleRead={toggleRead}
        />
      );
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

export default LibraryTable;
