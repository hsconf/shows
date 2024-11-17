
const App = () => {
    
    const data = async () => {
        const response = await fetch('http://api.tvmaze.com/search/shows?q=csi');
        const data = await response.json();
        console.log(data);
    }

    data()

    return (
        <>

        </>
    );
};

export default App;