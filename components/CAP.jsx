import Link from "next/link";
import Image from "next/image";
import { Button } from "@mantine/core";

const CAP = ({ status }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  };

  const paperStyle = {
    padding: "20px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
  };

  const logoStyle = {
    marginBottom: "15px",
  };

  let message = "";
  let loginButtonVariant = "filled";
  let signupButtonVariant = "light";
  let homeButton = null;

  switch (status) {
    case "notLoggedIn":
      message =
        "You are not logged in. Please log in or sign up to access the cool features.";
      break;
    case "notAdmin":
      message = "You are not an admin. Only admins can access this feature.";
      loginButtonVariant = "light";
      signupButtonVariant = "light";
      break;
    case "alreadyLoggedIn":
      message = "You are already logged in.";
      loginButtonVariant = "light";
      signupButtonVariant = "light";
      homeButton = (
        <Link href="/" passHref>
          <Button variant="filled" color="lime">
            Go Home
          </Button>
        </Link>
      );
      break;
    // Add more cases as needed
    default:
      message = "Unknown status. Please try again later.";
      break;
  }

  return (
    <div style={containerStyle}>
      <div style={paperStyle}>
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={300}
          height={120}
          style={logoStyle}
        />
        <h1 style={{ color: "#333333" }}>Welcome to Jet Couriers!</h1>
        <p style={{ color: "#555555" }}>{message}</p>
        {status !== "notAdmin" && (
          <>
            {homeButton}
            <Link href="/Signin" >
              <Button variant={loginButtonVariant} style={{margin:'0 1rem'}} color="red">
                Log In
              </Button>
            </Link>
            <Link href="/Signup" >
              <Button variant={signupButtonVariant} color="red">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CAP;
