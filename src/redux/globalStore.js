import { combineReducers } from 'redux'
import { Action } from './globalActionType';

const pageState = {
    currentPage: "home",
    loggedIn: false,
    showModal: false,
}

function menuReducer(state = [], action){
    switch (action.type) {
        case Action.MENU.ADD:
            return state = [
                ...state, 
                action.payload
            ]
        case Action.MENU.DELETE:
            const newMenu = state.filter((item) => {
                return item.id !== action.payload
            })
            return state = newMenu
        default:
            return state
    }
}

const tableReducer = (state = [], action) => {
    switch (action.type) {
        case Action.TABLE.ADD:
            return state = [
                ...state, 
                action.payload
            ]
        case Action.TABLE.DELETE:
            const newTable = state.filter((item) => {
                return item.id !== action.payload
            })
            return state = newTable
        default:
            return state
    }
}

const customerReducer = (state = [], action) => {
    switch (action.type) {
        case Action.CUSTOMER.ADD:
            return state = [
                ...state, 
                action.payload
            ]
        case Action.CUSTOMER.DELETE:
            const newCustomers = state.filter((item) => {
                return item.id !== action.payload
            })
            return state = newCustomers
        default:
            return state
    }
}

const pageReducer = (state = pageState, action) => {
    switch (action.type) {
        case Action.PAGE.SET:
            const currentState = {...state}
            return state = {
                ...currentState,
                currentPage: action.payload
            }
        case Action.PAGE.LOGIN: 
            return state = {
                ...state, 
                loggedIn: action.payload
            }    
        case Action.PAGE.SHOWMODAL: 
            return state = {
                ...state, 
                showModal: action.payload
            }
        default:
            return state
    }
}

export default combineReducers({
    page: pageReducer, 
    menus: menuReducer, 
    tables: tableReducer, 
    customers: customerReducer
})