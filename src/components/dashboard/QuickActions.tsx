import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Users,
  LayoutDashboard,
} from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <Card.Body>
        <div className="mb-4">
          <h5 className="fw-bold mb-1">
            Quick Actions
          </h5>

          <p className="text-muted mb-0">
            Frequently used actions
          </p>
        </div>

        <Row className="g-3">
          <Col xs={12}>
            <Button
              data-testid="add-user-action"
              variant="primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
              onClick={() => navigate("/users")}
            >
              <UserPlus size={18} />
              Add User
            </Button>
          </Col>

          <Col xs={12}>
            <Button
              data-testid="manage-users-action"
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
              onClick={() => navigate("/users")}
            >
              <Users size={18} />
              Manage Users
            </Button>
          </Col>

          <Col xs={12}>
            <Button
              data-testid="dashboard-home-action"
              variant="outline-secondary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
              onClick={() => navigate("/")}
            >
              <LayoutDashboard size={18} />
              Dashboard Home
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default QuickActions;