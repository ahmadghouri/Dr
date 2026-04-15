const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getServices, getServiceById, createService, updateService, deleteService,
    getProjects, getProjectById, createProject, updateProject, deleteProject,
    getBlogs, getBlogById, createBlog, updateBlog, deleteBlog,
    getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor,
    getAbout, updateAbout,
    getContactMessages, createContactMessage
} = require('../controllers/contentController');

// Services
router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.post('/services', protect, admin, upload.single('image'), createService);
router.put('/services/:id', protect, admin, upload.single('image'), updateService);
router.delete('/services/:id', protect, admin, deleteService);

// Projects
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', protect, admin, upload.single('image'), createProject);
router.put('/projects/:id', protect, admin, upload.single('image'), updateProject);
router.delete('/projects/:id', protect, admin, deleteProject);

// Blogs
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs', protect, admin, upload.single('image'), createBlog);
router.put('/blogs/:id', protect, admin, upload.single('image'), updateBlog);
router.delete('/blogs/:id', protect, admin, deleteBlog);

// Doctors
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);
router.post('/doctors', protect, admin, upload.single('image'), createDoctor);
router.put('/doctors/:id', protect, admin, upload.single('image'), updateDoctor);
router.delete('/doctors/:id', protect, admin, deleteDoctor);

// About
router.get('/about', getAbout);
router.put('/about', protect, admin, upload.single('image'), updateAbout);

// Contact
router.post('/contact', createContactMessage);
router.get('/contact', protect, admin, getContactMessages);

module.exports = router;
