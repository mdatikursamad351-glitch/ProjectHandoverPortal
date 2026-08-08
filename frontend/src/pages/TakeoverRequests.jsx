import { useEffect, useState } from "react";

function TakeoverRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/takeover-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));
  }, []);

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  return (
    <div className="container">
      <h1>Takeover Requests</h1>

      {pendingRequests.length === 0 ? (
        <p>No pending takeover requests.</p>
      ) : (
        pendingRequests.map((request) => (
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
            </p><div style={{ marginTop: "15px" }}>
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
          </div>
        ))
      )}
    </div>
  );
}

export default TakeoverRequests;