import { createEnrollment, findEnrollmentById, getAllEnrollments, updateEnrollment, deleteEnrollment ,enrollmentStudentInCourse} from "../handlers/enrollment_controllment.js"
import { Router } from "express";

let router = Router();
router.get("/", getAllEnrollments)
router.get("/:id", findEnrollmentById)
router.post("/", createEnrollment)
router.put("/:id", updateEnrollment)
router.delete("/:id", deleteEnrollment)
router.post("/enroll", enrollmentStudentInCourse) 

export default router