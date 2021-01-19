import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css'
import Booksearch from './components/Booksearch';
import * as BooksAPI from './BooksAPI'
import BookshelfManager from './components/BookshelfManager';


class BooksApp extends React.Component {
  state = {
    bookList: []
  }

  constructor(props) {
    super(props);
    this.onBookUpdate = this.onBookUpdate.bind(this);
  }

  getAllBooks() {
    BooksAPI.getAll().then(data => {
      this.setState({ bookList: data })
    });
  }

  onBookUpdate(e, id) {
    let newShelfValue = e.target.value;
    BooksAPI.update(id, newShelfValue).then(data => {
      let bookList = this.state.bookList;

      if(bookList.filter(item => item.id === id).length > 0) {
        bookList.forEach(book => {
          if (book.id === id) {
            book.shelf = newShelfValue;
          }
        })
      } else {
        BooksAPI.get(id).then(data => {
          bookList.push(data);
        })
      }
      this.setState({ bookList: bookList });
    })
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Book List</h1>
            </div>
            <BookshelfManager bookList={this.state.bookList} onBookUpdate={(e) => this.onBookUpdate} />
            <Link to='/search' className='open-search'>
              <button className='open-search'>Add a book</button>
            </Link>
          </div>
        )}/>

        <Route exact path="/search" render={() => (
          <Booksearch bookList={this.state.bookList} onBookUpdate={(e) => this.onBookUpdate} />
        )}/>
      </div>
    )
  }
}

export default BooksApp