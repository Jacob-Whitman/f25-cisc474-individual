# API Endpoints Documentation

This document contains links to all deployed API endpoints for the LMS (Learning Management System) project.

## Available Endpoints
- [GET All Comments](http://localhost:3001/comments) - Get all comments
- [GET Comment by ID](http://localhost:3001/comments/1) - Get specific comment by ID

## Production URLs (Render Deployment)

### Main Site (Web App)
- [Main Site](https://f25-cisc474-individual-2.onrender.com) - Your deployed TanStack Start web application

### API Endpoints (Backend)
- [GET Root](https://f25-cisc474-individual-2.onrender.com/) - Health check endpoint

### Links Endpoints
- [GET All Links](https://f25-cisc474-individual-2.onrender.com/links) - Get all links
- [GET Link by ID](https://f25-cisc474-individual-2.onrender.com/links/1) - Get specific link by ID
- [POST Create Link](https://f25-cisc474-individual-2.onrender.com/links) - Create a new link
- [PATCH Update Link](https://f25-cisc474-individual-2.onrender.com/links/1) - Update a link
- [DELETE Remove Link](https://f25-cisc474-individual-2.onrender.com/links/1) - Delete a link

### User Endpoints
- [GET All Users](https://f25-cisc474-individual-2.onrender.com/users) - Get all users
- [GET User by ID](https://f25-cisc474-individual-2.onrender.com/users/cmfhe5sco0000872063vev64w) - Get specific user by ID

### Profile Endpoints
- [GET All Profiles](https://f25-cisc474-individual-2.onrender.com/profiles) - Get all profiles
- [GET Profile by ID](https://f25-cisc474-individual-2.onrender.com/profiles/cmfoaxr9z000287eszpmeuzlc) - Get specific profile by ID

### Course Endpoints
- [GET All Courses](https://f25-cisc474-individual-2.onrender.com/courses) - Get all courses
- [GET Course by ID](https://f25-cisc474-individual-2.onrender.com/courses/cmfoaxs2n000v87esjuc6z1qs) - Get specific course by ID

### Enrollment Endpoints
- [GET All Enrollments](https://f25-cisc474-individual-2.onrender.com/enrollments) - Get all enrollments
- [GET Enrollment by ID](https://f25-cisc474-individual-2.onrender.com/enrollments/cmfoaxs6l001187es1hdn4jnd) - Get specific enrollment by ID


### Assignment Endpoints
- [GET All Assignments](https://f25-cisc474-individual-2.onrender.com/assignments) - Get all assignments
- [GET Assignment by ID](https://f25-cisc474-individual-2.onrender.com/assignments/cmfoaxsl4001j87ese5xxo1jv) - Get specific assignment by ID

### Submission Endpoints
- [GET All Submissions](https://f25-cisc474-individual-2.onrender.com/submissions) - Get all submissions
- [GET Submission by ID](https://f25-cisc474-individual-2.onrender.com/submissions/1) - Get specific submission by ID
- [GET Submissions by UserID](https://f25-cisc474-individual-2.onrender.com/submissions/user/1) - Get all submissions for a specific user

### Category Endpoints
- [GET All Categories](https://f25-cisc474-individual-2.onrender.com/categories) - Get all categories
- [GET Category by ID](https://f25-cisc474-individual-2.onrender.com/categories/1) - Get specific category by ID

### Post Endpoints
- [GET All Posts](https://f25-cisc474-individual-2.onrender.com/posts) - Get all posts
- [GET Post by ID](https://f25-cisc474-individual-2.onrender.com/posts/1) - Get specific post by ID
- [GET Posts by UserID](https://f25-cisc474-individual-2.onrender.com/posts/user/1) - Get all posts by a specific user

### Comment Endpoints
- [GET All Comments](https://f25-cisc474-individual-2.onrender.com/comments) - Get all comments
- [GET Comment by ID](https://f25-cisc474-individual-2.onrender.com/comments/1) - Get specific comment by ID

## Parameter Types Explained

### ID vs UserID Parameters

**ID Parameters** (`/endpoint/:id`):
- These refer to the **primary key** of the specific entity
- Used to get a single, specific record by its unique identifier
- Examples: `/users/1`, `/courses/abc123`, `/posts/xyz789`
- Returns: Single object or null

**UserID Parameters** (`/endpoint/user/:userId`):
- These refer to the **user ID** that owns or is associated with the entity
- Used to get all records associated with a specific user
- Examples: `/enrollments/user/1`, `/submissions/user/1`, `/posts/user/1`
- Returns: Array of objects (can be empty if no records found)

### Examples

- **Get a specific user**: `GET /users/1` (returns user with ID=1)
- **Get all enrollments for user**: `GET /enrollments/user/1` (returns all enrollments where userId=1)
- **Get a specific submission**: `GET /submissions/abc123` (returns submission with ID=abc123)
- **Get all submissions by user**: `GET /submissions/user/1` (returns all submissions where studentId=1)

## Notes

- All GET endpoints return JSON data
- The database is seeded with sample data during deployment
- Some endpoints may return empty arrays if no data exists
- ID-based endpoints will return `null` if the specified ID doesn't exist
- UserID-based endpoints will return an empty array `[]` if no records are found for that user
- UserID parameters use the actual user ID from the database, not the enrollment/submission/post ID