import React from 'react';
import * as BooksAPI from '../BooksAPI'
import Bookshelf from './Bookshelf';

class BookshelfManager extends React.Component {

    state = {
        currentlyReadingList: [],
        wantToReadList: [],
        readList: [],
        allBooksList: []
    }

    componentDidMount() {
    }

    constructor(props) {
        super(props);
        this.updateBookLists();
    }

    updateBookLists() {
        BooksAPI.getAll().then(data => {
            this.setState({ allBooksList: data }, () => {
                let readBooks = this.state.allBooksList.filter(book => book.shelf === 'read');
                this.setState({readList: readBooks});
                
                let currentlyReading = this.state.allBooksList.filter(book => book.shelf === 'currentlyReading');
                this.setState({currentlyReadingList: currentlyReading});
        
                let wantToRead = this.state.allBooksList.filter(book => book.shelf === 'wantToRead');
                this.setState({wantToReadList: wantToRead}, ()=> {
                    console.log(this.state)
                });
            });
        });
    }

    updateBooksShelf() {
        
    }

    render() {
        return (
            <div className="list-books-content">
                <Bookshelf bookList={this.state.currentlyReadingList} shelfName={"Currently Reading"} />
                <Bookshelf bookList={this.state.wantToReadList} shelfName={"Want To Read"} />
                <Bookshelf bookList={this.state.readList} shelfName={"Read"} />
            </div>
        );
    }
}

export default BookshelfManager;