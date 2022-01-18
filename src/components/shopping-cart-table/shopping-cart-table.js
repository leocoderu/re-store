import React from "react";
import {connect} from "react-redux";
import './shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
    const renderRow = (item, idx) => {
        const { id, title, count, total} = item;
        return(
            <tr key={id}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>${total}</td>
                <td>
                    <button className="btn btn-outline-success btn-sm"
                            onClick={() => onIncrease(id)}>
                        <i className="fa fa-plus-circle" />
                    </button>
                    <button className="btn btn-outline-warning btn-sm"
                            onClick={() => onDecrease(id)}>
                        <i className="fa fa-minus-circle" />
                    </button>
                    <button className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelete(id)}>
                        <i className="fa fa-trash-o" />
                    </button>
                </td>
            </tr>
        )
    };

    return(
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Item</td>
                        <td>Count</td>
                        <td>Total</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    { items.map(renderRow) }
                </tbody>
            </table>
            <div className="total">
                Total: ${total}
            </div>
        </div>
    );
};

const mapStateToProps = ({ cartItems, orderTotal }) => {
    return {
        items: cartItems,
        total: orderTotal
    };
};

const mapDispatchToProps = () => {
    return {
        onIncrease: (id) => {
            console.log(`Increase ${id}`);
        },
        onDecrease: (id) => {
            console.log(`Decrease ${id}`);
        },
        onDelete: (id) => {
            console.log(`Delete ${id}`);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);