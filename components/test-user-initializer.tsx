"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function TestUserInitializer() {
  useEffect(() => {
    // Initialize test user on component mount
    const testUser = {
      id: "test-user-001",
      email: "test@ryda.com",
      password: "test123",
      name: "Test Rider",
      phone: "+1234567890",
      country: "United States",
      profilePicture: "/placeholder-user.jpg",
      createdAt: new Date().toISOString()
    };

    // Get existing users or create empty array
    const existingUsers = JSON.parse(localStorage.getItem("ryda_users") || "[]");

    // Check if test user already exists
    const userExists = existingUsers.find((user: any) => user.email === testUser.email);

    if (!userExists) {
      // Add test user to the array
      existingUsers.push(testUser);
      
      // Save back to localStorage
      localStorage.setItem("ryda_users", JSON.stringify(existingUsers));
      
      console.log("✅ Test user added successfully!");
      console.log("📧 Email: test@ryda.com");
      console.log("🔑 Password: test123");
    } else {
      console.log("ℹ️ Test user already exists!");
      console.log("📧 Email: test@ryda.com");
      console.log("🔑 Password: test123");
    }
  }, []);

  const clearTestUser = () => {
    const existingUsers = JSON.parse(localStorage.getItem("ryda_users") || "[]");
    const filteredUsers = existingUsers.filter((user: any) => user.email !== "test@ryda.com");
    localStorage.setItem("ryda_users", JSON.stringify(filteredUsers));
    localStorage.removeItem("ryda_user"); // Clear current session
    console.log("🗑️ Test user removed!");
    window.location.reload();
  };

  return (
    <div className="hidden fixed top-0 right-4 z-50 bg-background border border-border rounded-lg p-4 shadow-lg">
      <div className="text-sm font-medium mb-2">🧪 Test User</div>
      <div className="text-xs text-muted-foreground mb-3">
        <div>📧 test@ryda.com</div>
        <div>🔑 test123</div>
      </div>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={clearTestUser}
        className="w-full"
      >
        Clear Test User
      </Button>
    </div>
  );
} 