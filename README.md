# Special_task_Futureintern_wd
Here’s the updated **README.md** reflecting the simpler setup process:

---

# 🌟 Student Management Web Application  

A **modern and secure Student Management Web Application** designed to handle student data efficiently. Developed during my internship at **FutureIntern** as a Web Developer Intern, this project focuses on responsive design, secure authentication, and seamless user experience.  

---

## 🚀 Features  

### 🔒 Authentication  
- Secure login using `bcrypt.js` for password hashing.  

### 📋 Student Management  
- Add, edit, delete, and manage student records with ease.  

### ⚡ Excel Integration  
- Export and import student data using Excel files with `xlsx`.  

### 🎨 User Interface  
- Beautiful glassmorphism design.  
- Fully responsive for mobile, tablet, and desktop.  

---

## 🛠️ Tech Stack  

- **Frontend**: HTML5, CSS3, JavaScript  
- **Backend**: Node.js, Express.js  
- **Excel Integration**: `xlsx` library  
- **Authentication**: `bcrypt.js`  

---

## ⚙️ Installation and Usage  

### Prerequisites  
- **Node.js** (v14 or later)  
- **npm** (Node Package Manager)  

### Steps to Run  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/your-username/student-management-app.git  
   cd student-management-app  
   ```  

2. **Install Dependencies**  
   ```bash  
   npm install  
   ```  

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory:  
   ```env  
   PORT=3000  
   SECRET_KEY=your-secret-key  
   ```  

4. **Run the Application**  
   In two separate terminals, execute the following commands:  

   **Terminal 1**: Start the application.  
   ```bash  
   node app.js  
   ```  

   **Terminal 2**: Update existing passwords to hashed format (for legacy data).  
   ```bash  
   node updatePasswordsToHash.js  
   ```  

5. **Access the Application**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)  

---

## 🖥️ Screenshots  

### Login Page  
![Login Page](loginpage.png)  

---

## 📬 Contact  

**Developer**: Ayush Varma  
- **Email**: [varmaayush591@gmail.com)  
- **LinkedIn**: [Ayush Varma](www.linkedin.com/in/ayush-varma-55b09b24b)  

---

⭐ **If you like this project, please give it a star on GitHub!** ⭐  
