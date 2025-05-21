import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to LinkedCraft</h1>
      </div>} />
    </Routes>
  )
}

export default App