import Commonform from "@/component/common/form";
import { RegisterformControl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();


  function onSubmit(event) {
    event.preventDefault();  
    dispatch(registerUser(formData)).then((data)=> {
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message,

        });

       navigate('/auth/login')
      }
      else{
        toast({
          title : "Email already Exist",
          variant: "destructive"

        });

      }
     
    });

  }



  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tacking-light text-foreground">
          {" "}
          Create a new Account
        </h1>
        <p className="mt-2">Already have an account</p>
        <Link
          className="font-medium text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      <Commonform
        formControls={RegisterformControl}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
