import { Row, Col, Card } from "react-bootstrap";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentUsers from "@/components/dashboard/RecentUsers";
import QuickActions from "@/components/dashboard/QuickActions";
import { useAuth } from "@/hooks/useAuth";
import { getGreeting } from "@/utils/common";

const Dashboard = () => {
  const { user } = useAuth();
  const greeting = getGreeting();
  
  return (
    <>
      {/* Welcome Banner */}

      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <h2 className="fw-bold mb-2">
            {greeting},{" "}
            {user?.firstName ?? "User"} 👋
          </h2>

          <p className="text-muted mb-0">
            Welcome to your dashboard. Here you can
            monitor user statistics, manage accounts,
            and quickly access frequently used actions.
          </p>
        </Card.Body>
      </Card>

      {/* Statistics */}

      <DashboardStats />

      {/* Bottom Section */}

      <Row className="g-4 mt-1">

        <Col lg={8}>
          <RecentUsers />
        </Col>

        <Col lg={4}>
          <QuickActions />
        </Col>

      </Row>
    </>
  );
};

export default Dashboard;