import Home from './containers/Home/Home.tsx';
import ToolBar from './components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Show from './containers/Show/Show.tsx';

const App = () => {
    return (
        <>
            <header>
                <ToolBar />
            </header>
            <main className="container">
                <Routes>
                    <Route path='/' element={<Home />}>
                        <Route path='show/:id' element={<Show />} />
                    </Route>
                </Routes>
            </main>
        </>
    );
};

export default App;
