import React from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Bookshelf from './Bookshelf';

class Booksearch extends React.Component {

  state = {
    searchResults: [],
    searchText: '',
    isHidden: false,
    noSearchResults: false
  }

  handleNewSearch(e) {
    
    if(this.state.searchResults !== []) {
      this.setState({searchResults: []});
      this.setState({isHidden: false});
      this.setState({noSearchResults: false});
    }

    let searchText = e.target.value;
    if (searchText.length > 3) {
      this.setState({ searchText: searchText });
      this.searchBooks(searchText);
      this.setState({isHidden: true});
    } else {
      this.setState({isHidden: false});
    }

  }

  searchBooks(searchText) {
    BooksAPI.search(searchText).then(data => {
      if (data.error) {
        this.setState({noSearchResults: true})
        console.log("error..")
      } else {
        this.setState({noSearchResults: false})
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
          <div hidden={this.state.isHidden}>
            <h4>Please enter more than three characters to begin..</h4>
          </div>
          {!this.state.noSearchResults && <Bookshelf bookList={this.state.searchResults} shelfName={"Search Result(s) :"} onBookUpdate={(e) => this.props.onBookUpdate()} />}
          {this.state.noSearchResults && <h4>No Valid Results found for the search query</h4>}
        </div>
      </div>
    );
  }
}

export default Booksearch;