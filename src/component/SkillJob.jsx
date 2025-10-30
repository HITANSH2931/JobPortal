import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function SkillJob({skills,setSkills,setSkillError}) {
  const [inputValue, setInputValue] = useState("");
  
  const handleKeyDown  = (e) =>{

    const value = e.target.value.trim();

    if(e.code == "Enter" && value){

    e.preventDefault();

    setSkills([...skills,value]);
    setInputValue("");
    setSkillError('')

    }
      
  }

  const handleRemoveSkill = (skill) =>{

    const newSkill = skills.filter(ele => ele != skill)

    setSkills([...newSkill])


  }

  
  return (

      <>
     
      <h1 className="text-mine-shaft-50 text-lg font-bold ">Skills</h1>

      <div className="flex flex-wrap gap-3 border border-solid border-mine-shaft-800  px-2 py-3 rounded-lg text-[14px] w-full">

        {skills?.map((skill,index) => (

          <div className="bg-bright-sun-600 inline-flex items-center  px-2.5 gap-2 rounded-2xl">

          <p className="text-mine-shaft-100">{skill}</p>

          <FontAwesomeIcon onClick={() => handleRemoveSkill(skill)} icon={faXmark} className="text-mine-shaft-100"/>

          </div>

        ))}

        <input  type="text" value={inputValue} placeholder="Type and press Enter" onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} className=" ml-2 mt-2 text-mine-shaft-100 focus:outline-none"/>


      </div>

      </>

   
 
     
  )
}

export default SkillJob;
