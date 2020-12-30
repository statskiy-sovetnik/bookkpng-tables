import React from 'react';
import actionTypes from "../../actionTypes";

export default function loadDataBaseIncomes(rows) {
    return {
        type: actionTypes.LOAD_DATA_BASE_INCOMES,
        value: rows,
    }
}