import React from 'react';
import actionTypes from "../actionTypes";

export default function loadDataBaseJournal(rows) {
    return {
        type: actionTypes.LOAD_DATA_BASE_JOURNAL,
        value: rows,
    }
}