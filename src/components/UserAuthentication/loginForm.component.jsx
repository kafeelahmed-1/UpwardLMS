// import { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import Button from "../Button/button.component";
// import Label from "../Label/label.component";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const history = useHistory();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:7372/Authentication/Login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );
//       if (response.ok) {
//         const { token } = await response.json();
//         localStorage.setItem("token", token); // Store token in local storage
//         history.push("/dashboard"); // Redirect to dashboard after successful login
//       } else {
//         // Handle incorrect credentials or other errors
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto mt-4 bg-white">
//         <div className="w-[520px] h-[60px] py-3 px-5 bg-default border border-b-secondary rounded-t-lg flex justify-between">
//           <p className="self-center text-xl font-semibold">User Login</p>
//         </div>
//         <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
//           <div className="flex flex-col gap-y-4">
//             <div className="input-div-styles">
//               <Label label="Email" />
//               <input
//                 type="text"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="input-styles"
//               />
//             </div>
//             <div className="input-div-styles">
//               <Label label="Password" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className="input-styles"
//               />
//             </div>
//           </div>
//         </form>
//         <div className="w-[520px] h-[72px] py-3 px-5 flex justify-end">
//           <Button
//             button_type="primary"
//             button_size="medium"
//             text="Login"
//             onClick={handleLogin} // Call handleLogin function on button click
//             icon="none"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserLogin;
