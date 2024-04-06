import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/EzzErreurLogo.png";

import Banner from "../components/Banner";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

function SignUp() {
  let width;
  const [windowWidth, setWindowWidth] = useState(width);

  const [verifying, setVerifying] = useState(false);
  const [isSiging, setIsSigning] = useState(false);

  // going for normal approach later on we will use hooks for inputs
  const [isPasswordfocus, setIsPasswordfocus] = useState(false);

  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", watchWidth);
  }, [windowWidth]);
  // signup details handling
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });

  // Login details
  const onInput = (e) => {
    e.preventDefault();
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const isValidName = data.name.length > 3;
  const emailPattern = /^\S+@\S+\.\S+$/;
  const isValidEmail = emailPattern.test(data.email);
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&#]{8,}$/;
  const isValidPassword = passwordPattern.test(data.password);
  const isValidInput = isValidName && isValidEmail && isValidPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidInput) {
      return;
    }
    setIsSigning(true);
    const { name, email, password } = data;
    try {
      // const { data } = await register(name, email, password.trim());
      setIsSigning(false);
      setVerifying(true);
    } catch (error) {
      console.log(error);
      setIsSigning(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: `linear-gradient(0deg, #37c189 -10.03%, rgba(144, 146, 255, 0) 98.39%), #212121`,
        }}
      >
        <div className="flex flex-col items-center justify-evenly min-h-screen gap-0 sm:flex-wrap lg:flex-nowrap sm:flex-row md:justify-center md:gap-12 lg:justify-evenly max-w-[3000px] mx-auto">
          {windowWidth > 1024 && (
            <div className="flex items-center justify-center w-full h-[80vh] lg:min-h-screen lg:w-1/2 ">
              <Banner />
            </div>
          )}

          {/* {windowWidth < 600 &&
            <div className="flex items-center justify-center w-full">
              <img src={mainLogo} alt="" className="h-16 w-36" />
            </div>
          } */}

          <div className="flex items-center justify-center w-full bg-[#212121] text-[#17a199] sm:py-10 lg:py-0 lg:w-1/2 lg:items-center">
            <div className=" flex items-center justify-center p-10 w-[90%] sm:w-2/3  lg:mt-0 md:w-3/4 lg:w-2/3 max-w-[420px] sm:max-w-[600px] md:max-w-[420px] ">
              <div className="rounded-2xl bg-bgPrimary  px-10 pb-[60px] w-full md:w-[410px]">
                <div>
                  <Link to={"/"}>
                    <img
                      className="h-20 mx-auto "
                      src={mainLogo}
                      alt="LinkCollect"
                    />
                  </Link>
                  <h2 className="mt-2 mb-3 text-xl font-bold text-white tracking-tight text-center sm:text-3xl">
                    Welcome
                  </h2>
                  <p
                    className="-mt-2 text-sm  text-center sm:text-lg para"
                   
                  >
                    Sign Up to LinkCollect
                  </p>
                </div>
                <div className="mt-8 mb-3">
                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name (Water White)"
                        onInput={onInput}
                        value={data.name}
                      />
                    </div>
                    <div className="mb-3">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="homelander@gmail.com"
                        onInput={onInput}
                        value={data.email}
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        onInput={onInput}
                        value={data.password}
                        onFocus={() => setIsPasswordfocus(true)}
                        onBlur={() => setIsPasswordfocus(false)}
                      />
                      {!isValidPassword && isPasswordfocus && (
                        <p className="text-xs text-error-500 mt-2 text-start">
                          Password should be at least 8 of character and consist
                          of 1 Uppercase, 1 lower case, 1 special character
                        </p>
                      )}
                    </div>

                    {/* Need to add link after adding the api for forget pass */}
                    {/* <p className="mb-4 font-light text-left text-textSecondary">
                  Forget Your Password?
                </p> */}

                    <Button
                      variant="primary"
                      disabled={!isValidInput}
                      onClick={handleRegister}
                      isLoading={isSiging}
                    >
                      {!isSiging ? "Sign Up" : <Loader />}
                    </Button>
                    <p className="mt-1 font-light text-left text-neutral-400">
                      Already have an account?{" "}
                      <Link to="/login" className="font-bold text-primary-500">
                        Log in
                      </Link>
                    </p>
                  </form>
                </div>
                <hr className="mt-4 hr-text" data-content="OR" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;