import { createStudent, deleteStudent, findStudentById, getStudents, updateStudent,getAllStudentsWithSelect,createStudentWithDepartment,sortStudents} from "../handlers/student_controller.js";
import { Router } from "express";

let router = Router();
router.get("/", getStudents);

router.get("/:id", findStudentById);

router.post("/", createStudent);

router.post("/with-department", createStudentWithDepartment);

router.put("/:id", updateStudent);
router.get("/with-select",getAllStudentsWithSelect); 
router.delete("/:id", deleteStudent);
router.get("/sort",sortStudents);


export default router;