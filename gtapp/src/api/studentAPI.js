import api from "./client";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const student = {
	// Get all students
	getAll: (params) =>
		api.get(API_ENDPOINTS.STUDENTS.GET_ALL, { params }),

	// Get student by ID
	getById: (id) =>
		api.get(API_ENDPOINTS.STUDENTS.GET_BY_ID(id)),

	// Create new student
	create: (data) =>
		api.post(API_ENDPOINTS.STUDENTS.CREATE, data),

	// Update student
	update: (id, data) =>
		api.put(API_ENDPOINTS.STUDENTS.UPDATE(id), data),

	// Delete student
	delete: (id) =>
		api.delete(API_ENDPOINTS.STUDENTS.DELETE(id)),

	// Get students by class ID
	getByClass: (classId) =>
		api.get(API_ENDPOINTS.STUDENTS.GET_BY_CLASS(classId)),
};

export default student;
