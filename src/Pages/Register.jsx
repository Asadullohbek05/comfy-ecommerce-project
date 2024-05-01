import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/Features/FurnitureSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length > 0 && email.length > 0 && password.length > 0) {
      const formData = {
        userName,
        email,
        password,
      };
      setUserName("");
      setEmail("");
      setPassword("");
      // console.log(formData);

      localStorage.setItem("userData", JSON.stringify(formData));
      dispatch(setUserData(formData));
      toast.success("Register Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error("Fill All Inputs");
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-7 mx-5 rounded-2xl shadow-xl w-[400px] max-w-full"
      >
        <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            className="input input-bordered w-full"
            value={userName}
          />
        </div>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input input-bordered w-full"
            value={email}
          />
        </div>
        <div className="mb-7">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input input-bordered w-full"
            value={password}
          />
        </div>
        <button className="btn btn-primary w-full mb-3">REGISTER</button>
        <p className="text-center text-[17px]">
          Already a member?{" "}
          <Link className="text-[#05A6FF]" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
