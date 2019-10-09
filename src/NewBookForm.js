import React, { Component } from "react";

class NewBookForm extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      title: '',
      author: '',
      pages: '',
      read: null,
    }

    this.state = this.initialState;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  handleForm = (e) => {
    this.props.submitForm(e);
    this.setState(this.initialState);
    // ToDo: how to clear form validation states?
  }

  render() {
    const { title, author, pages } = this.state;

    return (
      <form onSubmit={this.handleForm}>
        <p>Book Title: 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input 
            name="title"
            type="text"
            value={title}
            onChange={this.handleChange}
            required
          />
        </p>
        <p>Author: 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input
            name="author"
            type="text"
            value={author}
            onChange={this.handleChange}
            required 
          />
        </p>
        <p>Number of pages: 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input 
            name="pages"
            type="number"
            value={pages}
            onChange={this.handleChange}
            required
            min="1"
          />
        </p>
        <p>Have you read it yet? 
          <abbr title="This field is mandatory" aria-label="required">
            {' '}*{' '}
          </abbr> 
          <input 
            name="read"
            type="radio" 
            value="Yes"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="yes">Yes</label>
          <input 
            name="read"
            type="radio" 
            value="No"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="no">No</label>
        </p>
        {/* <input type="submit" value="Save Book" /> */}
        <button>Save Book</button>
      </form>
    );
  }
}

export default NewBookForm;
