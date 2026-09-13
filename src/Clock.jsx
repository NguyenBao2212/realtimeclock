import { useState, useEffect } from "react"
import {Sun,Bell,Thermometer} from "lucide-react";
import "./Clock.css"
function Clock(){
    const[currentTime, setCurrentTime] =useState(new Date());
    const[time] = useState("--");
    const[temp] = useState("--");
    const[location] = useState("---");

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    },[])
    function formatTime(){
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        if(hours < 10){
            hours = `0${hours}`;
        }
        if(minutes < 10){
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    }
    
    function getGreeting(hour){
        if (hour >= 5 && hour < 12){
            return "Good Morning";
        }else if (hour >= 12 && hour < 18){
            return "Good Afternoon";
        }else{
            return "Good Evening";
        }
    }
    const hour = currentTime.getHours();
    function isNightTime(hour){
        return hour >= 18 || hour < 6;
    }


    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    function formatDate(date){
        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dayOfMonth = date.getDate();
        return `${day}, ${month} ${dayOfMonth}`;
    }


    

    

    return(
        <div className="wrapper">
            <div className ={`clock-frame ${isNightTime(hour) ? "night-mode": "day-mode"}`}>
                <div className="icon-container" >
                    <Bell/>{isNightTime(hour) ? <Sun/> : <Sun/>}
                </div>
                <div className="time-container">
                    <span>{formatTime()}</span>
                </div>
                <div className="right-container">
                    <div className="date-container">
                        <p>{formatDate(currentTime)}</p>
                    </div>
                    <div className="greeting-container">
                        <p>{getGreeting(hour)}</p>
                    </div>
                    <div className="temp-container">
                        <div className="temp-col">
                            <Thermometer />
                        </div>
                        <div className="temp-box">
                            <p>20°C</p>
                            <p>HCM City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Clock