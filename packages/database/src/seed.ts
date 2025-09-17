import { prisma } from "./client";
import crypto from "crypto";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function upsertUser(email: string, role: string, fullName?: string) {
  const passwordHash = hashPassword("password");
  const user = await prisma.user.upsert({
    where: { email },
    update: { role: role as any, passwordHash },
    create: { email, passwordHash, role: role as any },
  });

  // upsert profile
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: { fullName },
    create: { userId: user.id, fullName },
  });

  return user;
}

async function main() {
  console.log("Start seeding...");

  // --- Users ---
  const admin = await upsertUser("admin@example.com", "ADMIN", "Site Admin");
  const instructor = await upsertUser(
    "prof.jones@example.edu",
    "INSTRUCTOR",
    "Prof. Ada Jones"
  );
  const ta = await upsertUser("ta.smith@example.edu", "TA", "Taylor Smith");

  const students = [] as Array<ReturnType<typeof upsertUser> | any>;
  for (let i = 1; i <= 5; i++) {
    // create a few students
    // eslint-disable-next-line no-await-in-loop
    const s = await upsertUser(
      `student${i}@example.edu`,
      "STUDENT",
      `Student ${i} `
    );
    students.push(s);
  }

  // --- Categories & Posts ---
  const announcements = await prisma.category.upsert({
    where: { slug: "announcements" },
    update: {},
    create: { slug: "announcements", name: "Announcements" },
  });

  const general = await prisma.category.upsert({
    where: { slug: "general" },
    update: {},
    create: { slug: "general", name: "General Discussion" },
  });

  await prisma.post.upsert({
    where: { slug: "welcome-to-lms" },
    update: {},
    create: {
      slug: "welcome-to-lms",
      title: "Welcome to the LMS",
      content: "This is a seeded announcement for the LMS.",
      published: true,
      authorId: admin.id,
      categoryId: announcements.id,
    },
  });

  await prisma.post.upsert({
    where: { slug: "introductions" },
    update: {},
    create: {
      slug: "introductions",
      title: "Introduce Yourself",
      content: "Say hi and tell us about yourself.",
      published: true,
      authorId: instructor.id,
      categoryId: general.id,
    },
  });

  // --- Courses ---
  const cs101 = await prisma.course.upsert({
    where: { code: "CS101" },
    update: { title: "Intro to Programming" },
    create: {
      code: "CS101",
      title: "Intro to Programming",
      description: "Learn the basics of programming in Python and JS.",
      ownerId: instructor.id,
    },
  });

  const hum100 = await prisma.course.upsert({
    where: { code: "HUM100" },
    update: { title: "World Literature" },
    create: {
      code: "HUM100",
      title: "World Literature",
      description: "A survey course. This course intentionally has no assignments yet.",
      ownerId: admin.id,
    },
  });

  const algo = await prisma.course.upsert({
    where: { code: "CS200" },
    update: { title: "Algorithms" },
    create: {
      code: "CS200",
      title: "Algorithms",
      description: "Intermediate algorithms course.",
      ownerId: instructor.id,
    },
  });

  // --- Enrollments ---
  const enroll = async (userId: string, courseId: string, role: string) => {
    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { role: role as any },
      create: { userId, courseId, role: role as any },
    });
  };

  // enroll TA and students in CS101
  await enroll(ta.id, cs101.id, "TA");
  for (const s of students) {
    // eslint-disable-next-line no-await-in-loop
    await enroll(s.id, cs101.id, "STUDENT");
  }

  // enroll some students into CS200 as well
  await enroll(students[0].id, algo.id, "STUDENT");
  await enroll(students[1].id, algo.id, "STUDENT");

  // HUM100 intentionally has students but no assignments
  await enroll(students[2].id, hum100.id, "STUDENT");

  // --- Assignments for CS101 ---
  const now = new Date();
  const due1 = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 1 week
  const due2 = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 14); // 2 weeks
  const due3 = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 21); // 3 weeks

  const a1 = await prisma.assignment.create({
    data: {
      courseId: cs101.id,
      title: "Homework 1 - Basics",
      description: "Exercises on variables and control flow.",
      specMarkdown: "# Homework 1\nSolve the problems...",
      points: 100,
      dueAt: due1,
    },
  });

  const a2 = await prisma.assignment.create({
    data: {
      courseId: cs101.id,
      title: "Project 1 - Small App",
      description: "Build a small web app.",
      specMarkdown: "# Project 1\nDeliver a working app...",
      points: 200,
      dueAt: due2,
    },
  });

  const a3 = await prisma.assignment.create({
    data: {
      courseId: cs101.id,
      title: "Optional Challenge",
      description: "Extra credit challenges.",
      specMarkdown: "# Optional Challenge\nTry the extra problems.",
      points: 50,
      dueAt: due3,
    },
  });

  // --- Submissions (varied cases) ---
  // Student 1 submits on time and is graded
  await prisma.submission.create({
    data: {
      assignmentId: a1.id,
      studentId: students[0].id,
      submittedAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2),
      status: "GRADED",
      grade: 92,
      feedback: "Good work!",
      filesJson: { files: ["hw1_student1.zip"] },
    },
  });

  // Student 2 submits late
  await prisma.submission.create({
    data: {
      assignmentId: a1.id,
      studentId: students[1].id,
      submittedAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 9),
      status: "LATE",
      grade: 70,
      feedback: "Late submission - partial credit.",
      filesJson: { files: ["hw1_student2.zip"] },
    },
  });

  // Student 3 missing (no submission created) - demonstrates missing case

  // Student 4 submits but not graded yet
  await prisma.submission.create({
    data: {
      assignmentId: a1.id,
      studentId: students[3].id,
      submittedAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3),
      status: "SUBMITTED",
      filesJson: { files: ["hw1_student4.zip"] },
    },
  });

  // --- Posts & Comments in course forum (mapping posts to categories created earlier) ---
  const coursePost = await prisma.post.create({
    data: {
      slug: `cs101-intro-${cs101.code}`,
      title: `Welcome to ${cs101.code}`,
      content: `This is the course page for ${cs101.title}.`,
      published: true,
      authorId: instructor.id,
      categoryId: general.id,
    },
  });

  await prisma.comment.create({
    data: {
      body: "Looking forward to the class!",
      authorId: students[0].id,
      postId: coursePost.id,
    },
  });

  await prisma.comment.create({
    data: {
      body: "When is office hours?",
      authorId: students[1].id,
      postId: coursePost.id,
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

