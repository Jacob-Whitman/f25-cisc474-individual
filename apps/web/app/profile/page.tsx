import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <p>Manage your account and personal information.</p>
      <p style={{ marginTop: '2rem' }}>
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
}
