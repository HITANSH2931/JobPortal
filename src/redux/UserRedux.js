import { createSlice } from '@reduxjs/toolkit';

const savedAuth = localStorage.getItem("auth");
const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;

const initialState = parsedAuth ||  {
  user: null,
  isAuthenticated: false,
  isLogout:false,
  savedJobs:[],
  appliedJobs:[],
  notification:[],
  messages:[],
  isTyping:''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("auth",JSON.stringify(state))
    },
    logout: (state) => {

      state.user =  null,
      state.isAuthenticated = false,
      state.isLogout = false,
      state.savedJobs = [],
      state.appliedJobs=[],
      state.notification=[],
      state.messages = [],
      state.isTyping = ''
      localStorage.setItem("auth",JSON.stringify(state))
    
    },

    disableLogout:(state) =>{

      state.isLogout = true;
      localStorage.setItem("auth",JSON.stringify(state))
    },

    
    enableLogout:(state) =>{

      state.isLogout = false;
      localStorage.setItem("auth",JSON.stringify(state))
    },

    

    saved:(state,action) => {

      state.savedJobs.push(action.payload)
      localStorage.setItem("auth",JSON.stringify(state))
    },

    removeSavedJob:(state,action) =>{

      state.savedJobs = state.savedJobs.filter((j) => j.jobId != action.payload.id)
    },

    savedAll:(state,action) =>{

      state.savedJobs = action.payload;
      localStorage.setItem("auth",JSON.stringify(state))

    },

    applied:(state,action) =>{

      state.appliedJobs.push(action.payload)
      localStorage.setItem("auth",JSON.stringify(state))

    },
    
    appliedAll:(state,action) =>{

      state.appliedJobs = action.payload;
      localStorage.setItem("auth",JSON.stringify(state))

    },

    addNotification:(state,action) =>{

    if(action.payload.action === "Accepted" || action.payload.action === "Rejected" || action.payload.action === "Declined") {

      state.appliedJobs = state.appliedJobs.filter((job) => job.id != action.payload.messageId);
  
   }

      state.notification = [...state.notification,action.payload].sort((a,b) => new Date(b.notificationCreatedAt) - new Date(a.notificationCreatedAt));
      localStorage.setItem("auth",JSON.stringify(state))

    },

    addAllMessages:(state,action) =>{

      state.messages = action.payload;
       localStorage.setItem("auth",JSON.stringify(state))

    },

    addMessages:(state,action) =>{

      state.messages.push(action.payload);
      localStorage.setItem("auth",JSON.stringify(state))

    },

    addTypingMessage:(state,action) =>{

       state.isTyping = action.payload;
       localStorage.setItem("auth",JSON.stringify(state))


    },

    addAllNotifcation:(state,action) =>{

       const notifications = action.payload;

     notifications.forEach((notif) => {
     if (["Accepted", "Rejected", "Declined"].includes(notif.action)) {
      state.appliedJobs = state.appliedJobs.filter(
        (job) => job.id != (notif.messageId)
      );
    }
  });

      state.notification = notifications
      localStorage.setItem("auth",JSON.stringify(state))


    },

    removeNotification:(state,action) =>{

      state.notification = state.notification.filter(n => n.id != action.payload.id);
       localStorage.setItem("auth",JSON.stringify(state))

    }
  },
});

export const { login, logout,disableLogout,enableLogout,removeSavedJob,saved ,applied,addNotification,addMessages,addAllMessages,addAllNotifcation,addTypingMessage,removeNotification,appliedAll,savedAll} = authSlice.actions;

export default authSlice.reducer;
