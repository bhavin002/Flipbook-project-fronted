import { Card, CardContent } from "./card";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export default function NotFound404() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center py-12">
          <span className="text-7xl font-bold text-primary mb-4">404</span>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6 text-center">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Button onClick={() => navigate("/")}>Go to Homepage</Button>
        </CardContent>
      </Card>
    </div>
  );
} 