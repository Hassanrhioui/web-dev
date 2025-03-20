import { useState } from "react";
import axios from "axios";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear previous message
    setIsLoading(true); // Enable loading state

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        email,
      });
      setMessage(`User created successfully: ${response.data.name}`);
      setName(""); // Reset form fields
      setEmail("");
    } catch (error) {
      setMessage(
        `Error: ${error.response?.data?.error || error.message || "Something went wrong"}`
      );
    } finally {
      setIsLoading(false); // Disable loading state
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          style={{
            ...styles.button,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
      {/* Feedback Message */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Styles for the Component
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#646cff",
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#fff",
    background: "#646cff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonDisabled: {
    background: "#ccc",
    cursor: "not-allowed",
  },
  message: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#555",
  },
};