import {useAppDispath, useAppSelector} from '../../app/hooks.ts';
import {clearInput, getShows, setShowName} from './homeSlice.ts';
import * as React from 'react';
import {Link, Outlet} from 'react-router-dom';
import Loader from '../../components/Loader/Loader.tsx';


const Home = () => {
    const dispatch = useAppDispath();
    const {shows, showName, spinner} = useAppSelector(state => state.shows);

    const onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    if (spinner) {
        return <Loader />;
    }

    return (
        <div>
            <div className='mt-5'>
                <form className='w-50 d-flex gap-1 mx-auto align-items-center position-relative' onSubmit={onFormSubmit}>
                    <input type="text" placeholder='Enter show name!' className='form-control' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(setShowName(e.target.value)); dispatch(getShows(e.target.value));}} value={showName} />
                    {
                        shows.length > 0 ? (
                            <div className='position-absolute card p-2' style={{top: 50, width: '75%'}}>
                                {shows.map(show => (
                                    <Link to={`show/${show.id}`} onClick={() => {dispatch(setShowName(show.name)); dispatch(clearInput());}} className='d-block text-dark text-decoration-none' key={show.id}>{show.name}</Link>
                                ))}
                            </div>
                        ) : null
                    }
                    <button className='btn btn-primary'>Search</button>
                </form>
            </div>
            <div className="" style={{marginTop: 100}}>
                <Outlet />
            </div>
        </div>
    );
};

export default Home;