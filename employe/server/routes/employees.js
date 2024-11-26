
const express = require('express');

const Employee = require('../models/Employee');
const { emailValidation, mobileNumberValidation } = require('../utils/validations');
const authenticateUser = require('../authMiddleWare');


const router = express.Router();


router.get('/',authenticateUser, async (req, res) => {
  try {

    const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder;

    const searchFilter = search
      ? {
        name: { $regex: search, $options: 'i' },
      }
      : {};

    const employees = await Employee.find(searchFilter)
      .sort(sortCriteria)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalEmployees = await Employee.countDocuments(searchFilter);

    res.json({
      employees,
      pagination: {
        page: pageNumber,
        totalEmployees,
        totalPages: Math.ceil(totalEmployees / pageSize),
        pageSize,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id',authenticateUser, async (req, res) => {
  try {
    const id = req.params?.id;
    console.log(id)
    const employee = await Employee.findById(id);

    res.json({employee});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post('/',authenticateUser, async (req, res) => {
  try {
    const { name, email, designation, gender, courses, img, mobileNo } = req.body;

    if (!emailValidation(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!mobileNumberValidation(mobileNo)) {
      return res.status(400).json({ message: 'Invalid Mobile number format' });
    }

    if (!designation) {
      return res.status(400).json({ message: 'Invalid Designation' });
    }

    if (!courses) {
      return res.status(400).json({ message: 'Invalid Course' });
    }

    if (!img) {
      return res.status(400).json({ message: 'Invalid Image' });
    }


    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      courses,
      img
    });

    await newEmployee.save();
    res.status(200).json({ message: 'Employee data saved successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
});


router.delete('/delete/:id',authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Employee deleted successfully',
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id',authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, designation, gender, courses,img } = req.body;

  if (!emailValidation(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!mobileNumberValidation(mobileNo)) {
    return res.status(400).json({ message: 'Invalid Mobile number format' });
  }

  if (!designation) {
    return res.status(400).json({ message: 'Invalid Designation' });
  }

  if (!courses) {
    return res.status(400).json({ message: 'Invalid Course' });
  }

  if (!img) {
    return res.status(400).json({ message: 'Invalid Image' });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, mobileNo, designation, gender, courses,img },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

module.exports = router;