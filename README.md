# CampuSphere - Smart Campus Management System

## Overview
CampuSphere is a smart campus management system designed for educational institutions. It provides an efficient way to manage students, teachers, classes, grades, attendance, exams, and other essential academic activities.

## Features
- **User Management**: Admins, Students, Teachers, and Parents have distinct roles and permissions.
- **Class & Grade Management**: Organize students into grades and classes.
- **Attendance Tracking**: Keep records of student attendance for each lesson.
- **Exam & Assignment Management**: Schedule exams, assignments, and record student results.
- **Timetable & Lessons**: Assign teachers to subjects and manage lesson schedules.
- **Events & Announcements**: Notify students and teachers about important campus updates.
- **Secure Authentication**: User authentication with encrypted credentials.

## Database Schema
This project uses a structured database schema to manage different entities:
- **Admin**: Manages the system.
- **Student**: Belongs to a class and has a parent linked.
- **Teacher**: Assigned to subjects and classes.
- **Parent**: Linked to students.
- **Class & Grade**: Structure for organizing students.
- **Subject & Lesson**: Defines courses and schedules.
- **Exam & Assignment**: Manages evaluations and results.
- **Attendance**: Tracks student participation.
- **Events & Announcements**: Provides notifications.

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm (if using a backend with JavaScript/TypeScript)
- PostgreSQL/MySQL (or preferred database)
- Prisma (if using ORM)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/campusphere.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database:
   ```sh
   npx prisma migrate dev --name init
   ```
4. Start the server:
   ```sh
   npm start
   ```


## License
This project is licensed under the MIT License.


