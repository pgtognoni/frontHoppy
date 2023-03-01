import Sidebar from './components/Sidebar'
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
    </div>
  )
}

export default App
