import { Link } from './links/entities/link.entity';

import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';

import { CourseDto, CreateCourseDto, UpdateCourseDto, DeleteCourseDto } from './courses';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
};

export const courses = {
  dto: {
    CourseDto,
    CreateCourseDto,
    UpdateCourseDto,
    DeleteCourseDto,
  },
};
