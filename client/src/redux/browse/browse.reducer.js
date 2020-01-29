import browseActionTypes from "./browse.types.js"; 

const INITIAL_STATE = {
    items:[],
    priceRange:[],
    searchString:"",
    sortBy:"",
    isAsc:"true",
    isFetching:false, 
    fetchError:"",
    numberOfItems:"",
    isFeatured:false, 
    categories:[],
    currentItem:null,
};

const browseReducer = (state = INITIAL_STATE, action) => {
    const {type, payLoad} = action; 

    switch(type)
        {
            case browseActionTypes.FETCH_ITEMS_START:
                    return {...state, isFetching:true };
            case browseActionTypes.FETCH_ITEMS_FAILURE:
                    return {...state, isFetching:false, fetchError:payLoad};
            case browseActionTypes.FETCH_ITEMS_SUCCESS:
                    const {items, searchString, price , priceRange, sortBy, categories, isFeatured} = payLoad;
                    const numberOfItems = items.length.toString(); 
                    return {...state, isFetching:false, items, searchString, priceRange, sortBy, numberOfItems, categories, isFeatured}; 
            case browseActionTypes.SET_CURRENT_ITEM:
                     return {...state, currentItem:payLoad}                               
            default:
                    return state; 
        }

}

export default browseReducer; 
