import React from 'react'
import axios from 'axios';
import {  useDispatch, useSelector } from 'react-redux'
import { appliedAll, savedAll } from '../redux/UserRedux';
import { addAllActiveJobs, addAllClosedJobs, addAllDraftJobs } from '../redux/JobInfo';
import { addProfileInformation } from '../redux/Profile';
import { getContrastColor } from '@mantine/core';

const RetrieveInformation = () => {
    
    const dispatch = useDispatch();
    const getAppliedJobs = async (token) =>{

        try{

            const response = await axios.get("http://localhost:8080/getAppliedJobs",{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            dispatch(appliedAll(response.data))       
        }

        catch(error){

            console.log(error);
        }
    }

     const getSavedJobs = async (token) =>{

        try{

            const response = await axios.get("http://localhost:8080/getSavedJobs",{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            dispatch(savedAll(response.data))
            
        }

        catch(error){

            console.log(error);
        }
    }

     const getPostedJobs = async (token) =>{

        try{

            const response = await axios.get("http://localhost:8080/getPostJobs",{

                headers:{
                    Authorization:`Bearer ${token}`
                }

            })

            dispatch(addAllActiveJobs(response.data))
            
        }

        catch(error){

            console.log(error);
        }
    }

     const getDraftJobs = async (token) =>{

        try{

            const response = await axios.get("http://localhost:8080/getDraftJobs",{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            dispatch(addAllDraftJobs(response.data))
            
        }

        catch(error){

            console.log(error);
        }
    }

     const getClosedJobs = async (token) =>{

        try{

            const response = await axios.get("http://localhost:8080/getClosedJobs",{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            dispatch(addAllClosedJobs(response.data))
            
        }

        catch(error){

            console.log(error);
        }
    }

    const getProfileInfo = async (token) => {

        try{

        const response = await axios.get("http://localhost:8080/getProfileInfo",{

            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        console.log("profile",response.data)
        dispatch(addProfileInformation(response.data));

    }

    catch(error){

        console.log(error);
    }
}

  return {getAppliedJobs,getSavedJobs,getClosedJobs,getDraftJobs,getPostedJobs,getProfileInfo}


}


export default RetrieveInformation
