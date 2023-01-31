import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home';
import ReceipeDetails from './pages/recipe-details';
import Header from './layouts/header';
import Footer from './layouts/footer';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:uuid/" element={<ReceipeDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App;
