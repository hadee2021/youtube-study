import './App.css'
import { Routes, Route } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Start from './pages/Start'
import Room from './pages/Room'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Start />}/>
        <Route path="/room/:id" element={<Room />}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
