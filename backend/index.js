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

mongoose.connect("mongodb+srv://shamil:shamil123@shamilstoreecommerce.6luy2zl.mongodb.net/shamilEcommerce?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect(process.env.MONGODB_URL)
// .then(()=>console.log("Connected to database"))
// .catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// userModel
const userModel = mongoose.model("user", userSchema);

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
                const newUser = new userModel({...req.body, role: "user"});
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
      const { email, password } = req.body;
      try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return res.status(400).json({ message: "Email not found", alert: false });
        }
    
        // Compare passwords
        if (password !== user.password) {
          return res.status(401).json({ message: "Incorrect password", alert: false });
        }
    
        // If passwords match, login successful
        const dataSend = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        };
    
        if (user.isAdmin) {
          // If user is an admin, redirect to admin page
          return res.status(200).json({
            message: "Admin login successful",
            alert: true,
            data: dataSend,
            isAdmin: true,
            redirectUrl: "/admin" // Specify the URL of the admin page
          });
        } else {
          // If user is not an admin, redirect to main page
          return res.status(200).json({
            message: "Login successful",
            alert: true,
            data: dataSend,
            isAdmin: false,
            redirectUrl: "/main-page" // Specify the URL of the main page
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        // Log the error for debugging
        return res.status(500).json({ message: "Internal server error", alert: false, error: error.message });
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
