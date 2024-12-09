import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // form validation check start
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    // Login API implemnation start here
    console.log("input vaues:", input);
  };

  const loading = false;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={loginSubmitHandler}
          className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx:4"
        >
          <div className="font-bold text-2xl mb-3">
            <h1>Patel Eats</h1>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-sm text-red-500">{errors.fullname}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="Password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Contact"
                name="contact"
                value={input.contact}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-sm text-red-500">{errors.contact}</span>
              )}
            </div>
          </div>
          <div className="mb-10">
            {loading ? (
              <Button disabled className="w-full bg-orange hover:bg-orange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-orange hover:bg-orange"
              >
                Signup
              </Button>
            )}
          </div>
          <Separator />
          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
