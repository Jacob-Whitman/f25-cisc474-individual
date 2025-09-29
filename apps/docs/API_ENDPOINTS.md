# API Endpoints Documentation

This document contains links to all deployed API endpoints for the LMS (Learning Management System) project.

## Available Endpoints

### Root Endpoint
- [GET Root](https://f25-cisc474-individual-2.onrender.com/) - Health check endpoint

### Links Endpoints
- [GET All Links](https://f25-cisc474-individual-2.onrender.com/links) - Get all links
- [GET Link by ID](https://f25-cisc474-individual-2.onrender.com/links/1) - Get specific link by ID
- [POST Create Link](https://f25-cisc474-individual-2.onrender.com/links) - Create a new link
- [PATCH Update Link](https://f25-cisc474-individual-2.onrender.com/links/1) - Update a link
- [DELETE Remove Link](https://f25-cisc474-individual-2.onrender.com/links/1) - Delete a link

### User Endpoints
- [GET All Users](https://f25-cisc474-individual-2.onrender.com/users) - Get all users
- [GET User by ID](https://f25-cisc474-individual-2.onrender.com/users/1) - Get specific user by ID

### Profile Endpoints
- [GET All Profiles](https://f25-cisc474-individual-2.onrender.com/profiles) - Get all profiles
- [GET Profile by ID](https://f25-cisc474-individual-2.onrender.com/profiles/1) - Get specific profile by ID

### Course Endpoints
- [GET All Courses](https://f25-cisc474-individual-2.onrender.com/courses) - Get all courses
- [GET Course by ID](https://f25-cisc474-individual-2.onrender.com/courses/1) - Get specific course by ID

### Enrollment Endpoints
- [GET All Enrollments](https://f25-cisc474-individual-2.onrender.com/enrollments) - Get all enrollments
- [GET Enrollment by ID](https://f25-cisc474-individual-2.onrender.com/enrollments/1) - Get specific enrollment by ID

### Assignment Endpoints
- [GET All Assignments](https://f25-cisc474-individual-2.onrender.com/assignments) - Get all assignments
- [GET Assignment by ID](https://f25-cisc474-individual-2.onrender.com/assignments/1) - Get specific assignment by ID

### Submission Endpoints
- [GET All Submissions](https://f25-cisc474-individual-2.onrender.com/submissions) - Get all submissions
- [GET Submission by ID](https://f25-cisc474-individual-2.onrender.com/submissions/1) - Get specific submission by ID

### Category Endpoints
- [GET All Categories](https://f25-cisc474-individual-2.onrender.com/categories) - Get all categories
- [GET Category by ID](https://f25-cisc474-individual-2.onrender.com/categories/1) - Get specific category by ID

### Post Endpoints
- [GET All Posts](https://f25-cisc474-individual-2.onrender.com/posts) - Get all posts
- [GET Post by ID](https://f25-cisc474-individual-2.onrender.com/posts/1) - Get specific post by ID

### Comment Endpoints
- [GET All Comments](https://f25-cisc474-individual-2.onrender.com/comments) - Get all comments
- [GET Comment by ID](https://f25-cisc474-individual-2.onrender.com/comments/1) - Get specific comment by ID


## Notes

- All GET endpoints return JSON data
- The database is seeded with sample data during deployment
- Some endpoints may return empty arrays if no data exists
- ID-based endpoints will return `null` if the specified ID doesn't exist
