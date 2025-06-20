import { useState, useEffect, useRef } from "react";
import React from 'react';
import "./LoginModal.css";
import axios from "axios";
import { apiList } from "../../services/apilist";
import Cookies from "js-cookie";

export default function LoginModal({ loginBtn, setLoginBtn, closeLoginModal,setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setErrorMsg(''); // Clear error message on input change
    };

    useEffect(() => {
        if (loginBtn) {
            // Save the currently focused element before opening the modal
            previousActiveElement.current = document.activeElement;
            // Set focus to the modal when it opens
            modalRef.current?.focus();
        } else if (previousActiveElement.current) {
            // Restore focus to the previously focused element after closing the modal
            previousActiveElement.current.focus();
        }
        // Clear error message when modal opens or fields change
        setErrorMsg('');
    }, [loginBtn]);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (loginBtn === 'login') {
            if (email && password) {
                try {
                    const response = await axios.post(apiList.login, { email, password });
                    Cookies.set("authToken", response.data.token);
                    setErrorMsg("Login Successful");
                    setIsLoggedIn(true);
                    closeLoginModal();
                    // Clear input values

                } catch (error) {
                    const message = error.response?.data?.message || 'Login failed. Please try again.';
                    setErrorMsg(message);
                }
            } else {
                setErrorMsg('Please fill in all required fields.');
            }
        }
        else {
            if (firstName && lastName && email && password) {
                if (password.length >= 5 && password.length <= 8) {
                    try {
                        await axios.post(apiList.signup, { email, password, firstName, lastName });
                        setErrorMsg('Registered successfully');
                        setLoginBtn('login');
                        // Clear input values
                    } catch (error) {
                        const message = error.response?.data?.message || 'Registration failed. Please try again.';
                        setErrorMsg(message);
                    }
                } else {
                    setErrorMsg('Password should be between 5 and 8 characters long.');
                }
            } else {
                setErrorMsg('Please fill in all required fields.');
            }
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        }
        setEmail('');
        setPassword('');
    };


    const renderInput = (type, id, value, setValue, placeholder, label) => (
        <>
            <label className='label login' htmlFor={id}>
                {label} <sup className="astrik">*</sup>
            </label><br />
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className='user-input'
                value={value}
                onChange={handleInputChange(setValue)}
            />
        </>
    );

    return (
        <div className={`modal ${loginBtn ? 'modal-show' : 'modal-hide'}`} ref={modalRef} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="close" onClick={closeLoginModal} aria-label="Close">&times;</button>
                    <div className="btn-container">
                        <button
                            className={loginBtn === 'login' ? 'login-button' : "login-button btn-off"}
                            onClick={() => setLoginBtn('login')}
                        >
                            Login
                        </button>
                        <button
                            className={loginBtn === 'Register' ? 'login-button' : "login-button btn-off"}
                            onClick={() => setLoginBtn('Register')}
                        >
                            Register
                        </button>
                    </div>
                    <form className='form-container' onSubmit={onSubmitForm}>
                        {loginBtn === 'Register' && (
                            <>
                                <div className='input-container'>{renderInput('text', 'fistname', firstName, setFirstName, 'First Name', 'First Name')}</div>
                                <div className='input-container'>{renderInput('text', 'lastname', lastName, setLastName, 'Last Name', 'Last Name')}</div>
                            </>
                        )}
                        <div className='input-container'>{renderInput('text', 'email', email, setEmail, 'Enter Address', 'Email Address')}</div>
                        <div className='input-container'>{renderInput('password', 'password', password, setPassword, 'Enter Your password', 'Password')}</div>
                        <div className='input-container loginBtn mt-4'>
                            {loginBtn === 'login' && <button type="submit" className="login-btn">Login</button>}
                        </div>
                        <div className='input-container RegisterBtn'>
                            {loginBtn === 'Register' && <button type="submit" className="register-btn mt-3">CREATE NEW ACCOUNT</button>}
                        </div>
                    </form>
                    {errorMsg && <p className="error-msg text-danger">{errorMsg}</p>}
                    <div className="modal-footer">
                        <p>
                            New user discount applies only to full price items.<br />
                            By providing your email address, you agree to our<br />
                            <span className="modal-footer-text">Privacy Policy</span> and <span className="modal-footer-text">Terms of Service</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
