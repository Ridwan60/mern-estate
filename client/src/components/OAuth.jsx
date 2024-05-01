import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data)); // Dispatch signInSuccess with the fetched data
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
      dispatch(signInFailure(error.message)); // Dispatch signInFailure with the error message
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="rounded-lg bg-red-600 hover:opacity-90 p-3 text-white font-semibold"
    >
      Sign In With Google
    </button>
  );
}
