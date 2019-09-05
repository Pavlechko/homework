const initialState = {
    isLoading: false,
    items: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return {
                ...state,
                items: action.payload,
                isLoading: true,
            };
            case 'SET_IS_LOADING':
                return {
                    ...state,
                    isLoading: action.payload
                };
        // case 'ADD_BOOKS':
        //     return {
        //         books: [
        //             ...state.books,
        //             action.payload
        //         ]
        //     };
        default:
            return state;
    };
}
