const bcrypt = require('bcryptjs');
const xlsx = require('xlsx');
const path = require('path');

// Path to the Excel file
const EXCEL_FILE_PATH = path.join(__dirname, 'students.xlsx');

// Helper function to read Excel data
const readExcelData = () => {
  const workbook = xlsx.readFile(EXCEL_FILE_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(sheet);
};

// Helper function to write Excel data
const writeExcelData = (data) => {
  const newWorkbook = xlsx.utils.book_new();
  const newWorksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Students');
  xlsx.writeFile(newWorkbook, EXCEL_FILE_PATH);
};

// Function to hash passwords and update the Excel file
const updatePasswords = async () => {
  try {
    // Read the student data from the Excel file
    const students = readExcelData();

    // Loop through all students and hash the passwords
    for (let student of students) {
      // If the password is not already hashed (starts with '$2a$'), hash it
      if (student.Password && !student.Password.startsWith('$2a$')) {
        const hashedPassword = await bcrypt.hash(student.Password, 10);
        student.Password = hashedPassword; // Update with the hashed password
      }
    }

    // Write the updated data back to the Excel file
    writeExcelData(students);
    console.log('Passwords have been hashed and updated in the Excel file.');
  } catch (err) {
    console.error('Error updating passwords:', err);
  }
};

// Run the password hashing function
updatePasswords();
