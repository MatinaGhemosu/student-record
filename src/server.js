import express from "express";
import dotenv from "dotenv";

import studentRouter from "./routes/enrollment_routes.js";
import courseRouter from "./routes/course_routes.js";
import teacherRouter from "./routes/teacher_route.js";
import departmentRouter from "./routes/department_routes.js";
import enrollmentRouter from "./routes/enrollment_routes.js";

import { checkApiKeyInheader, checkXRoleHeaderMiddleware } from "./middleware/header_middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req,res,next)=>{
  console.log("req url:",req.url)
  if( req.url =="/")
    {
      res.json(
        {
          errorMsg:"this url cannot be access"
        }
      )
      return}
      next()
    }
  
  )
  
app.use(checkXRoleHeaderMiddleware)
app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/teachers", teacherRouter);
app.use("/departments", departmentRouter);
app.use("/enrollments", enrollmentRouter);

app.use("/apikey",checkApiKeyInheader,(req,res)=>{
  res.status(200).json({
    mesage:"api key called",
    data:req.headers["x-api-key"]
  })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});