import React from 'react';
import Bookshelf from './Bookshelf';

const BookshelfManager = (props) => {
    return (
        <div className="list-books-content">
            <Bookshelf bookList={props.bookList.filter(book => book.shelf === 'currentlyReading')} shelfName={"Currently Reading"} onBookUpdate={(e) => props.onBookUpdate()} />
            <Bookshelf bookList={props.bookList.filter(book => book.shelf === 'wantToRead')} shelfName={"Want To Read"} onBookUpdate={(e) => props.onBookUpdate()} />
            <Bookshelf bookList={props.bookList.filter(book => book.shelf === 'read')} shelfName={"Read"} onBookUpdate={(e) => props.onBookUpdate()} />
        </div>
    );
}

export default BookshelfManager;