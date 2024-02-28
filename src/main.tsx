import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppProvider from './context/AppContext.tsx';
import Container from './layouts/Container.tsx';
import Difficulty from './Difficulty.tsx';
import Board from './Board.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Container>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={App} path='/' index />
            <Route Component={Difficulty} path='/difficulty' />
            <Route Component={Board} path='/difficulty/board/:difficulty' />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </Container>
  </React.StrictMode>
);
