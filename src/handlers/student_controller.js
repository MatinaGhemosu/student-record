import prisma from "../db/prisma.js";

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany(
      {
        // select is used to specify which fields to include in the result, while include is used to specify related models to include in the result.
        // please either use "include" or "select" but not both together in the same query, otherwise it will throw an error.
        //  select:{
        //   name:true,rollNo:true,email:true,department:true,enrolment:true,
        //  }
        include: {
          enrollment: {
            include: {
              course: true,
            }
          },
          department:
          {
            select: {
              name: true,
              id: true,
            }
          }
        }
      }
    );
    res.json({ message: "Students retrieved successfully", data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get all students with studdents
const getAllStudentsWithSelect = async (req, res) => {
  let students = await prisma.student.findMany({
    select: {
      name: true,
      email: true,
      rollNo: true,
      department: {
        select: {
          id: true,
          name: true,
        }
      },
      enrollment: true,
    }
  });
res.status(200).json({
      message: "All students with select retrieved successfully",
      data: students,
    })

  }
  // example for orderby or sorting
   const sortStudents=async(req,res)=>{
    let students=await prisma.student.findMany({
      orderBy:{
        name:"asc"
      }
    });
    res.status(200).json({
      message: "Students sorted successfully",
      data: students,
    });
  }
// multi level include example
const findStudentById = async (req, res) => {
    const { id } = req.params;
    let matchStudent = await prisma.student.findUnique({
      where: { id: Number(id) },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
        department: true,

      },
    });
    if (!matchStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({
      message: `Student with ID ${id} retrieved successfully`,
      data: matchStudent,
    });
  };

  const createStudent = async (req, res) => {
    const { name, email, rollNo, departmentId } = req.body;

    let createdStudent = await prisma.student.create({
      data: {
        name,
        email,
        rollNo,
        department: { connect: { id: Number(departmentId) } },
      },
    });
    res.status(201).json({
      message: "Student created successfully",
      data: createdStudent,
    });
  };
  const createStudentWithDepartment = async (req, res) => {
    const { name, email, rollNo, departmentId } = req.body;

    let createdStudent = await prisma.student.create({
      data: {
        name,
        email,
        rollNo,
        department: { connect: { id: Number(departmentId) } },
      },
    });
    res.status(201).json({
      message: "Student created successfully",
      data: createdStudent,
    });
  };

  const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, rollNo } = req.body;

    let updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: { name, email, rollNo },
    });
    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });
  };

  const deleteStudent = async (req, res) => {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "Student deleted successfully",
    });
  };

  export {
    getStudents,
    findStudentById,
    createStudent,
    updateStudent,
    getAllStudentsWithSelect,
    createStudentWithDepartment,
    deleteStudent,
    sortStudents,
  };