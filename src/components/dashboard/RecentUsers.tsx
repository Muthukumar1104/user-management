import { Card, ListGroup, Badge } from "react-bootstrap";
import { useUsers } from "@/hooks/useUsers";

const RecentUsers = () => {
  const { users } = useUsers();

  // Show latest 5 users (newly added users appear first)
  const recentUsers = users.slice(0, 5);

  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold mb-1">
              Recent Users
            </h5>

            <p className="text-muted mb-0">
              Latest registered users
            </p>
          </div>
        </div>

        <ListGroup variant="flush">
          {recentUsers.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No users found.
            </div>
          ) : (
            recentUsers.map((user) => (
              <ListGroup.Item
                key={user.id}
                className="border-0 px-0 py-3"
              >
                <div className="d-flex align-items-center justify-content-between">

                  {/* Left */}

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-circle bg-primary text-white fw-bold d-flex justify-content-center align-items-center me-3"
                      style={{
                        width: 48,
                        height: 48,
                        fontSize: "18px",
                      }}
                    >
                      {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                    </div>

                    <div>
                      <h6 className="mb-1 fw-semibold">
                        {user.firstName} {user.lastName}
                      </h6>

                      <small className="text-muted">
                        {user.email}
                      </small>
                    </div>

                  </div>

                  {/* Right */}

                  <Badge
                    bg={
                      user.status === "Active"
                        ? "success"
                        : "danger"
                    }
                    pill
                  >
                    {user.status}
                  </Badge>

                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default RecentUsers;