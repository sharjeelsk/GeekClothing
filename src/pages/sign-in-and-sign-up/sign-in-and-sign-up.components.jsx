import React from 'react'

import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up-component/sign-up.component'
import "./sign-in-and-signup.styles.scss"

const SignInAndSignUpPage = () => {
    return (
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    );
}

export default SignInAndSignUpPage;