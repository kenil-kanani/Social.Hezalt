import React, { useEffect, useState } from 'react'
import { isActivateAccount } from '../apis/index';
import greenTic from '../assets/green-tic.png';
import './styles/verify.style.css'

const Verify = () => {

    useEffect(() => {
        setInterval(async () => {
            const response = await isActivateAccount();
            if (response.data) {
                window.location.href = "/";
            }
            if (localStorage.getItem('X-access-token') === null) {
                window.location.href = "/signin";
            }
        }, 2000);
    }, []);

    const [verificationSent, setVerificationSent] = useState(false);

    const handleResendEmail = async () => {
        try {
            // await resendVerificationEmailApi();
            setVerificationSent(true);
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    };

    return (
        <div className=" w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="verify p-8 text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">
                    Account Created Successfully!
                </h1>
                {!verificationSent ? (
                    <>
                        <div className='w-[100%] flex justify-center'><img src={greenTic} className='h-[200px] w-[200px] ' /></div>
                        <h2 className="text-xl mb-4 text-gray-900">
                            Please Verify Your Email Address.
                        </h2>
                        <button
                            className="px-4 py-2 rounded bg-[#1a1a1a] text-white"
                            onClick={() => handleResendEmail()}
                        >
                            Resend Email
                        </button>
                    </>
                ) : (
                    <p className="text-green-500 font-semibold mb-4">
                        Verification email has been sent. Please check your inbox.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Verify
