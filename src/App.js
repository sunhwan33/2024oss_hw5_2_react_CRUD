import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './components/ListPage';
import DetailPage from './components/DetailPage';
import CreatePage from './components/CreatePage';
import UpdatePage from './components/UpdatePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/update/:id" element={<UpdatePage />} />
            </Routes>
        </Router>
    );
}

export default App;
