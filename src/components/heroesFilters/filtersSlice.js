import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    filterLoadingStatus: 'idle',
    activeFilter: 'all',
})


export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters")
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
                filterAdapter.setAll(state, action.payload)
            })
            .addCase(fetchFilters.rejected, state => {
                state.filterLoadingStatus = 'error'
            })

    }
});

export const { selectAll } = filterAdapter.getSelectors(state => state.filters);

export default filtersSlice.reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilter,
} = filtersSlice.actions;