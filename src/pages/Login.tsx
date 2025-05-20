
import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-0">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
