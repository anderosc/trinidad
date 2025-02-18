import './App.css'
import { Route, Routes } from "react-router"
import Article from './pages/Article'
import Intro from './pages/Intro'
import Life from './pages/Life'
import List from './pages/List'
import NavBar from './pages/NavBar'

function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/article" element={ <Article /> }/>
        <Route path="/intro" element={ <Intro /> }/>
        <Route path="/life" element={ <Life /> }/>
        <Route path="/list" element={ <List /> }/>

      </Routes>

    </>
  )
}

export default App
