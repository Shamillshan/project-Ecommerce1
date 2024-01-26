const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080


 //mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
     type : String,
     unique : true,
    },
    password: String,
    confirmPassword: String,
    image : String
})

//model
const userModel = mongoose.model("user",userSchema)

//api
app.get("/",(req,res)=>{
    res.send("Server is running")
})

//signup
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    
        try {
            const existingUser = await userModel.findOne({ email: email });
    
            if (existingUser) {
                res.status(409).json({ message: 'Email is already registered' , alert : false });
            } else {
                const newUser = new userModel(req.body);
                const savedUser = await newUser.save();
                res.status(200).json({ message: 'Successfully signed up' , alert : true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    //api login
        app.post("/login", async (req, res) => {
            console.log(req.body);
            const { email } = req.body;
        
            try {
                const result = await userModel.findOne({ email: email });
        
                if (result) {
                    console.log(result);
                    const dataSend = {
                        _id: result._id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        image: result.image,
                    };
                    console.log(dataSend);
                    res.status(200).json({ message: 'Login is successful', alert: true, data: dataSend });
                } else {
                    res.status(404).json({ message: "This email-id doesn't exist, please Signup", alert: false });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        //product section

        const schemaProduct = mongoose.Schema({
            name : String,
            category : String,
            image : String,
            price : String,
            description : String,
        })
        const productModel = mongoose.model("product",schemaProduct)


        //save the product in database
        //api
        app.post("/uploadProduct",async(req,res)=>{
            console.log(req.body)
            const data = await productModel(req.body)
            const datasave = await data.save()
            res.send({message : "upload successfully"})
        })

    //
    app.get("/product",async(req,res)=>{
        const data = await productModel.find({})
        res.send(JSON.stringify(data))
    })
              
    //server is running
app.listen(PORT,()=>console.log("server is running at port : " + PORT))
