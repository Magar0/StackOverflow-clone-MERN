import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { fetchAllQuestion } from './store/slices/questionSlice';
import { setCurrentUser } from './store/slices/currentUserSlice';
import { getAllUsers } from './store/slices/userSlice';
import './App.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Navbar from './component/navbar/Navbar';
import Questions from './pages/questions/Questions';
import AskQuestion from './pages/askQuestion/AskQuestion';
import DisplayQuestion from './pages/questions/DisplayQuestion';
import Tags from './pages/tags/Tags';
import Users from './pages/users/Users';
import UserProfile from './pages/userProfile/UserProfile';


function App() {

  const dispatch = useDispatch();
  const authChange = useSelector(state => state.auth.data)

  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    dispatch(fetchAllQuestion())
    dispatch(getAllUsers())
  }, [authChange, dispatch])

  return (
    <>
      <div className="app">
        <Routes>

          <Route to='/' element={<Navbar />}>
            <Route path='/' index element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/tags' element={<Tags />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserProfile />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='/askquestion' element={<AskQuestion />} />
            <Route path='/questions/:id' element={<DisplayQuestion />} />
          </Route>

        </Routes>
      </div >
    </>
  );
}

export default App;
