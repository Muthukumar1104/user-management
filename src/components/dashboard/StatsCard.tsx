import type { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: ReactNode;
  iconBg?: string;
  borderColor?: string;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-primary",
  borderColor = "primary",
}: StatsCardProps) => {
  return (
    <Card
      className={`border-${borderColor} border-2 shadow-sm h-100 rounded-4`}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">

          <div>

            <p className="text-muted text-uppercase fw-semibold small mb-2">
              {title}
            </p>

            <h2 className="fw-bold mb-1">
              {value}
            </h2>

            {subtitle && (
              <small className="text-muted">
                {subtitle}
              </small>
            )}

          </div>

          <div
            className={`${iconBg} rounded-circle d-flex align-items-center justify-content-center text-white`}
            style={{
              width: 52,
              height: 52,
              fontSize: 22,
            }}
          >
            {icon}
          </div>

        </div>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;