import React from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';

function Userprofile() {

    let { userObj } = useSelector(state => state.user)


    //make authorixed req for a private route
    const getTest = async () => {
        //get token
        let token = localStorage.getItem("token")
        //add token to header of request object & make api call
        let res = await axios.get("http://localhost:5000/user/private", {
            headers: {
                authorization: token
            }
        })

        let data = res.data;
        console.log("data is ", data);
    }

    return (
        <div>
            <h4 className='text-end text-success'>Welcome,{userObj.username}</h4>
            <button className="btn btn-warning d-block mx-auto mt-5" onClick={getTest}>
                Get private info
            </button>
        </div>
    )
}

export default Userprofile;
