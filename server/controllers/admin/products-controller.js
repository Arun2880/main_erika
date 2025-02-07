const { ImageUploadUtil } = require("../../helper/Cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const results = [];

    // Process each uploaded file
    for (const file of req.files) {
      // Convert file to Base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const url = "data:" + file.mimetype + ";base64," + b64;

      // Upload image to Cloudinary
      const result = await ImageUploadUtil(url);

      // Store the result (e.g., Cloudinary URL) for each image
      results.push(result);
    }
    console.log(results);

    // Return the results of all uploads
    res.json({
      success: true,
      results,  // Array of results for each image uploaded
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error uploading images",
    });
  }
};

//add a new products
const addProduct = async (req, res) => {
  try {
    // Destructure the incoming data (including images)
    const { image, title, description, detail, benefits, category, brand, price, salePrice, totalStock } = req.body;

    // Check if images are provided, if not, return an error
    if (!image || image.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one image for the product.",
      });
    }

    // Create a new product with the provided data
    const newlyCreatedProduct = new Product({
      image,  // Save multiple images as an array
      title, 
      description, 
      detail,
      benefits,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    console.log("add title:", title);
    
    // Save the new product to the database
    await newlyCreatedProduct.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      data: "Product added successfully",
    });

  } catch (error) {
    console.log(error);

    // Handle errors
    res.status(500).json({
      success: false,
      message: "Error adding product",
    });
  }
}



//fetch all the producta

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
    })
  }
}


//edit a product

const editProduct = async (req, res) => {
  
  try {
    
    const {id}= req.params;
    const { image, title, description, detail,benefits, category, brand, price, salePrice, totalStock } = req.body;

    

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    findProduct.title = title || findProduct.title;

    findProduct.description = description || findProduct.description;

    findProduct.detail = detail || findProduct.detail;

    findProduct.benefits = benefits || findProduct.benefits;

    findProduct.category = category || findProduct.category;

    findProduct.brand = brand || findProduct.brand;

    findProduct.price = price === ''? 0: price || findProduct.price;

    findProduct.salePrice = salePrice ===''? 0 : salePrice || findProduct.salePrice;

    findProduct.totalStock = totalStock || findProduct.totalStock;

    findProduct.image = image || findProduct.image


    
    await findProduct.save();
    res.status(200).json({
      success: true,

      message: "product Edited",
      data: findProduct,
    });


  }
  catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error adding product",
    })
  }
}


//delete a product

const deleteProduct = async (req, res) => {
  try {

    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);

    if(!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }
    res.status(200).json({
      succes: true,
      message : "Product deleted SuccessFully",
    })

  
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
    })
  }
}




module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };