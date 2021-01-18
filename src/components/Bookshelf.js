import React from 'react'
import Book from './Book';

const Bookshelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.bookList && props.bookList.length > 0 && props.bookList.map((book) =>
                        <li key={book.id}>
                            <Book book={book} onBookUpdate={props.onBookUpdate()} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default Bookshelf;