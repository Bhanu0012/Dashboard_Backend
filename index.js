const express = require("express")
require("./db");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
const port = 3000;


app.use(cors());

app.use(bodyParser.json());


const announceRoutes=require("./routes/announceRoutes")
const courseRoutes=require("./routes/coursesRoutes")
const studentRoutes=require("./routes/studentsRoutes")

app.use("/announcements", announceRoutes)
app.use("/courses", courseRoutes)
app.use("/students", studentRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});