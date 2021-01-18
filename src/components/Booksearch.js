import React from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Bookshelf from './Bookshelf';

class Booksearch extends React.Component {

  state = {
    searchResults: [],

  }

  handleNewSearch(e) {
    let searchText = e.target.value;
    if (searchText.length > 3) {
      this.searchBooks(searchText);
    }
  }

  searchBooks(searchText) {
    BooksAPI.search(searchText).then(data => {

      if (data.error) {
        console.log("error..")
      } else {
        let currentBookList = this.props.bookList;
        let bookMap = new Map();

        currentBookList.forEach(item => {
          bookMap.set(item.id, item);
        })

        data.forEach(item => {
          if (bookMap.get(item.id)) {
            let book = bookMap.get(item.id);
            item.shelf = book.shelf;
          }
        })
        this.setState({ searchResults: data })
      }
    });
  }

  constructor(props) {
    super(props);
    this.searchBooks = this.searchBooks.bind(this);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>
            <button className='close-search'>close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title" onChange={(e) => { this.handleNewSearch(e) }} />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf bookList={this.state.searchResults} shelfName={"Search Result(s) :"} onBookUpdate={(e) => this.props.onBookUpdate()} />
        </div>
      </div>
    );
  }
}

export default Booksearch;