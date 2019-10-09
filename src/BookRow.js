import React, { Component } from "react";

class BookRow extends Component {
  // Optional: const { title, author, pages, read } = JSON.parse(book);
  // TODO: Sort out the "Key" situation: Use stringified book as key?
  // Use a unique key from "React.Children.map"?

  render() {
    const { book, i, deleteBook, toggleRead } = this.props;

    return (
      <tr>
        <td className="title">{ book.title }</td>
        <td>{ book.author }</td>
        <td>{ book.pages }</td>
        <td className="read" onClick={() => toggleRead(i)}>{ book.read }</td> 
        <td><button onClick={() => deleteBook(i)}>Delete Book</button></td>
      </tr>
    );
  }
}

export default BookRow;
