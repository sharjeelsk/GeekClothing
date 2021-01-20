import React from 'react';
import './App.css';
import {HomePage} from './pages/homepage/homepage.component'
import {Switch, Route,Redirect} from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components'
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
class App extends React.Component {

 unsubscribeFromAuth = null
  componentDidMount(){
    const {setCurrentUser} = this.props
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{ //on auth state change gives current signed in user to firebases create user profile function
    
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth)
      userRef.onSnapshot(snapshot=>{
      setCurrentUser({
        id:snapshot.id,
        ...snapshot.data()
      })
      })
    }
    
    setCurrentUser(userAuth)
    })
  }
componentWillUnmount(){
  this.unsubscribeFromAuth()
}
 render() {
   return (
    <div >
      <Header />
      <Switch>
     <Route exact={true} path="/" component={HomePage} />
     <Route path="/shop" component={ShopPage} />
     <Route exact path="/signin" render={()=>this.props.currentUser?(<Redirect to="/" />):(<SignInAndSignUpPage />)} />
     </Switch>
    </div>
  );
}
}

const mapStateToProps=({user})=>{
  return{
    currentUser:user.currentUser
  }
}

const mapDispatchToProps = (dispatch)=>{
return{
  setCurrentUser:user=>dispatch(setCurrentUser(user))
}
}

export default connect(mapStateToProps,mapDispatchToProps )(App); //1arg is mapstate to pros and second is 
