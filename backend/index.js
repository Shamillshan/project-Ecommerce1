  // Import required packages
  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");
  const dotenv = require("dotenv").config();

  // Create an instance of Express
  const app = express();

  // Enable Cross-Origin Resource Sharing (CORS)
  app.use(cors());

  // Enable parsing of JSON data
  app.use(express.json({ limit: "10mb" }));

  // Define the port for the server
  const PORT = process.env.PORT || 8080;

  // MongoDB connection
  console.log(process.env.MONGODB_URL);
  mongoose.set('strictQuery', false);

  mongoose.connect("mongodb+srv://shamil:shamil123@shamilstoreecommerce.6luy2zl.mongodb.net/shamilEcommerce?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define the user schema
  const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });

  // Create the user model
  const userModel = mongoose.model("user", userSchema);

  // Define the product schema
  const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
  });

  // Create the product model
  const productModel = mongoose.model("product", schemaProduct);

  // Define the cart schema
  const cartSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  });

  // Create the cart model
  const cartModel = mongoose.model('cart', cartSchema);

  // Define a route for the root endpoint
  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  // Route for user signup
  app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email: email });

      if (existingUser) {
        res.status(409).json({ message: 'Email is already registered', alert: false });
      } else {
        // Create a new user and save to the database
        const newUser = new userModel({ ...req.body, role: "user" });
        const savedUser = await newUser.save();
        res.status(200).json({ message: 'Successfully signed up', alert: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Route for user login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "Email not found", alert: false });
      }

      // Check if the password is correct
      if (password !== user.password) {
        return res.status(401).json({ message: "Incorrect password", alert: false });
      }

      // Prepare user data to send in the response
      const dataSend = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      };

      // Check if the user is an admin or a regular user
      if (user.isAdmin) {
        return res.status(200).json({
          message: "Admin login successful",
          alert: true,
          data: dataSend,
          isAdmin: true,
          redirectUrl: "/admin"
        });
      } else {
        return res.status(200).json({
          message: "Login successful",
          alert: true,
          data: dataSend,
          isAdmin: false,
          redirectUrl: "/main-page"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error", alert: false, error: error.message });
    }
  });

  // Route to fetch all products
  app.get("/products", async (req, res) => {
    try {
      const products = await productModel.find({});
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

      //
      app.get("/product",async(req,res)=>{
        const data = await productModel.find({})
        res.send(JSON.stringify(data))
    })
              

  // Route to upload a new product
  app.post("/uploadProduct", async (req, res) => {
    console.log(req.body);
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.send({ message: "upload successfully" });
  });

  // Route to fetch a single product by ID
app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  // Route to update a product
  app.put('/products/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, category, price, image } = req.body;

      // Update the product and return the updated data
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        { name, category, price, image },
        { new: true }
      );

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to delete a product
  app.delete('/products/:productId', async (req, res) => {
    try {
      const { productId } = req.params;

      // Find and delete the product by ID
      const deletedProduct = await productModel.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to add an item to the cart
  app.post('/addToCart', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      // Find the user's cart by user ID
      let userCart = await cartModel.findOne({ userId });

      if (!userCart) {
        // If the cart doesn't exist, create a new one
        userCart = new cartModel({ userId, items: [] });
      }

      // Check if the product is already in the cart
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex !== -1) {
        // If the product exists, update the quantity
        userCart.items[existingItemIndex].quantity += quantity || 1;
      } else {
        // If the product is not in the cart, add it
        userCart.items.push({ productId, quantity });
      }

      // Save the updated cart
      await userCart.save();

      res.json({ message: 'Item added to the cart successfully' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to fetch all users
  app.get("/users", async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add this route to handle user deletion
  app.delete('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await userModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  

  // Route to fetch admin dashboard statistics
app.get("/admin/stats", async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const totalUsers = await userModel.countDocuments();

    res.status(200).json({
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add this route to fetch user details by email
app.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare user data to send in the response
    const dataSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };

    res.status(200).json(dataSend);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




  // Start the server
  app.listen(PORT, () => console.log("Server is running at port : " + PORT));
