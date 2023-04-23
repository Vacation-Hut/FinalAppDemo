
import {React ,useState,useEffect} from "react"




async function Selectuser(id) {
    const [data, setData] = useState([]);
const [activity, setActivity] = useState([]);
  const [activityname,setActivityName]=useState()
  const [description,setDiscription]=useState()
  const [food,setFood]=useState()
  const [accomadation,setAccomadation]=useState()

    fetch("http://localhost:5000/allactivity", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    window.location.href = `/dash/activity/${id}/update`;
    setActivityName(data[0].activityname)
    setDiscription(data[0].description)
    setFood(data[0].food)
    setAccomadation(data[0].accomadation)}
export default Selectuser