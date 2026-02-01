import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const email = result.user.email;

  // IITR restriction
  if (!email.endsWith("iitr.ac.in")) {
    await auth.signOut();
    throw new Error("Only IIT Roorkee students allowed");
  }

  return result.user; // frontend gets user object
};
