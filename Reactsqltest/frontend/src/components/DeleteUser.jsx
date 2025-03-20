import { useState } from "react";
import axios from "axios";

export default function DeleteUser() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleDelete = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear previous message
    setIsLoading(true); // Enable loading state

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setMessage(`User with ID ${id} deleted successfully.`);
      setId(""); // Reset form field
    } catch (error) {
      setMessage(
        `Error: ${
          error.response?.data?.error || error.message || "Something went wrong"
        }`
      );
    } finally {
      setIsLoading(false); // Disable loading state
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete User</h2>
      <form onSubmit={handleDelete} style={styles.form}>
        {/* User ID Input */}
        <input
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
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
          {isLoading ? "Deleting..." : "Delete"}
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
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#fff",
    background: "#e74c3c", // Red color for delete action
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