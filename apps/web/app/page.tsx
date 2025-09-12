import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the LMS</h1>
      <p>This is the landing page for your Learning Management System.</p>
      <ul style={{ marginTop: '2rem', lineHeight: '2' }}>
        <li><Link href="/login">Go to Login</Link></li>
        <li><Link href="/dashboard">Go to Dashboard</Link></li>
        <li><Link href="/courses">Go to Courses</Link></li>
        <li><Link href="/profile">Go to Profile</Link></li>
      </ul>
    </div>
  );
}
