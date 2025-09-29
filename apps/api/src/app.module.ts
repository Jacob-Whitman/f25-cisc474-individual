import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AssignmentModule } from './assignment/assignment.module';
import { SubmissionModule } from './submission/submission.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    LinksModule,
    UserModule,
    ProfileModule,
    CourseModule,
    EnrollmentModule,
    AssignmentModule,
    SubmissionModule,
    CategoryModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
