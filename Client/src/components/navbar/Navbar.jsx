import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import './Navbar.scss'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logOut } from '../../authContext/AuthAction';

const Navbar = () => {
    const [isScrolled, setisScrolled]=useState(false);
    const { user } = useContext(AuthContext);

    const {dispatch}=useContext(AuthContext);

    // console.log(window.pageYOffset) -> this give the value of y-axis 
    window.onscroll=()=>{
        setisScrolled(window.pageYOffset===0 ? false : true)
        return ()=>(window.onscroll=null)
    }

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar' }>
        <div className="container">
            <div className="left">
                <img 
                // src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                src='./logo.png'
                alt="" />

                
                <Link to="/" className='link'>
                <span>Homepage</span> 
                </Link>
                
                <Link to="/series" className='link'>
                <span>Series</span>
                </Link>

                <Link to="/movies" className='link'>
                <span>Movies</span>
                </Link>

                <Link to="/series" className='link'>
                <span>New and Popular</span>
                </Link>

                <Link to="/series" className='link'>
                <span>My list</span>
                </Link>
            </div>
            <div className="right">
                <Search className='icon'/>
                <span>Kid</span>
                <Notifications className='icon'/>
                {user ? (<img src={user.profilePic} /> ) : (
                <img src="data:image/jpeg;base64,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" alt=""/>
                )}
                <div className="profile">
                <ArrowDropDown className='icon'/>
                <div className="options">
                    <span>Setting</span>
                    <span onClick={()=>dispatch(logOut())}>Logout</span>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
