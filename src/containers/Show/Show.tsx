import {useParams} from 'react-router-dom';
import {useAppDispath, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import {getShow} from '../Home/homeSlice.ts';

const Show = () => {

    const {id: params} = useParams();
    const dispatch = useAppDispath();
    const {show} = useAppSelector(state => state.shows);

    useEffect(() => {
        if (params) {
            dispatch(getShow(params));
        }
    }, [dispatch, params]);


    return (
        <div>
            <img src={show.image.medium} alt=""/>
            <div>{show.name}</div>
            <div>{show.language}</div>
            <div>{show.premiered}</div>
        </div>
    );
};

export default Show;