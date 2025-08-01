import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { userDataContext } from '../context/UserContext';

const initial = {
  email: '',
  password: ''
}

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const {setUserDataLocal} = useContext(userDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let response = await axios.post(serverUrl + "/api/v1/users/login", userData, { withCredentials: true })
      setErr("");
      setLoading(false);
      setUserData(initial);
      setUserDataLocal(response.data);
      navigate("/")
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start gap-[10px]'>
      <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex item-center'>
        <img className="image-content h-[30px]  lazy-load" alt="" src="https://content.linkedin.com/content/dam/me/business/en-us/amp/xbu/linkedin-revised-brand-guidelines/linkedin-logo/fg/brandg-linkedinlogo-hero-logo-dsk-v01.png.original.png"></img>
      </div>
      <form onSubmit={handleSignIn} className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center p-[15px] gap-[10px]'>
        <h1 className='text-gray-800 text-[30px] font-semibold m-[30px]'>Sign In</h1>
        <input type="email" name="email"
          placeholder="email"
          value={userData.email}
          onChange={handleChange} required className='w-[100%] h-[50px] border-2 border-gray-400 p-[5px] text-gray-800 text-[18px] px-[18px] py-[18px] rounded-md' />
        <div className='w-[100%] h-[50px] border-2 border-gray-400  text-gray-800 text-[18px] rounded-md relative'>
          <input type={showPassword ? "text" : "password"} name="password"
            placeholder="password"
            value={userData.password}
            onChange={handleChange} required className='w-full h-full border-none text-gray-800 text-[18px] px-[18px] py-[18px] rounded-md' />
          <span onClick={() => setShowPassword(!showPassword)} className='absolute right-[15px] top-[8px] text-[#1C78AA] cursor-pointer'>{showPassword ? "hide" : "show"}</span>
        </div>
        {err && <p className='text-center text-red-400'>
          {err}
        </p>}
        <button className='w-[100%] h-[50px] rounded-full bg-[#1C78AA] mt-[30px] text-white mt-[40px]'>{loading ? "loading..." : "Log In"}</button>
        <p className='text-center'>Don't have an account ? <span className='text-[#1C78AA] cursor-pointer' onClick={() => navigate("/signup")}>Sign Up</span></p>
      </form>
    </div>
  )
}

export default Login