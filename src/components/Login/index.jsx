import { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import Cookies from "js-cookie"
import './index.css'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
    const [passwordType, setPasswordType] = useState("password")
    const [errorMsg, setErrorMsg] = useState("")

    const handlePasswordCheckBox = event => {
        if(event.target.checked){
            setPasswordType("text")
        }else{
            setPasswordType("password")
        }
    }

    const token = Cookies.get("jwt_token")

    useEffect(()=>{
        if(token !== undefined){
            navigate("/")
        }
    }, [token])

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues : {
            username : "",
            password : ""
        },
        onSubmit : async values => {
            try {
                //console.log("values", values)
                const {username, password} = values
                const userDetails = {username, password}
                const apiUrl = "https://apis.ccbp.in/login"
                const options = {
                    method : "POST",
                    body : JSON.stringify(userDetails)
                } 
                const response = await fetch(apiUrl, options)
                const data = await response.json()
                //console.log("data", data)
                if(response.ok){
                    Cookies.set("jwt_token", data.jwt_token, {expires:1})
                    navigate("/")
                    formik.resetForm()
                }else{
                    setErrorMsg(data.error_msg)
                }
                
            } catch (error) {
                console.log("errors", error)
            }
            
        },
        validate : values => {
            let errors = {}
            if(!values.username){
                errors.username = "*Require username"
            }
            if(!values.password){
                errors.password = "*Require password"
            }
            return errors
        }
    })

    return(
        <div className='login-bg-container'>
            <form className='login-form-container' autoComplete='off' onSubmit={formik.handleSubmit}>
                <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png' className='login-nxt-watch-logo'/>
                <label htmlFor='username'>USERNAME</label>
                <input id='username' name='username' type='text' className='login-input-feilds' placeholder='UserName' {...formik.getFieldProps("username")}/>
                {formik.errors.username && formik.touched.username ? <p className='login-input-error-msg'> {formik.errors.username}</p> : null}

                <label htmlFor='password'>PASSWORD</label>
                <input id='password' name='password' type={passwordType} className='login-input-feilds' placeholder='Password' {...formik.getFieldProps("password")}/>
                {formik.errors.password && formik.touched.password ? <p className='login-input-error-msg'> {formik.errors.password}</p> : null}

                <div className='showpassword-container'>
                    <input type='checkbox' id='showpassword' onChange={handlePasswordCheckBox}/>
                    <label htmlFor='showpassword'>Show Password</label>
                </div>
                <button className='login-button' type='submit'>Login</button>
                <p className='login-input-error-msg1'>{errorMsg}</p>
            </form>
        </div>
    )
}
export default LogIn