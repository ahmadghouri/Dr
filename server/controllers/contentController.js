const Service = require("../models/Service");
const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Doctor = require("../models/Doctor");
const About = require("../models/About");
const Contact = require("../models/Contact");

// Generic helper to get all items
const getItems = (Model) => async (req, res) => {
  try {
    const items = await Model.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generic helper to get a single item by ID
const getItemById = (Model) => async (req, res) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generic helper to create an item
const createItem = (Model) => async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Handle image upload
    if (req.file && req.file.path) {
      data.image = req.file.path;
    }

    // Handle boolean fields
    if (data.isFeatured === 'true') data.isFeatured = true;
    if (data.isFeatured === 'false') data.isFeatured = false;

    // Handle array fields if they come as strings
    const arrayFields = ["features", "benefits", "tags", "education", "experience", "specialization", "points"];
    arrayFields.forEach((key) => {
      if (data[key] !== undefined) {
        if (typeof data[key] === "string") {
          try {
            // Try to parse as JSON first
            const parsed = JSON.parse(data[key]);
            data[key] = Array.isArray(parsed) ? parsed : [parsed];
          } catch (e) {
            // If JSON parse fails, split by comma
            data[key] = data[key].split(",").map((item) => item.trim()).filter((item) => item !== "");
          }
        }
      }
    });

    console.log('Creating item with data:', { ...data, image: data.image ? 'Image present' : 'No image' });

    const newItem = new Model(data);
    const savedItem = await newItem.save();
    
    console.log('Item saved successfully:', savedItem._id);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).json({ message: error.message, stack: error.stack });
  }
};

// Generic helper to update an item
const updateItem = (Model) => async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Handle image upload
    if (req.file && req.file.path) {
      data.image = req.file.path;
    }

    // Handle boolean fields
    if (data.isFeatured === 'true') data.isFeatured = true;
    if (data.isFeatured === 'false') data.isFeatured = false;

    // Handle array fields if they come as strings
    const arrayFields = ["features", "benefits", "tags", "education", "experience", "specialization", "points"];
    arrayFields.forEach((key) => {
      if (data[key] !== undefined) {
        if (typeof data[key] === "string") {
          try {
            const parsed = JSON.parse(data[key]);
            data[key] = Array.isArray(parsed) ? parsed : [parsed];
          } catch (e) {
            data[key] = data[key].split(",").map((item) => item.trim()).filter((item) => item !== "");
          }
        }
      }
    });

    console.log('Updating item:', req.params.id, 'with data:', { ...data, image: data.image ? 'Image present' : 'No image' });

    const updatedItem = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    
    if (!updatedItem) {
      console.log('Item not found:', req.params.id);
      return res.status(404).json({ message: "Item not found" });
    }
    
    console.log('Item updated successfully:', updatedItem._id);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({ message: error.message, stack: error.stack });
  }
};

// Generic helper to delete an item
const deleteItem = (Model) => async (req, res) => {
  try {
    const deletedItem = await Model.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Services ---
const getServices = getItems(Service);
const getServiceById = getItemById(Service);
const createService = createItem(Service);
const updateService = updateItem(Service);
const deleteService = deleteItem(Service);

// --- Projects ---
const getProjects = getItems(Project);
const getProjectById = getItemById(Project);
const createProject = createItem(Project);
const updateProject = updateItem(Project);
const deleteProject = deleteItem(Project);

// --- Blogs ---
const getBlogs = getItems(Blog);
const getBlogById = getItemById(Blog);
const createBlog = createItem(Blog);
const updateBlog = updateItem(Blog);
const deleteBlog = deleteItem(Blog);

// --- Doctors ---
const getDoctors = getItems(Doctor);
const getDoctorById = getItemById(Doctor);
const createDoctor = createItem(Doctor);
const updateDoctor = updateItem(Doctor);
const deleteDoctor = deleteItem(Doctor);

// --- About ---
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateAbout = async (req, res) => {
  try {
    const data = req.body;
    if (req.file && req.file.path) {
      data.image = req.file.path;
    }
    // Handle nested JSON for stats and features if they come as strings
    if (typeof data.stats === "string") data.stats = JSON.parse(data.stats);
    if (typeof data.features === "string")
      data.features = JSON.parse(data.features);

    let about = await About.findOne().sort({ createdAt: -1 });
    if (about) {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    } else {
      about = await About.create(data);
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- Contact ---
const getContactMessages = getItems(Contact);
const createContactMessage = async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAbout,
  updateAbout,
  getContactMessages,
  createContactMessage,
};
