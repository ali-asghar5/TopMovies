import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import MovieList from "../movie/MovieList";
import MovieAdd from "../movie/MovieAdd";
import MovieDetail from "../movie/MovieDetail";
import MovieEdit from "../movie/MovieEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header subtitle="Providing top trending movies across the globe." />
        <Routes>
          <Route path="/" element={<MovieList />}></Route>
          <Route path='/movie/:id' element={<MovieDetail />}></Route>
          <Route path='/movie/add' element={<MovieAdd />}></Route>
          <Route path='/movie/edit/:id' element={<MovieEdit />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
