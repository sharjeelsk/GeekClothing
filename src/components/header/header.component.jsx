import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import "./header.styles.scss"
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
const Header = ({currentUser,hidden}) => {
    return (
        <div className="header">
            <Link to ="/" className="logo-container">
                <Logo className="logo" />
            </Link>
            <div className="options">
               <Link className="option" to="/shop">
               SHOP
               </Link>
               <Link className="option" to="/shop">
               CONTACT 
               </Link>
               {console.log(currentUser)}
               {
                   currentUser?
                   <div className="option" onClick={()=>auth.signOut()}>SignOut</div>
                   :
                   <Link className="option" to="/signIn">SignIn</Link>
               }
               <CartIcon />
            </div>
           {
           hidden?null:
           <CartDropdown />
           }
        </div>
    );
}

const mapStateToProps=({user:{currentUser}, cart:{hidden}})=>{
    return{
        currentUser,
        hidden
    }
}

export default connect(mapStateToProps)(Header);