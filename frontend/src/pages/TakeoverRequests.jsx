import { useEffect, useState } from "react";

function TakeoverRequests() {
  const [requests, setRequests] = useState([]);
  const pendingCount = requests.filter(
  (request) => request.status === "Pending"
).length;

  useEffect(() => {
  const fetchRequests = () => {
    fetch("http://localhost:5000/takeover-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));
  };

  fetchRequests();

  const interval = setInterval(fetchRequests, 5000);

  return () => clearInterval(interval);
}, []);

  

  return (
    <div className="container">
      <h1>Takeover Requests</h1>
      {pendingCount > 0 && (
  <div
    style={{
      background: "#fef3c7",
      border: "1px solid #f59e0b",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontWeight: "600",
    }}
  >
    🔔 {pendingCount} takeover request
    {pendingCount > 1 ? "s" : ""} pending approval
  </div>
)}

      {requests.length === 0 ? (
        <p>No pending takeover requests.</p>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "8px",
            }}
          >
            <h3>{request.requesterName}</h3>

            <p>
              <strong>Message:</strong> {request.message}
            </p>

            <p>
              <strong>Status:</strong> {request.status}
            </p>

            <p>
              <strong>Requested:</strong>{" "}
              {new Date(request.createdAt).toLocaleString()}
            </p>
            {request.status === "Pending" && (
                <div style={{ marginTop: "15px" }}>
  <button
    onClick={async () => {
      const response = await fetch(
        `http://localhost:5000/takeover-requests/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Approved",
          }),
        }
      );

      const updatedRequest = await response.json();

      setRequests(
        requests.map((r) =>
          r._id === updatedRequest._id ? updatedRequest : r
        )
      );
    }}
    style={{ marginRight: "10px" }}
  >
    Approve
  </button>

  <button
    onClick={async () => {
      const response = await fetch(
        `http://localhost:5000/takeover-requests/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Rejected",
          }),
        }
      );

      const updatedRequest = await response.json();

      setRequests(
        requests.map((r) =>
          r._id === updatedRequest._id ? updatedRequest : r
        )
      );
    }}
  >
    Reject
  </button>
</div>
)}
{request.status === "Approved" && (
  <div style={{ marginTop: "15px" }}>
    <p>
      <strong>Access Granted To:</strong>{" "}
      {request.accessGrantedTo}
    </p>

    <p>
      <strong>Approved At:</strong>{" "}
      {request.accessGrantedAt
        ? new Date(request.accessGrantedAt).toLocaleString()
        : "N/A"}
    </p>
  </div>
)}
{request.status === "Rejected" && (
  <p style={{ marginTop: "15px" }}>
    <strong>Request Rejected</strong>
  </p>
)}
          </div>
        ))
      )}
    </div>
  );
}

export default TakeoverRequests;