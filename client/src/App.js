import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, json } from 'react-router-dom';

import './App.css';
import { fetchAllQuestion } from './store/slices/questionSlice';
import { setCurrentUser } from './store/slices/currentUserSlice';
import { getAllUsers } from './store/slices/userSlice';
import { fetchWeather } from './api/weather';
import { setTheme } from './store/slices/themeSlice';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Navbar from './component/navbar/Navbar';
import Questions from './pages/questions/Questions';
import AskQuestion from './pages/askQuestion/AskQuestion';
import DisplayQuestion from './pages/questions/DisplayQuestion';
import Tags from './pages/tags/Tags';
import Users from './pages/users/Users';
import UserProfile from './pages/userProfile/UserProfile';
import ChatAi from './component/chatbot/ChatAi';
import Subscription from './pages/subscription/Subscription';
import Cancel from './pages/payment/Cancel';
import Success from './pages/payment/Success';


function App() {

  const [toggleTheme, setToggleTheme] = useState(false)
  const [weather, setWeather] = useState();
  const [hour, setHour] = useState(new Date().getHours())
  const dispatch = useDispatch();
  const authChange = useSelector(state => state.auth.data)
  const theme = useSelector(state => state.theme)

  const changeToggleTheme = (e) => {
    setToggleTheme(e)
  }

  const getlocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const weather = await fetchWeather(latitude, longitude);
        if (weather.main) {
          setWeather(weather.main);
        }
      })
    }
    catch (err) {
      console.error(err);
    }
  }

  // setting theme according to weather or time
  const themeChange = () => {
    switch (weather) {
      case "Thunderstorm":
        return dispatch(setTheme("thunderstorm"));
      case "Rain":
        return dispatch(setTheme("rain"));
      case "Snow":
        return dispatch(setTheme("snow"));
      case "Haze":
        return dispatch(setTheme("haze"));
      default:
        if (hour >= 6 && hour <= 17) {
          dispatch(setTheme("day"))
        } else {
          dispatch(setTheme("night"))
        }
        return;
    }
  }

  //use effect to fetch all the data required
  useEffect(() => {
    //for getting user data from local storage
    try {
      const localData = JSON.parse(localStorage.getItem('Profile'))
      if (localData?.data && localData?.token) {
        dispatch(setCurrentUser(localData))
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(fetchAllQuestion())
    dispatch(getAllUsers())
  }, [authChange, dispatch])

  // useEffect to fetch time
  useEffect(() => {
    const interval = setInterval(() => {
      const getHour = new Date().getHours()
      if (getHour !== hour) {
        console.log("Hour Change");
        setHour(getHour)
      }
    }, 60000)
    return () => clearInterval(interval);
  }, [])

  // use effect to set theme
  useEffect(() => {
    if (!toggleTheme) {
      getlocation()
      themeChange()
    } else {
      dispatch(setTheme(toggleTheme))
    }
  }, [hour, weather, toggleTheme])

  // console.log("weather: ", weather, " theme: ", theme)

  return (
    <>
      <div className={`app theme-app-${theme}`} >
        <Routes>

          <Route to='/' element={<Navbar toggleTheme={changeToggleTheme} />}>
            <Route path='/' index element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/tags' element={<Tags />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserProfile />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='/askquestion' element={<AskQuestion />} />
            <Route path='/questions/:id' element={<DisplayQuestion />} />
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/subscription/success' element={<Success />} />
            <Route path='/subscription/cancel' element={<Cancel />} />
          </Route>

        </Routes>

        <ChatAi />
      </div >
    </>
  );
}

export default App;
