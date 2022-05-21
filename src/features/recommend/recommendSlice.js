import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recommendAPI from "../../api/recommendAPI";

export const getRecommendRelateProduct = createAsyncThunk("recom/getRecommendRelateProduct",
    async (reqBody) => {
        const response = await recommendAPI.recommendRelateItem(reqBody);
        return response;
    });

export const getRecommendedProductsByBehavior = createAsyncThunk("recom/getRecommendedProductsByBehavior",
    async () => {
        const response = await recommendAPI.recommendByBehavior();
        return response;
    });

const initialState = {
    recommendByBehaviorList: [],
    loading: false,
    error: null,
}
export const recommendSlice = createSlice({
    name: "recommend",
    initialState,
    reducers: {
        resetRecommendSlice: () => initialState,
    },
    extraReducers: {
        [getRecommendedProductsByBehavior.pending]: (state) => {
            state.loading = true;
        },
        [getRecommendedProductsByBehavior.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getRecommendedProductsByBehavior.fulfilled]: (state, action) => {
            state.loading = false;
            state.recommendByBehaviorList = action.payload.data.products;
        }
    }
})

export const { resetRecommendSlice } = recommendSlice.actions;
export default recommendSlice.reducer;