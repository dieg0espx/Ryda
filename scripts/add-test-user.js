// Script to add a test user to localStorage
// Run this in the browser console or as a Node.js script

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
const userExists = existingUsers.find(user => user.email === testUser.email);

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

console.log("\n🎯 You can now login with these credentials in the app!"); 