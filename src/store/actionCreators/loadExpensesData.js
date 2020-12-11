import React from 'react';
import actionTypes from "../actionTypes";

export default function loadExpensesData(expenses_obj) {
    return {
        type: actionTypes.LOAD_EXPENSES_DATA,
        value: expenses_obj,
    }
}