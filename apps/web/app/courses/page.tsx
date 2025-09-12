import Link from "next/link";

export default function CoursesPage() {
  return (
    <div>
      <h1>Courses</h1>
      <p>Browse and manage your courses here.</p>
      <p style={{ marginTop: '2rem' }}>
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
}
