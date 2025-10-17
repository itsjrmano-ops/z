import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Library from './pages/Library'
import Reader from './pages/Reader'
import BookDetails from './pages/BookDetails'
import Auth from './pages/Auth'
import './index.css'

function App(){
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1><Link to="/">eLibrary</Link></h1>
          <nav style={{marginLeft:20}}>
            <Link to="/library">Library</Link> {' '}
            <Link to="/auth" style={{marginLeft:8}}>Login</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/library" element={<Library/>} />
            <Route path="/reader/:id" element={<Reader/>} />
            <Route path="/book/:id" element={<BookDetails/>} />
            <Route path="/auth" element={<Auth/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
