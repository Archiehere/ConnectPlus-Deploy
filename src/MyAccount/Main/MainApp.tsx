import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../../navbar/navbar";
import "./main.css"
import { useNavigate } from "react-router-dom";
import Loader from '../../loader';
import ExperienceBox from "./components/experience";
import EducationBox from "./components/educationbox";
import TestBox from "./components/test";
import CourseBox from "./components/course";
const edit: string = require("./images/edit.svg").default;
const plus: string = require("./images/plus.svg").default;
const arr: string = require("./images/arrow.svg").default;

const username = sessionStorage.getItem("username") || ""
var accesstoken=localStorage.getItem("accesstoken");
const config ={
    headers:{
      Authorization:`Bearer ${accesstoken}`,
    }
}

const Account = () => {
    const [loading,setLoading]=useState(false);
    const [headline,setheadline]=useState('');
    const [follower,setfollower]=useState(0);
    const [connection,setconnect]=useState(0);
    const [about,setabout] = useState('');
    const [experiences,setexp] = useState([])
    const [education,setedu] = useState([])
    const [skills,setskill] = useState([])
    const [test,settest] = useState([])
    const[course,setcourse] = useState([])

    useEffect(()=>{axios.get("https://linkedin-backend.azurewebsites.net/profile/mainpage/?username="+username,config)
    .then((res)=>{
        console.log(res.data);
        setheadline(res.data.profile.headline)
        setfollower(res.data.followers_count)
        setconnect(res.data.connections_count)
        setabout(res.data.about)
        setexp(res.data.experience_data)
        setedu(res.data.education_data)
        setskill(res.data.skill_data)
        settest(res.data.testscore_data)
        setcourse(res.data.course_data)
    })
    .catch((err)=>{
        console.log(err)
    })
})
        
    const Navhandler = useNavigate();
    const avatar = sessionStorage.getItem("avatar") || ""
    const name = sessionStorage.getItem("name") || ""
    const cover = sessionStorage.getItem("cover") || ""

    return <div>
        <Nav />
        <div id="acc">
        <div id="account_details" >
            <img id="cover_image" src={cover} />
            <div className="acc_icon"><img id="account_avatar" alt="avatar" src={avatar}/>
            <div id="Updateprofile" onClick={() => Navhandler("edit_profile")}><img src={edit} />Update profile</div></div>
            <div style={{display:"flex",justifyContent:"space-evenly",width:"50vw",fontWeight:"700",margin:"1.5vw 0vw"}}>
                <p style={{fontSize:"2.5vw"}}>{name}</p><p style={{fontSize:"1.6vw",alignSelf:"center"}}>{follower} followers</p><p style={{fontSize:"1.6vw",alignSelf:"center"}}>{connection} connections</p>
            </div>
                <p style={{fontSize:"1.4vw",marginLeft:"2vw"}}>{headline}</p>
        </div>
        <div className="acc_box">
        <span>About Me</span>
        <div className="acc_icon"><img style={{marginLeft:"5vw"}} src={edit} onClick={() => Navhandler("aboutme")}/></div>
        <br/><br/>
        {about}
        </div>
        <div className="acc_box">
        <span>Experience</span>
        <div className="acc_icon"><img src={plus} onClick={() => Navhandler("experience")} />
        </div>
        <div>
        {
            experiences.map((box:any)=>{return <ExperienceBox key={box.id} box={box} />})
        }
        </div>
        <pre>Show more Experience       <img src={arr}/></pre>
        </div>
        <div className="acc_box">
        <span>Education</span>
        <div className="acc_icon"><img src={plus} onClick={() => Navhandler("education")}/>
        </div>
        <div>
        {
            education.map((box:any)=>{return <EducationBox key={box.id} box={box} />})
        }
        </div>
        <pre>Show more Education       <img src={arr}/></pre>
        </div>
        <div className="acc_box">
        <span>Skills</span>
        <div className="acc_icon"><img src={plus} onClick={() => Navhandler("skills")}/>
        </div>
        {
            skills.map((box:any)=>{return <div style={{fontWeight: '700',fontSize: '1.5vw',borderBottom:"1px solid white",margin:"2vw 0"}}><p>{box.skill_name}</p></div>})
        }
        <pre onClick={()=> Navhandler('viewskills')}>Show more Skills       <img src={arr}/></pre>
        </div>
        <div className="acc_box">
        <span>Test score</span>
        <div className="acc_icon"><img src={plus} onClick={() => Navhandler("additional/score")}/>
        </div>
        {
            test.map((box:any)=>{return <TestBox key={box.id} box={box}/>})
        }
        <pre>Show more Test       <img src={arr}/></pre>
        </div>
        <div className="acc_box">
        <span>Courses</span>
        <div className="acc_icon"><img src={plus} onClick={() => Navhandler("additional/courses")}/>
        </div>
        {
            course.map((box:any)=>{return <CourseBox key={box.id} box={box}/>})
        }
        <pre>Show more Courses       <img src={arr}/></pre>
        </div>
        </div>
    </div>
}

export default Account;