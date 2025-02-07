import Commonform from "@/component/common/form";
import { LoginformControl } from "@/config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";


const initialState = {
  email: "",
  password: "",
};

const  LoginUser = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const {toast} = useToast();


  function onSubmit(event) {
    event.preventDefault();


    dispatch(Login(formData)). then((data)=>{
      if( data?.payload?.success){
        toast({
          title: "Login Success",

        });
        
        

      }
      else{
        toast({
          title : data?.payload?.message,
          variant : "destructive",
      });
    }
    });

  }



  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tacking-light text-foreground">
          {" "}
          Sign in to your account
        </h1>
        <p className="mt-2">Don't have an account</p>
        <Link
          className="font-medium text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </div>
      <Commonform
        formControls={LoginformControl}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default LoginUser;
