import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is your personalized dashboard. Role-based content will appear here.</p>
      <p style={{ marginTop: '2rem' }}>
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
}
