
import React from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent } from "@/components/ui/card";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-0">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
