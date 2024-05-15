const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
app.use(express.json());
const bodyParser = require("body-parser")
const cors = require("cors")

dotenv.config(); 
Port = process.env.Port || 4000;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.text());

database.connect();

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and running....'
	});
});   

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todos");

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", todoRoutes);

app.listen(Port,()=>{
    console.log(`Server is running at Port ${Port}`);
})
