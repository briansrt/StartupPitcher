import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; 
  if (!isSignedIn) return <RedirectToSignIn />;

  return children;
}
