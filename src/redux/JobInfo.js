import { createSlice } from "@reduxjs/toolkit";

const savedJob = localStorage.getItem("jobInfo");
const parsedJobs = savedJob ? JSON.parse(savedJob) : null;

const initialState = parsedJobs ||  {

    active:[],
    draft:[],
    closed:[]

}

const JobsSlice = createSlice({
    name:'jobInfo',
    initialState,
    reducers:{

        addActiveJobs:(state,action) =>{

            state.active.push(action.payload);
            localStorage.setItem("jobInfo",JSON.stringify(state))


        },

        addAllActiveJobs:(state,action) =>{

            state.active = action.payload
            localStorage.setItem("jobInfo",JSON.stringify(state))
        },

        addDraftsJobs:(state,action) =>{

            state.draft.push(action.payload);
            localStorage.setItem("jobInfo",JSON.stringify(state))


        },

        removeDraftJobs:(state,action) =>{

            state.draft = state.draft.filter(j => j.id != action.payload.id);
            state.active.push(action.payload);
            localStorage.setItem("jobInfo",JSON.stringify(state))

        },

        addAllDraftJobs:(state,action) =>{

            state.draft = action.payload;
            localStorage.setItem("jobInfo",JSON.stringify(state))

        },

        addClosedJobs:(state,action) =>{

            state.active = state.active.filter((job) => job.id != action.payload.id);

            state.closed.push(action.payload);
            localStorage.setItem("jobInfo",JSON.stringify(state))
        },

        addAllClosedJobs:(state,action) =>{

            state.closed = action.payload;
            localStorage.setItem("jobInfo",JSON.stringify(state))


        },

        addOpenJobs:(state,action) =>{

            state.closed = state.closed.filter((job) => job.id != action.payload.id);

            state.active.push(action.payload);
            localStorage.setItem("jobInfo",JSON.stringify(state))
        },


        addEditedJobs:(state,action) =>{

        state.active = state.active.filter(job => job.id != action.payload.id)

        state.active.push(action.payload);
        localStorage.setItem("jobInfo",JSON.stringify(state))

        },

        clearInfo:(state) =>{

         state.active=[],
         state.draft=[],
         state.closed=[]
        localStorage.setItem("jobInfo",JSON.stringify(state))

        }


       
    }
})

export const {addActiveJobs,addDraftsJobs,removeDraftJobs,addClosedJobs,addOpenJobs,addEditedJobs,addAllActiveJobs,addAllClosedJobs,addAllDraftJobs,clearInfo} = JobsSlice.actions;

export default JobsSlice.reducer;