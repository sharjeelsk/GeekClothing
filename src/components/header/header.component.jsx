import React from 'react'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import "./header.styles.scss"
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors.js'
import {HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from "./header.styles"

const Header = ({currentUser,hidden}) => {
    return (
        <HeaderContainer >
            <LogoContainer to ="/">
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer >
               <OptionLink  to="/shop">
               SHOP
               </OptionLink>
               <OptionLink  to="/shop">
               CONTACT 
               </OptionLink>
               {console.log(currentUser)}
               {
                   currentUser?
                   <OptionDiv onClick={()=>auth.signOut()}>SignOut</OptionDiv>
                   :
                   <OptionLink to="/signIn">SignIn</OptionLink>
               }
               <CartIcon />
            </OptionsContainer>
           {
           hidden?null:
           <CartDropdown />
           }
        </HeaderContainer>
    );
}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header);