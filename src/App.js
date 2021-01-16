import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css'
import Booksearch from './components/Booksearch';
import BookshelfManager from './components/BookshelfManager'
import Homepage from './components/Homepage';

class BooksApp extends React.Component {
  state = {
    bookList: []
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <Homepage/>
          )}/>

          <Route exact path="/search" render={() => (
            <Booksearch/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
