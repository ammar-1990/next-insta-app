
import { useState } from "react";
import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const login = () => {
  const [signUp, setSignUp] = useState(false);
  const imageRef = useRef();
  const [signUpImage, setSignUpImage]=useState('')
  const [loading,setLoading]=useState(false)
  const [error ,setError]=useState('')

  const [logMail,setLogMail]=useState('')
  const [logPassword,setLogPassword]=useState('')

  const router = useRouter()

  const form = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userImage:''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),

      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords dont match"
      ),
    }),
    onSubmit(values, actions) {
        setLoading(true)
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          updateProfile(userCredential.user,{
            displayName:values.name,
            photoURL:'https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif'
        
           });
          const user = userCredential.user;
          console.log(user)
     
          router.push('/')
       
          // ...
        })
        .catch((error) => {
            actions.setSubmitting(false)
         console.log(error.message);
          // ..
        }).finally(()=>{
            actions.resetForm()
            setLoading(false)
        });
      
    },
  });


  const logIn=(e)=>{
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, logMail, logPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
     router.push('/')
    })
    .catch((error) => {
   
     setError(error.message);
    }).finally(()=>{
        setLoading(false)
        setLogMail('')
        setLogPassword('')
    });
  }

  return (
    <div className="h-screen flex flex-col w-full justify-center items-center ">
      <img
        src="/assets/symbol.png"
        alt=""
        className="  w-[400px] h-[200px] object-contain"
      />
      {!signUp ? (
        <form className="mt-2 flex flex-col gap-5 w-[300px]" onSubmit={logIn}>
          <input
          onChange={(e)=>{setLogMail(e.target.value);setError(false)}}
          value={logMail}
            className=" input border-b-black"
            type="text"
            placeholder="Enter your email"
          />
          <input
            className="input border-b-black"
            type="password"
            placeholder="Enter your password"
            onChange={(e)=>{setLogPassword(e.target.value);setError(false)}}
            value={logPassword}
          />
          <button disabled={!logMail || !logPassword || loading}  className="text-white bg-black py-3  disabled:opacity-60 border-none">
            {loading ? 'Loading' : 'Login'}
          </button>
       {error && <p className="text-red-500 text-xs">{error}</p>}

          <p className="mt-8 text-xs">
            Don't have an Account?{" "}
            <span
              onClick={() => setSignUp(true)}
              className="underline cursor-pointer"
            >
              Signup.
            </span>
          </p>
        </form>
      ) : (
        // signup form
        <form ref={form} className="mt-2 flex flex-col gap-5 w-[300px]" onSubmit={formik.handleSubmit}>
          <input
              onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter your name"
            className= { `input ${formik.errors.name && formik.touched.name ? 'border-b-red-500' :"border-b-black" } `}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
             {formik.errors.name && formik.touched.name && <p className="text-red-500 text-xs">{formik.errors.name}</p> }
          <input
              onBlur={formik.handleBlur}
            className={`input  ${formik.errors.email && formik.touched.email ? 'border-b-red-500' :"border-b-black" }`}
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
             {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs">{formik.errors.email}</p> }

          <input
              onBlur={formik.handleBlur}
            className={`input ${formik.errors.password && formik.touched.password ? 'border-b-red-500' :"border-b-black" } `}
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
             {formik.errors.password && formik.touched.password && <p className="text-red-500 text-xs">{formik.errors.password}</p> }
          <input
              onBlur={formik.handleBlur}
            className={`input  ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-b-red-500' :"border-b-black" }`}
            type="password"
            placeholder="Confirm your password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
             {formik.errors.confirmPassword && formik.touched.confirmPassword && <p className="text-red-500 text-xs">{formik.errors.confirmPassword}</p> }
          <div>
            <button
              type="button"
              onClick={() => {
                imageRef.current.click();
              }}
              className="py-3 w-full border hover:bg-black hover:text-white duration-150 border-black"
            >
              Upload Image{" "}
            </button>
            <input type="file" hidden ref={imageRef} />
          </div>
          <button disabled={loading} className="text-white bg-black py-3 disabled:opacity-60  border-none">
            {loading ? 'Loading' : 'Signup'}
          </button>

          <p className="mt-8 text-xs">
            Back to{" "}
            <span
              onClick={() => {setSignUp(false);formik.resetForm()}}
              className="underline cursor-pointer"
            >
              Login.
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default login;
