import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../Redux/Features/FurnitureSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const userData = JSON.parse(localStorage.getItem("userData"));
  const userData = useSelector((state) => state.Furnitures.userData);
  const email = userData ? userData.email : null;
  const password = userData ? userData.password : null;
  useEffect(() => {
    console.log(email, password);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    if (loginEmail == email && loginPassword == password) {
      toast.success("Logged In Successfully");
      dispatch(setUserData(userData));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (loginEmail == email && loginPassword != password) {
      toast.error("Password Is Incorrect!!!");
    } else if (loginEmail != email && loginPassword == password) {
      toast.error("Email is Incorrect!!!");
    } else {
      toast.error("Email and Password are Incorrect!!!");
    }
  };

  const handleGuest = (e) => {
    e.preventDefault();
    console.log("Guest user ishlayapti");
    toast.success("Welcome Guest User");
    dispatch(setUserData({ userName: "Demo User" }));
    localStorage.setItem("userData", JSON.stringify({ userName: "Demo User" }));
    navigate("/");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-7 mx-5 rounded-2xl shadow-xl w-[400px] max-w-full"
      >
        <h1 className="text-3xl font-bold mb-5 text-center">Login</h1>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            onChange={(e) => setLoginEmail(e.target.value)}
            type="text"
            className="input input-bordered w-full"
            value={loginEmail}
            required
          />
        </div>
        <div className="mb-7">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            onChange={(e) => setLoginPassword(e.target.value)}
            type="password"
            className="input input-bordered w-full"
            value={loginPassword}
            required
          />
        </div>
        <button className="btn btn-primary w-full mb-4">Login</button>
        <button onClick={handleGuest} className="btn btn-primary w-full mb-3">
          Guest User
        </button>
        <p className="text-center text-[17px] flex items-center gap-2 justify-center">
          Not a member yet?
          <Link className="text-[#05A6FF]" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
