
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Index'
import Contact from './Contact';
import Register from './Register';
import Login from './Login'
import PrivateRoutes from './PrivateRoutes';
import Profile from './Profile'
import Err404 from './Err404'
import PrivateRoute2 from './PrivateRoute2';
import Proposals from './Proposals';
import Dashboard from '../admin/Dashboard';
import AdminLogin from '../admin/AdminLogin';
import AdminRoute from '../admin/AdminRoute';

function App () {


  
    return (
      <div className="App">
        
        
          <BrowserRouter>
          <Routes>

          <Route path="/admin" element={
            <AdminRoute>
              <AdminLogin />
            </AdminRoute>
          } />
          
          <Route path="/" element={
            <PrivateRoute2>
              <Index />
            </PrivateRoute2>
          } />
          <Route path='/login' element={
              <PrivateRoute2>
               <Login />
             </PrivateRoute2>
          } />
          <Route path='/profile' element={
               <PrivateRoutes>
               <Profile />
             </PrivateRoutes>
          } />

          <Route path='/register' element={
              <PrivateRoute2>
               <Register />
             </PrivateRoute2>
          } />

          
          <Route path='/proposals' element={
               <PrivateRoutes>
               <Proposals />
             </PrivateRoutes>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<Err404 />} />
          <Route path="/contact" element={<Contact />} />
          
          </Routes>
          </BrowserRouter>
      </div>
    );
  }
  


export default App;
