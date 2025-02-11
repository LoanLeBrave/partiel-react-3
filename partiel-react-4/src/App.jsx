import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Tendances from "./components/Tendances.jsx";
import SearchBar from "./components/SearchBar.jsx";
import SeriesTV from "./components/SeriesTV.jsx";

function App() {
    return (
        <>
            <Footer />
            <SearchBar></SearchBar>
            <Tendances></Tendances>
            <SeriesTV></SeriesTV>
        </>
    );
}

export default App;
