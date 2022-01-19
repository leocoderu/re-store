import React, { Component } from "react";
import BookListItem from "../book-list-item";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import { withBookstoreService } from "../hoc";
import { fetchBooks, bookAddedToCart } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
//import {bindActionCreators} from "redux";

import './book-list.css';
import ErrorIndicator from "../error-indicator";


const mapStateToProps = ({ bookList: { books, loading, error }}) => {
    return { books, loading, error };
}

/*const mapDispatchToProps = {
    fetchBooks
};*/

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddToCart: bookAddedToCart
    }, dispatch);
};


const BookList = ({ books, onAddToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddToCart={() => onAddToCart(book.id)}/>
                        </li>
                    )
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {
    componentDidMount() {
        /* 1. receive data
           2. dispatch action to store
        const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then((data) => booksLoaded(data))
            .catch((error) => booksError(error));*/
        this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddToCart } = this.props;

        if (loading) { return <Spinner /> }
        if (error) { return <ErrorIndicator />}
        return <BookList books={ books} onAddToCart={onAddToCart} />
    };
}



export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);



//------------------------------  mapDispatchToProps evolution ------------------------------------------
// First generation
/*const mapDispatchToProps = (dispatch) => {
    return{
        booksLoaded: (newBooks) => {
            dispatch({
                type: 'BOOKS_LOADED',
                payload: newBooks
            });
        }
    };
};*/

// Second generation
/*const mapDispatchToProps = (dispatch) => {
    return{
        booksLoaded: (newBooks) => {
            dispatch(booksLoaded(newBooks));
        }
    };
};*/

// Third generation
/*const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        booksLoaded
    }, dispatch);
};*/

// Forth generation
/* mapDispatchToProps = {
    booksLoaded
};*/

//-------------------------------------------------------------------------------------------------------
/*export default withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookList)
);*/



