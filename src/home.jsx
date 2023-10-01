import { useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import "./style/home_style.css";
import logo from "./imgs/logo-nobg.png"

const URL = import.meta.env.VITE_URL
const KEY = import.meta.env.VITE_KEY
const emailId = import.meta.env.VITE_EMAIL

const supabase = createClient(URL,KEY)
export default function Home() {
    const [user, setUser] = useState()
    const [queryData, usequeryData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        async function getUserDeets() {
            await supabase.auth.getUser()
                .then(profile => {

                    setUser(profile.data.user)
                    


                })


            const { data, error } = await supabase
                .from('customer_info')
                .select("*")
                usequeryData(data)

        }

        getUserDeets()
        
        // setUser(currentUser);
    }, []);

    async function signOutSupa() {
        const { error } = await supabase.auth.signOut()
        setUser(null)
        navigate("/")
    }


    function DisplayTable(){
        // const queryArray = Array.from(queryData)
        // (queryData.length !== 0) && (user?.email === emailId)
        if( (queryData.length !== 0)){

            return(
                <>
                <div className="container mt-5">
                <table className="table">
                <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Place</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                { queryData.map((elm,id) => {
                    return(
                        <tr key={id}>
                        <td>{elm.name}</td>
                        <td>{elm.phone}</td>
                        <td>{elm.email}</td>
                        <td>{elm.place}</td>
                        <td>{elm.message}</td>
                        <td> <button className="btn btn-danger">Delete</button></td>
                        </tr>
                    
                    )

                })}
                </tbody>
                </table>
                </div>
                </>
              
            )
        }else{
            return(
                <>
                Nothing to show
                </>
            )
        }

    }


    function Display() {

        return (
            <>
                {/* <!-- Header --> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        {/* <!-- Logo and Name on the left --> */}
                        <img src={logo} alt="" width="185px" height="60px"></img>


                        {/* <!-- Logout option on the far right --> */}
                        <ul className="navbar-nav ml-auto pointer">
                            <li className="nav-item">
                                <a className="nav-link" onClick={signOutSupa}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* <!-- Body - Table --> */}
               <DisplayTable/>

                {/* <!-- Footer --> */}
                <footer className="bg-dark text-light text-center py-3">
                    &copy; 2023 EaseDementia
                </footer>


            </>
        )
    }


    return (
        <>
            <Display />
        </>
    )
}