import React from 'react'
import Book from './Book';

class Bookshelf extends React.Component {

    state = {
        shelfName: null,
        bookList: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.bookList.map((book) =>
                            <li key={book.id}>
                                <Book bookName={book.title} bookAuthor={book.authors.join(", ")} thumbnailUrl={book.imageLinks.smallThumbnail} />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;