export class CourseDto {
  id!: string;
  code!: string;
  title!: string;
  description!: string | null;
  isArchived!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  ownerId!: string | null;
  owner?: {
    id: string;
    email: string;
    role: string;
    profile?: {
      id: string;
      fullName: string | null;
      bio: string | null;
      avatarUrl: string | null;
    } | null;
  } | null;
  enrollments?: Array<{
    id: string;
    userId: string;
    courseId: string;
    role: string;
    createdAt: Date;
  }>;
  assignments?: Array<{
    id: string;
    courseId: string;
    title: string;
    description: string | null;
    specMarkdown: string | null;
    points: number;
    dueAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export class CreateCourseDto {
  code!: string;
  title!: string;
  description?: string;
  ownerId?: string;
}

export class UpdateCourseDto {
  code?: string;
  title?: string;
  description?: string;
  isArchived?: boolean;
  ownerId?: string;
}

export class DeleteCourseDto {
  id!: string;
}
