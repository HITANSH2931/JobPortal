import { createSlice } from "@reduxjs/toolkit";

const savedProfile = localStorage.getItem("profile");
const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;

const initialState = parsedProfile ||  {

    profileInfo:{
        jobTitle:'',
        company:'',
        location:'',
        exp:''
       
    },

    
    about:'',
    skills:[],
    experienceList: [],
    certificateList: []

}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{


        addProfileInformation:(state,action) =>{
           
         state.profileInfo.jobTitle = action.payload?.jobTitle || '';
        state.profileInfo.company = action.payload?.company || '';
        state.profileInfo.location = action.payload?.location || '';
        state.profileInfo.exp = action.payload?.experience || '';

        state.about = action.payload?.about || '';
        state.skills = action.payload?.skills || [];
        state.experienceList = action.payload?.exp || [];
        state.certificateList = action.payload?.certificates || [];

        localStorage.setItem("profile",JSON.stringify(state))


        },

        addProfileInfo:(state,action) =>{

            state.profileInfo.jobTitle = action.payload.jobTitle
            state.profileInfo.company = action.payload.company
            state.profileInfo.location = action.payload.location
            state.profileInfo.exp = action.payload.exp


            localStorage.setItem("profile",JSON.stringify(state))
        },

        addAbout:(state,action) => {

            state.about = action.payload;
            localStorage.setItem("profile",JSON.stringify(state))
        },

        addSkills:(state,action) =>{

            state.skills = action.payload
            localStorage.setItem("profile",JSON.stringify(state));

        },

        removeSkills:(state,action)=>{

            state.skills = state.skills.filter((skill) => skill != action.payload)
            localStorage.setItem("profile",JSON.stringify(state));


        },

        addExperience : (state,action) => {

            state.experienceList.push(action.payload)
            localStorage.setItem("profile",JSON.stringify(state))
        },

        updateExperience : (state,action) =>{

            state.experienceList = state.experienceList.filter((exp) => exp.id != action.payload.id);
            state.experienceList.push(action.payload);
            localStorage.setItem("profile",JSON.stringify(state))

        },

        deleteExperience:(state,action) =>{

            state.experienceList = state.experienceList.filter((exp) => exp.id != action.payload.id);    
            localStorage.setItem("profile",JSON.stringify(state))
        },

        addCertificate : (state,action) =>{

            state.certificateList.push(action.payload);
            localStorage.setItem("profile",JSON.stringify(state))
        },

        updateCertificate : (state,action) =>{

            state.certificateList = state.certificateList.filter((cer) => cer.id != action.payload.id);
            state.certificateList.push(action.payload);
            localStorage.setItem("profile",JSON.stringify(state))
        },

        deleteCertificate : (state,action)=>{

            state.certificateList = state.certificateList.filter((cer) => cer.id != action.payload.id);
            localStorage.setItem("profile",JSON.stringify(state))
        },

        clearProfile:(state) =>{

             state.profileInfo = { jobTitle: '', company: '', location: '', exp: '' };
             state.about = '';
             state.skills = [];
             state.experienceList = [];
             state.certificateList = [];
             localStorage.setItem("profile",JSON.stringify(state))


        }

    }
})

export const { addProfileInfo,addAbout,addSkills,removeSkills, addExperience,updateExperience,deleteExperience,
    addCertificate,updateCertificate,deleteCertificate,clearProfile,addProfileInformation} = profileSlice.actions;

export default profileSlice.reducer;