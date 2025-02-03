const Student = require("../models/student.model.js");
const Record_Status = require('../constants/recordstatus.constants.js');
const PAGINATION_LIMIT = require('../constants/pagination.limit.constants.js');
const Marks = require("../models/marks.model.js");

// Create Student Api

const createStudent = async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await Student.create({
            ...studentData,
            createdBy: studentData.email,
        });
        return res.status(201).json({ message: "Student created successfully", newStudent });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    };
};

// Fetched Single Student Api

const getStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        // Fetch the student with associated marks
        const student = await Student.findByPk(studentId, {
            include: [{
                model: Marks,
                as: 'marks', // This should match the alias defined in the association
                attributes: ['id', 'subject', 'score']
            }],
            attributes: ['id', 'fullname', 'email', 'age', 'dob', 'recordstatus']
        });
        return res.status(200).json({ message: 'Student Details Fetched', student });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    };
};

// Delete Student Api

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        // Update the record status instead of deleting making soft delete
        await Student.update(
            {
                recordstatus: Record_Status.IN_ACTIVE
            },
            {
                where: {
                    id: studentId
                }
            }
        );
        // Fetch the updated student data
        const studentUpdated = await Student.findByPk(studentId);
        if (!studentUpdated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json({ message: 'Student Deleted Sucessfully', studentUpdated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });

    };
};

const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        // Calculate the offset
        const offset = (page - 1) * PAGINATION_LIMIT;
        // Get total count and paginated students
        const { count, rows: students } = await Student.findAndCountAll({
            where: {
                recordstatus: Record_Status.Active
            },
            limit: PAGINATION_LIMIT,
            offset: offset,
            order: [['id', 'ASC']] // Order by id ascending

        });
        // Calculate total pages
        const totalPages = Math.ceil(count / PAGINATION_LIMIT);
        // Validate requested page number
        if (page > totalPages) {
            return res.status(400).json({
                message: `Page ${page} does not exist. Total pages available: ${totalPages}`
            });
        }
        // Prepare pagination metadata
        const metadata = {
            currentPage: page,
            recordsPerPage: PAGINATION_LIMIT,
            totalRecords: count,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        };
        // await Student.findAll({
        //     where: {
        //         recordstatus: Record_Status.Active // Only get active students
        //     }
        // });
        return res.status(200).json({ message: 'All Students Fetched', metadata, students });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    };
}

const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentData = req.body;
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await Student.update(
            {
                ...studentData,
                updatedBy: studentData.email,
            },
            {
                where: {
                    id: studentId
                }
            }
        );
        // Fetch the updated student data
        const studentUpdated = await Student.findByPk(studentId);
        if (!studentUpdated) {
            return res.status(404).json({ message: 'Student not found' });
        };
        return res.status(200).json({ message: 'Student Updated Sucessfully', studentUpdated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    };
}

module.exports = {
    createStudent,
    getStudent,
    deleteStudent,
    getAllStudents,
    updateStudent
};




