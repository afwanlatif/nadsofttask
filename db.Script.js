/*
-- Create the students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT CHECK (age > 0),
    dob DATE NOT NULL,
    recordstatus VARCHAR(20) DEFAULT 'Active'
);

-- Create the marks table
CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    studentid INT NOT NULL,
    subject VARCHAR(50) NOT NULL,
    score DECIMAL(5,2) CHECK (score >= 0 AND score <= 100),
    CONSTRAINT fk_marks_student FOREIGN KEY (studentid) REFERENCES students(id) ON DELETE CASCADE
);

 */