import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import BookstoreService from "./services/bookstore-service";
import { BookstoreServiceProvider } from "./components/bookstore-service-context";
import {HomePage, CartPage} from "./components/pages";
import store from "./store";

const bookstoreService = new BookstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BookstoreServiceProvider value={bookstoreService}>
                <Router>
                    <App />
                </Router>
            </BookstoreServiceProvider>
        </ErrorBoundry>
    </Provider>,
  document.getElementById('root')
);