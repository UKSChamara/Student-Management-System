let express=require('express');
let app=express();
//port number
let port=process.env.port || 3000;
let router = express.Router();
let cors = require('cors');
//insert data
let bodyParser=require("body-parser");
//insert data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/student",router);
app.listen(port,()=>{
    console.log(`Node.js application running on port : ${port}`);
});
//array of json objects
let students=[
    {
        StudentId : 1,
        FirstName : "student",
        LastName : "student",
        email: "student@gmail.com",
        city: "student",
        guardian : 'student',
        course : 'student',
        subject:"student",
        
    }  
];
//get all students
router.get("/",(req,res)=>{
    res.json(students);
});

//Get student based on id
router.get('/:Id',(req,res)=>{ 
    let id =req.params.Id;
    let currentStudent=students.filter((x)=>x.StudentId==id)[0];

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//validate student function
ValidateStudent =(student)=>{
    let message="";

    if(!student.StudentId){
        message="Student id not found";
    }
    
    if(!student.FirstName){
        message="Student FirstName not found";
    }

    if(!student.LastName){
        message="Student LastName not found";
    }


    return message;
}

//create student
router.post("/",(req,res)=>{
    let student =req.body;
    let isValid=ValidateStudent(student);

    if(isValid==""){
        students.push(student);
        console.log(students);
        
        res.status(201).send(students);      
    }else{
        res.statusMessage=isValid;
        res.sendStatus(404);
    }

});

//update
router.put("/:Id",(req,res)=>{
    let StudentId = req.params.Id;
    let student=req.body;
    let currentStudent=students.filter((x)=>x.StudentId==StudentId)[0];

    if(currentStudent){
        let isValid=ValidateStudent(student);
        if(isValid==""){
            currentStudent.FirstName=student.FirstName;
            currentStudent.LastName=student.LastName;
            currentStudent.email = student.email;
            currentStudent.city = student.city; 
            currentStudent.guardian=student.guardian;          
            currentStudent.course=student.course;
            currentStudent.subject=student.subject;

            res.status(200).send(students);
        }else{
            res.statusMessage =isValid;
            res.sendStatus(404);
        }

    }else{
        res.statusMessage="Student does not exist";

        res.sendStatus(404);
    }
})

//delete by id
router.delete("/:Id",(req,res)=>{
    let StudentId=req.params.Id;
    let currentStudent=students.filter((x)=>x.StudentId==StudentId)[0];
    if(currentStudent){
        students=students.filter((x)=>x.StudentId!=StudentId);
        res.statusMessage="Student deleted sucessfully.";
        res.sendStatus(200);
    }else{
        res.statusMessage="Student does not exist";
        res.sendStatus(404);
    }
});



//Get student based on fname
router.get('/firstnames/:name',(req,res)=>{ 
    let name =req.params.name;
    let currentStudent=students.filter((x)=>x.FirstName==name);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});


//Get student based on lname
router.get('/lastnames/:name',(req,res)=>{ 
    let name =req.params.name;
    let currentStudent=students.filter((x)=>x.LastName==name);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});


//Get student based on email
router.get('/emails/:email',(req,res)=>{ 
    let email =req.params.email;
    let currentStudent=students.filter((x)=>x.email==email);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on courses
router.get('/courses/:course',(req,res)=>{ 
    let course =req.params.course;
    let currentStudent=students.filter((x)=>x.course==course);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on guardian
router.get('/guardians/:guardian',(req,res)=>{ 
    let guardian =req.params.guardian;
    let currentStudent=students.filter((x)=>x.guardian==guardian);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on subjects
router.get('/subjects/:subject',(req,res)=>{ 
    let subject =req.params.subject;
    let currentStudent=students.filter((x)=>x.subject==subject);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on city
router.get('/cities/:city',(req,res)=>{ 
    let city =req.params.city;
    let currentStudent=students.filter((x)=>x.city==city);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});