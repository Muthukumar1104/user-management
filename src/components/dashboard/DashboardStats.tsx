import { Row, Col } from "react-bootstrap";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const { users } = useUsers();

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const recentUsers = Math.min(users.length, 5);

  return (
    <Row className="g-4">

      <Col xs={12} md={6} xl={3}>
        <StatsCard
          dataTestId="total-users-card"
          title="Total Users"
          value={totalUsers}
          subtitle="Registered users"
          icon={<Users size={24} />}
          iconBg="bg-primary"
          borderColor="primary"
        />
      </Col>

      <Col xs={12} md={6} xl={3}>
        <StatsCard
          dataTestId="active-users-card"
          title="Active Users"
          value={activeUsers}
          subtitle="Currently active"
          icon={<UserCheck size={24} />}
          iconBg="bg-success"
          borderColor="success"
        />
      </Col>

      <Col xs={12} md={6} xl={3}>
        <StatsCard
          dataTestId="inactive-users-card"
          title="Inactive Users"
          value={inactiveUsers}
          subtitle="Disabled accounts"
          icon={<UserX size={24} />}
          iconBg="bg-danger"
          borderColor="danger"
        />
      </Col>

      <Col xs={12} md={6} xl={3}>
        <StatsCard
          dataTestId="recent-users-stat-card"
          title="Recent Users"
          value={recentUsers}
          subtitle="Latest registrations"
          icon={<UserPlus size={24} />}
          iconBg="bg-warning"
          borderColor="warning"
        />
      </Col>

    </Row>
  );
};

export default DashboardStats;