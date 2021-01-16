import React from 'react'
import { Link } from 'react-router-dom';
import BookshelfManager from './BookshelfManager';

class Homepage extends React.Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Book List</h1>
                </div>
                <BookshelfManager></BookshelfManager>
                <Link to='/search' className='open-search'>
                    <button className='open-search'>Add a book</button>
                </Link>
            </div>
        );
    }
}
export default Homepage;