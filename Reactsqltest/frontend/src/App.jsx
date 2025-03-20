import CreateUser from "./components/CreateUser.jsx";
import ReadUsers from "./components/ReadUsers.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import DeleteUser from "./components/DeleteUser.jsx";

function App() {
  return (
    <div style={styles.container}>
      {/* Side-by-Side Frames */}
      <div style={styles.row}>
        {/* Left Frame: CreateUser */}
        <div style={styles.frame}>
          <CreateUser />
        </div>

        {/* Right Frame: UpdateUser */}
        <div style={styles.frame}>
          <UpdateUser />
        </div>
      </div>

      {/* Stacked Below */}
      <div style={styles.stackedSection}>
        <DeleteUser />
      </div>

      <div style={styles.stackedSection}>
        <ReadUsers />
      </div>
    </div>
  );
}

// Minimalistic Styles with Darker Background
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    background: "#2d2d2d", // Dark gray background
    color: "#ffffff", // Light text for contrast
    minHeight: "100vh",
  },
  row: {
    display: "flex", // Use flexbox for side-by-side layout
    justifyContent: "space-between", // Add space between frames
    gap: "2rem", // Add spacing between frames
    marginBottom: "2rem", // Space before stacked sections
  },
  frame: {
    flex: 1, // Each frame takes equal width
    padding: "1.5rem",
    background: "#ffffff", // White background for frames
    borderRadius: "12px", // Rounded corners
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow
  },
  stackedSection: {
    padding: "1.5rem",
    background: "#ffffff", // White background for stacked sections
    borderRadius: "12px", // Rounded corners
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow
    margin: "1rem 0", // Add spacing between stacked sections
  },
  "@media (max-width: 768px)": { // Adjust layout for smaller screens
    row: {
      flexDirection: "column", // Stack frames vertically
    },
    frame: {
      flex: "none", // Remove equal width constraint
      width: "100%", // Make frames full-width
    },
  },
};

export default App;