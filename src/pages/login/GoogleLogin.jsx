import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/FirebaseConfig";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import usernameChecker from "../signup/UsernameCheker";

const GoogleLogin = () => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        return;
      }

      const username = newUser.user.email.split("@")[0]; // Extracting username from email
      const usernameList = await usernameChecker(username);

      if (!usernameList.length) {
        const userRef = doc(db, "userinfo", newUser.user.uid);
        const userSnap = await getDoc(userRef);

        const userData = {
          userId: newUser.user.uid,
          email: newUser.user.email.toLowerCase(),
          fullName: newUser.user.displayName.trim(),
          username: username.toLowerCase().trim(),
          follower: [],
          following: [],
          authProvider: "Google",
          dateCreated: new Date(),
        };

        if (userSnap.exists()) {
          loginUser(userSnap.data());
          localStorage.setItem("user-info", JSON.stringify(userSnap.data()));
        } else {
          await setDoc(userRef, userData);
          loginUser(userData);
          localStorage.setItem("user-info", JSON.stringify(userData));
        }
      } else {
        setErrorMessage("Username already taken");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link onClick={handleGoogleAuth} className="google-button-signup cur-point">
      Log in with Google
    </Link>
  );
};

export default GoogleLogin;
