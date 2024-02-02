export const meta = () => {
  return [{ title: "Google Reviews App" }];
};

export default function Index() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "system-ui, sans-serif",
      lineHeight: "1.4"
    }}>
      <button
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={() => {
          window.location.href = "/review-signup";
        }}
      >
        Go to Review Signup
      </button>
    </div>
  );
}