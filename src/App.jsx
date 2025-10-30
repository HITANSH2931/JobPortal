import { Routes,Route } from "react-router-dom"
import Header from "./component/Header"
import Navbar from "./component/Navbar"
import Login from "./component/Login"
import Footer from "./component/Footer"
import SignUp from "./component/SignUp"
import Forgot from "./component/Forgot"
import Otp from "./component/Otp"
import ChangePass from "./component/ChangePass"
import PostJob from "./component/PostJob"
import FindJob from "./component/FindJob"
import SkillJob from "./component/SkillJob"
import JobHistory from "./component/JobHistory/JobHistory"
import ViewJob from "./component/ViewJob"
import Profile from "./component/Profile/Profile"
import Talent from "./component/FindTalent/Talent"
import ProfilePage from "./component/FindTalent/ProfilePage"

import SeeJob from "./component/PostedJob/SeeJob"
import Company from "./component/Company/Company"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Notification from "./Notification"
import Messaging from "./Messaging"
import UnAuthorized from "./UnAuthorized"
import Handler from "./Handler"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import { useSelector } from "react-redux"

function App() {

  const role = useSelector((state) => state.authlogin.user?.role);
  const token = useSelector((state) => state.authlogin.user?.token);

  return (
    <>
      <div className="bg-mine-shaft-950">
      <Navbar/>

     {token &&  <Notification/>}


      <Routes>

        <Route path="/" element={<Header/>}/>

        <Route element={<PublicRoute/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/password" element ={<ChangePass/>}/>
        </Route>   
        
        <Route path="/skillJob" element ={<SkillJob/>}/>

        <Route element={<PrivateRoute/>}>

       {(!role || role == "RECRUITER") && <Route path="/postJob" element={<PostJob/>}/>}
       {(!role || role == "RECRUITER") &&  <Route path="/seeJob" element={<SeeJob/>}/>}

       {(!role || role == "APPLICANT") && <Route path="/findJob" element={<FindJob/>}/>}
       {( !role || role == "APPLICANT") && <Route path="/jobHistory" element={<JobHistory/>}/>}
        
       
        <Route path="/viewJob" element={<ViewJob/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route  path="/talent" element={<Talent/>}/>
        <Route path="/profilePage" element={<ProfilePage/>}/>
       
        <Route path="/company" element={<Company/>}/>
        <Route path="/messaging" element={<Messaging/>}/>  
        
         </Route>

          <Route path="*" element={<UnAuthorized/>}/>
          <Route path="/Oauth2Handler" element={<Handler/>}/>

         
       
       
      </Routes>

      <Footer/>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />

      </div>
    </>
  );
}

export default App
