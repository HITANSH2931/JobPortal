
import { configureStore } from '@reduxjs/toolkit';
import UserRedux from './UserRedux'
import Profile from './Profile'
import JobInfo from './JobInfo'

const store = configureStore({
  reducer: {
    authlogin: UserRedux, 
    profile:Profile,
    info:JobInfo,
    
  },
});

export default store;
