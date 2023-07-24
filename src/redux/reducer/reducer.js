import { combineReducers } from "redux";
import { TRANSACTIONS ,TOTAL} from '../actionType'
const app = (state = {}, action) => {

    switch (action.type) {
        case TRANSACTIONS:
            const { transactions } = action;
            return ({ ...state, transactions }); 
        case TOTAL:
            const { total } = action;
            return ({ ...state, total });
        default:
            return state

    }
}
const reducer = combineReducers({
    app
})

export default reducer