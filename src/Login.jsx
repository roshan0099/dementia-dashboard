import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/loginDesign_style.css"
import logo from "./imgs/logo-nobg.png"
import Home from "./home";
import supabase from "./authLogin";


export default function Login() {
    const navigate = useNavigate()

    const [profile, setProfile] = useState()

    async function signIn() {

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
    }

    useEffect(() => {

        async function fetchSession() {
            // const session = supabase.auth.session()
            const { data, error } = await supabase.auth.getSession();
            setProfile(data.session?.user)


        }

        fetchSession()

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

            switch (event) {
                case "SIGNED_IN":
                    setProfile(session?.user)
                    break;
                case "SIGNED_OUT":
                    console.log("hai")
                    setProfile(null)
                    break;

                default:
                    console.log("hai")
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])




    //Login design
    function LoginDesign() {


        return (

            <>
                <div className="container text-center center-container">
                    {/* Image at the top */}
                    <img src={logo} alt="Image" className="img-fluid mb-4" style={{ maxHeight: '200px' }} />


                    <button type="button" className="login-with-google-btn" onClick={signIn}>
                        Sign in with Google
                    </button>


                </div>
            </>
        )
    }





    if (profile === undefined || profile === null) {
        return (
            <>
                {<LoginDesign />}
            </>
        )
    } else {
        return (
            navigate("/home")
        )
    }

}