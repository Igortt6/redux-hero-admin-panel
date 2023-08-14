import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filterLoadingStatus: 'idle',
    activeFilter: 'all',

}
export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filterLoadingStatus = 'loading'
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filterLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {
                state.filterLoadingStatus = 'error'
            })

    }
});


export default filtersSlice.reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilter,
} = filtersSlice.actions;