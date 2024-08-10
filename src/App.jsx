import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import OtpPage from "./pages/OtpPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import RequestForm from './pages/RequestForm';

function App() {

  return (
    <>
    
    <BrowserRouter>
       <Routes>
           
           
           <Route path="/" element={<Layout />}>
             <Route index element={<Dashboard />} />
             <Route path="/login" element={<Login />} />
             <Route path="/otp" element={<OtpPage />} />
             <Route path="/request" element={<RequestForm />} />
           </Route>
        </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
