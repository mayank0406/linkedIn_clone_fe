import linkdinlogo from '../assets/pngwing.com.png'
import { IoSearchSharp } from "react-icons/io5";
import { HiMiniHome } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import profilelogo from '../assets/profileuser.webp'
import { useContext, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    let [activeSearch, setActiveSearch] = useState(false);
    const { userData, setUserDataLocal } = useContext(userDataContext);
    const { serverUrl } = useContext(authDataContext);
    const [togglePopUp, setTogglePopUp] = useState(false);
    let navigate = useNavigate();

    const handleLogOut = () => {
        try {
            let response = axios.get(serverUrl + "/api/v1/users/logout", { withCredentials: true });
            setUserDataLocal(null);
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-[60px] bg-[white] fixed top-0 shadow-lg flex align-center justify-between md:justify-around px-[5px]'>
            <div className='flex justify-center items-center gap-[10px]'>
                <div className='m-[10px]' onClick={() => setActiveSearch(false)}>
                    <img className='w-[50px] ' src={linkdinlogo} alt="logo" />
                </div>
                {!activeSearch && (<div>
                    <IoSearchSharp className='w-[23px] h-[23px] text-gray-600 lg:hidden' onClick={() => setActiveSearch(true)} />
                </div>)}
                <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${!activeSearch ? "hidden" : ""}  lg:flex`}>
                    <div>
                        <IoSearchSharp className='w-[23px] h-[23px] text-gray-600' />
                    </div>
                    <input type="text" placeholder='Search' className=' w-[80px] h-full bg-transparent border-0 outline-none' />
                </form>

            </div>
            <div className='flex justify-center items-center gap-[25px] relative'>
                {togglePopUp && <div className='w-[300px] h-[320px] bg-[white] shadow-lg absolute top-[70px] rounded-md bottom-20 p-[5px] gap-[20px]'>
                    <div className='flex justify-around'>
                        <div className='w-[100px] h-[100px] rounded-full overflow-hidden '>
                            <img className='w-full h-full' src={profilelogo} alt="logo" />
                        </div>
                        <div className='text-[18px] font-semibold text-gray-700 mt-[35px] mr-[30px]'>
                            {`${userData.user?.firstName} ${userData.user?.lastName}`}
                        </div>
                    </div>
                    <button className='h-[40px] w-[250px] rounded-full border-[2px] mx-[20px] mt-[10px] flex items-center justify-center hover:bg-[#F5F5F5]'>View Profile</button>
                    <div className='w-full h-[2px] bg-[#F5F5F5] shadow-lg my-[10px] '></div>
                    <div className='flex items-center ml-[35px]'>
                        <BsFillPeopleFill className='w-[32px] h-[32px] text-gray-600 ' />
                        <div className='text-[18px] font-semibold text-gray-700 ml-[20px]'>Network</div>
                    </div>
                    {/* <button className='h-[40px] w-[250px] rounded-full border-[2px] mx-[20px] mt-[5px] flex items-center justify-center hover:bg-[#F5F5F5]'>View Profile</button> */}
                    <div className='w-full h-[2px] bg-[#F5F5F5] my-[20px] '></div>

                    <button className='h-[30px] w-[250px] rounded-full border-[2px] mx-[20px] mt-[5px]  flex items-center justify-center hover:border-[#F5F5F5] hover:bg-[#F5F5F5]' onClick={handleLogOut}>Sign Out</button>
                </div>}
                <div className='lg:flex flex-col items-center justify-center hidden'>
                    <HiMiniHome className='w-[23px] h-[23px] text-gray-600' />
                    <div>Home</div>
                </div>
                <div className='lg:flex flex-col items-center justify-center hidden'>
                    <BsFillPeopleFill className='w-[23px] h-[23px] text-gray-600' />
                    <div>Network</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <IoMdNotifications className='w-[23px] h-[23px] text-gray-600' />
                    <div className='hidden md:block'>Notification</div>
                </div>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer'>
                    <img className='w-full h-full' src={profilelogo} alt="" onClick={() => setTogglePopUp(!togglePopUp)} />
                </div>
            </div>
        </div>
    )
}

export default Navbar