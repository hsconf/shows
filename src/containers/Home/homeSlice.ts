import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {IShow, Show} from '../../types.ts';

export interface HomeState {
    shows: IShow[];
    showName: string;
    show: IShow;
    spinner: boolean;
}

const initialState: HomeState = {
    shows: [],
    showName: '',
    show: {name: '', id: '', image: {medium: ''}, language: '', premiered: ''},
    spinner: false,
};


export const getShows = createAsyncThunk<IShow[], string>(
    'shows/get',
    async (id: string) => {
        try {
            const {data: response} = await axios.get<Show[]>('http://api.tvmaze.com/search/shows?q=csi');
            if (response !== undefined) {
                return  response.filter((tv) => tv.show.name.toLowerCase().startsWith(id.toLowerCase())).map((tv) => {
                    return  {
                        name: tv.show.name,
                        id: tv.show.id,
                    };
                });
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
);

export const getShow = createAsyncThunk<IShow, string>('shows/getSingleShow', async (id: string) => {
    try {
        const {data: res} = await axios.get<IShow>('https://api.tvmaze.com/shows/' + id);
        if (res !== undefined) {
            return {
                name: res.name,
                id: res.id,
                image: res.image,
                language: res.language,
                premiered: res.premiered
            };
        } else {
            return {};
        }
    } catch (e) {
        console.error(e);
        return {};
    }
});


export const showsSlice = createSlice({
    name: 'shows',
    initialState,
    reducers: {
        setShowName: (state, action: PayloadAction<string>) => {
            state.showName = action.payload;
        },
        clearInput: (state) => {
            state.shows = [];
            console.log(state.shows);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getShows.pending, (state) => {
            state.spinner = true;
        }).addCase(getShows.fulfilled, (state, action: PayloadAction<IShow[]>) => {
            state.shows = action.payload;
            state.spinner = false;
        }).addCase(getShows.rejected, () => {

        }).addCase(getShow.fulfilled, (state, {payload}) => {
            state.show = payload;
        }).addCase(getShow.rejected, () => {

        });
    }
});

export const showsReducer = showsSlice.reducer;
export const {setShowName, clearInput} = showsSlice.actions;
