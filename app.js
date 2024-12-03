const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const xlsx = require('xlsx');
const path = require('path');
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Read data from Excel
function readExcelData() {
  const workbook = xlsx.readFile('students.xlsx');
  const sheet_name_list = workbook.SheetNames;
  const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  
  return xlData.map((student) => ({
    Name: student.Name,
    Email: student.Email,
    Password: student.Password,
    Major: student.Major,
    PhotoUrl: student.PhotoUrl,
    Age: student.Age,
    Gender: student.Gender
  }));
}

// Write data to Excel
function writeExcelData(data) {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Students');
  xlsx.writeFile(wb, 'students.xlsx');
}

// Home Route (Login Page)
app.get('/', (req, res) => {
  res.render('login', { message: null });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const students = readExcelData();
  const student = students.find(s => s.Email === email);

  if (!student) {
    return res.render('login', { message: 'Invalid email or password' });
  }

  bcrypt.compare(password, student.Password, (err, result) => {
    if (err || !result) {
      return res.render('login', { message: 'Invalid email or password' });
    }

    // Password matched, render profile page
    res.render('profile', {
      student: {
        Name: student.Name,
        Email: student.Email,
        Major: student.Major,
        PhotoUrl: student.PhotoUrl,
        Age: student.Age,
        Gender: student.Gender
      }
    });
  });
});

// Signup Route
app.get('/signup', (req, res) => {
  res.render('signup', { message: null });
});

app.post('/signup', async (req, res) => {
  const { name, email, password, major, photoUrl, age, gender } = req.body;

  // Hash the password before saving to Excel
  const hashedPassword = await bcrypt.hash(password, 10);

  // Read the existing students data from Excel
  const students = readExcelData();

  // Create a new student object
  const newStudent = {
    Name: name,
    Email: email,
    Password: hashedPassword,  // Save the hashed password
    Major: major,
    PhotoUrl: photoUrl,
    Age: age,
    Gender: gender
  };

  // Add the new student to the data
  students.push(newStudent);

  // Write updated data back to Excel
  writeExcelData(students);

  // Redirect to login page after successful signup
  res.render('login', { message: 'Signup successful! Please login.' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
