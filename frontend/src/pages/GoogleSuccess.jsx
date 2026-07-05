import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (token && user) {
      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify(JSON.parse(decodeURIComponent(user))),
      );

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      Logging in with Google...
    </div>
  );
};

export default GoogleSuccess;
