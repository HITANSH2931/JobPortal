import { faEdit, faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkills, removeSkills } from "../../redux/Profile";
import axios from "axios";
import BASE_URL from './config';

function SkillJob() {

  const [inputValue, setInputValue] = useState("");
  
  const skillsRedux = useSelector((state) => state.profile.skills)
  const[skills,setSkills] = useState(skillsRedux);
  const[edit,setEdit] = useState(false);


  const token = useSelector((state) => state.authlogin.user.token);

  const dispatch = useDispatch();
  
  const handleKeyDown  = (e) =>{

    const value = e.target.value.trim();

    if(e.code == "Enter" && value && !skills.some((skill) => skill.toLowerCase() == value.toLowerCase())){
    
    setSkills([...skills,value]);
    setInputValue("");
  
    }

    else if(skills.some((skill) => skill.toLowerCase() == value.toLowerCase())) setInputValue("")
      
  }

  const handleRemoveSkill = (skill) =>{

    const newSkill = skills.filter(ele => ele != skill)
    
    setSkills([...newSkill])

  }

  const handleSave = async () => {

     const response =  await axios.post(`${BASE_URL}/addSkills`,{
      skills:skills
     },{

      headers:{
        Authorization:`Bearer ${token}`
      }
     })


     dispatch(addSkills(skills))
     setEdit(false)
  }

  const handleCancel = () =>{

     setEdit(false);
     setInputValue("")
     setSkills(skillsRedux);
  }

  
  return (

      <div className="flex flex-col gap-2 mt-10">
      
      <div className="flex justify-between mb-1">
      <h1 className="text-mine-shaft-50 text-lg font-bold ">Skills</h1>

      {!edit ?       
      (<FontAwesomeIcon icon={faEdit} onClick={() => setEdit(!edit)} className="text-bright-sun-400 text-xl"/>) :
      (<FontAwesomeIcon icon={faFloppyDisk} onClick={() => setEdit(!edit)} className="text-bright-sun-400 text-xl"/>)
      }

      </div>

      <div className="flex flex-wrap gap-3 border border-solid border-mine-shaft-800  px-2 py-3 rounded-lg text-[14px] w-full">

        {skills?.map((skill,index) => (

          <div className="bg-bright-sun-600 inline-flex items-center  px-2.5 gap-2 rounded-2xl">

          <p className="text-mine-shaft-100">{skill}</p>

          {edit && <FontAwesomeIcon onClick={() => handleRemoveSkill(skill)} icon={faXmark} className="text-mine-shaft-100"/>}

          </div>

        ))}

        <input  type="text" disabled={!edit} value={inputValue} placeholder="Type and press Enter" onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} className=" ml-2 mt-2 text-mine-shaft-100 focus:outline-none"/>
        

      </div>

        
         {edit && <div className="text-[14px] flex gap-2.5">
            
           <button onClick={() => handleSave()} className='text-bright-sun-400 bg-mine-shaft-800 rounded-lg px-3.5 py-1.5 mt-3.5 hover:bg-mine-shaft-900 hover:text-bright-sun-500'>Save</button>
           <button onClick={() => handleCancel()} className='text-red-500  bg-mine-shaft-800 rounded-lg px-3.5 py-1.5 mt-3.5 hover:bg-mine-shaft-900 hover:text-red-600'>Cancel</button>
       

          </div>}

       

      </div>

   
 
     
  )
}

export default SkillJob;
