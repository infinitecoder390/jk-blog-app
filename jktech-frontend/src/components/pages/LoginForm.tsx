import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <Card className="shadow-lg rounded-lg bg-white max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Sign in
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 transition-transform transform hover:scale-105"
          onClick={() => login("google")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22l .81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06 .56 4 .21l3 .15C17 .09,14 .97,12 .97,7 .97,3 .47,2 .07l3 .66c0-.6,3 .53,6 .53z"
            />
          </svg>
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 transition-transform transform hover:scale-105"
          onClick={() => login("facebook")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              fill="#1877F2"
              d="M24 12c0 -6 -5 -12 -12 -12S0,6,0,12c0,6,4,11,10,11v -8H7v -3h3V9c0 -3,2 -5,4 -5s4,1,4,1v3h -3c -1,0 -2,.9 -2,2v3h4l -1,3h -3v8C20,23,24,18,24,12z"
            />
          </svg>
          Sign in with Facebook
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-2 text-center text-sm text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  );
}
