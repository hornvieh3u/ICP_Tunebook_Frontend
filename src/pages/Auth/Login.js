import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Slide from "./Slide";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const slideImages = ['/demo/assets/slide_1.png', '/demo/assets/slide_2.png', '/demo/assets/slide_3.png']

    return (<>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 g bg-cover bg-no-repeat bg-center h-screen " style={{
            backgroundImage: 'url("/demo/assets/login.png")',
            backgroundRepeat: "no-repat",
          }}>
            <div className="flex justify-center items-center w-full hidden md:block">
                <img src="/demo/assets/logo.png" className="absolute" style={{top: "61px", left:"166px"}}></img>

                <div className="flex justify-center h-full w-full items-center">
                    <Slide images={slideImages} interval={3000}/>
                </div>
            </div>
            <div className="flex w-full flex-row justify-center items-center px-4">
                <div style={{maxWidth: "468px", maxHeight: '627px', margin: '0 auto', backgroundColor: "rgba(22, 28, 42, 0.95)", backdropFilter: 'blur(10px)'}} className="w-full p-4 sm:p-6 md:p-8 gap-[20px] bg-opacity-85 rounded-5 shadow-bottom_1 flex justify-start flex-col items-center">                    
                    <p className="text-white font-plus font-bold text-18 leading-22">Log in</p>
                    <div className="relative z-20 flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <p className="font-plus text-white font-light text-14 leading-20">E-mail</p>
                            <img src="/demo/assets/info_cycle.svg" className="text-14 text-coral-500"/>
                        </div>
                        <input className="bg-primary-700 py-2 px-4 rounded-3 text-white outline-none text-16 border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-start items-center">
                            <label className="font-plus text-white font-light text-14 leading-20">Password</label>
                            <img src="/demo/assets/info_cycle.svg" className="text-14 text-coral-500"/>
                        </div>
                        <div className="relative flex items-center">
                            <input  type={showPassword ? "text" : "password"} className="bg-primary-700 text-16 opacity-100 py-2 w-full px-4 rounded-3 text-white outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                            <button className="w-[24px] h-[24px] absolute right-4 cursor-point" onClick={() => setShowPassword(!showPassword)}>{showPassword? ( <img src="/demo/assets/eye_hidden.svg" className="w-[24px] h-[24px]"/>) : 
                            (<img src="/demo/assets/eye_show.svg" className="w-[24px] h-[24px]"/>)}</button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start w-full gap-[5px]">
                        <div className="flex flex-row justify-between gap-[70px] items-center pl-2">
                            <div className="flex flex-row items-center justify-start">
                                <input type="checkbox" className="inline-block form-checkbox rounded-sm text-darkblue-600 bg-transparent w-[14px] h-[14px] outline-none focus:border-transparent focus:bg-transparent focus:ring-0 focus:ring-transparent checked:bg-transparent checked:border-darkblue-700 checked:text-darkblue-600"/>
                                <label className="font-plus text-white font-light text-14 leading-20 pl-2">Remember Passsword</label>
                            </div>
                            <label className="font-plus text-darkblue-700 font-bold text-14 leading-20 pl-2" style={{color: "#0674FC"}}>I forgot my password</label>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-center bg-primary-700 rounded-[10px] p-[10px] gap-[10px]">
                            <input type="checkbox" className="inline-block form-checkbox rounded-sm text-darkblue-600 bg-transparent pl-2 w-[16px] h-[16px] outline-none focus:border-transparent focus:bg-transparent focus:ring-0 focus:ring-transparent checked:bg-transparent checked:border-darkblue-700 checked:text-darkblue-600"/>
                            <label className="font-plus text-white font-normal text-16 leading-20">I am not a robot</label>
                            <img  src="/demo/assets/RecaptchaLogo.png"/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full p-[10px] gap-[5px]">
                        <a className="fill-btn-primary text-12 px-4 py-2 text-white font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" 
                            style={{textAlign: 'center', width: '231px',  cursor: 'pointer'}}
                            onClick={() => history.push("/app/home")}>To access
                            <img src="/demo/assets/arrow-right.svg"/>
                        </a>
                    </div>
                    <div className="flex justify-center items-center w-full gap-[20px]">
                        <div className="relative w-full h-[1px]" style={{backgroundColor: "#C4C4C4"}}></div>
                        <span className="font-plus text-neutral-700 font-light text-16 leading-20">o</span>
                        <div className="relative w-full h-[1px]" style={{backgroundColor: "#C4C4C4"}}></div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full gap-[5px]">
                        <p className="font-plus text-white font-normal text-16 leading-20">Do not you have an account yet?</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Login;