import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../../context/ThemeContext";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loading } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      alert("Login yoki parolda xato bor" + (result.error || ""));
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        width: "100%",
        height: "100%",
        marginTop: "-8px",
        marginRight: "-8px",
        marginLeft: "-8px",
        backgroundColor: mode === "dark" ? "#0f0f0f" : "#f5f5f5",
        color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? (
            <Brightness7Icon sx={{ color: "#fff" }} />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </div>

      <div
        style={{
          ...styles.loginBox,
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
          color: mode === "dark" ? "#fff" : "#000",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.style.transform = "translateY(-5px)");
          (e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)");
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.style.transform = "translateY(0)");
          (e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 0, 0, 0.08)");
        }}
      >
        <h1 style={styles.title}>Xush kelibsiz 🤚🏻</h1>
        <p style={styles.subtitle}>Hisobingizga kirish uchun email va parolni kiriting </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                ...styles.input,
                backgroundColor: mode === "dark" ? "#2a2a2a" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                borderColor: mode === "dark" ? "#444" : "#ddd",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#007bff";
                e.currentTarget.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "#444" : "#ddd";
                e.currentTarget.style.boxShadow = "none";
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="************"
              style={{
                ...styles.input,
                backgroundColor: mode === "dark" ? "#2a2a2a" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                borderColor: mode === "dark" ? "#444" : "#ddd",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#007bff";
                e.currentTarget.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "#444" : "#ddd";
                e.currentTarget.style.boxShadow = "none";
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
              backgroundColor: mode === "dark" ? "#fff" : "#000",
              color: mode === "dark" ? "#000" : "#fff",
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
            }}
          >
            {loading ? "Loaded..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    transition: "all 0.4s ease",
    padding: "20px",
  },
  loginBox: {
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 0 25px rgba(0, 0, 0, 0.08)",
    width: "100%",
    maxWidth: "400px",
    transition: "all 0.3s ease",
    position: "relative" as const,
    overflow: "hidden",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "10px",
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  subtitle: {
    textAlign: "center" as const,
    marginBottom: "30px",
    fontSize: "14px",
    color: "#fff",
    lineHeight: "20px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box" as const,
    outline: "none",
    transition: "all 0.25s ease",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    letterSpacing: "0.3px",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
    cursor: "not-allowed",
    opacity: 0.8,
  },
};

export default Login;
