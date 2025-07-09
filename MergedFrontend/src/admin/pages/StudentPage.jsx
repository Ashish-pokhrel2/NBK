import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Faculty: "",
    Year: "",
    Email: "",
    Number: "",
    password: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState("");

  // Function to set default password
  const setDefaultPassword = () => {
    setFormData(prev => ({ ...prev, password: 'student@123' }));
  };

  // Function to generate a random password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/student/list");
      setStudents(res.data.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in Number field
    if (name === "Number" && /[^0-9A-Za-z]/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "Year" ? (value ? parseInt(value, 10) : "") : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      Name: "",
      Faculty: "",
      Year: "",
      Email: "",
      Number: "",
      password: "",
    });
    setIsEditMode(false);
    setEditEmail("");
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.Name || !formData.Faculty || !formData.Year || !formData.Email || !formData.Number) {
      Swal.fire("Error!", "Please fill in all required fields.", "error");
      return;
    }

    if (!isEditMode && !formData.password) {
      Swal.fire("Error!", "Password is required for new students.", "error");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      Swal.fire("Error!", "Password must be at least 6 characters long.", "error");
      return;
    }

    const payload = {
      name: formData.Name,
      faculty: formData.Faculty,
      year: formData.Year,
      email: formData.Email,
      number: formData.Number,
    };

    // For new students, password is required and always included
    // For editing, only include password if it's provided (to change it)
    if (!isEditMode) {
      payload.password = formData.password;
    } else if (formData.password) {
      payload.password = formData.password;
    }

    try {
      if (isEditMode) {
        await axios.put(`/student/update/${editEmail}`, payload);
        Swal.fire({
          title: "Updated!",
          html: `
            <p>Student information updated successfully.</p>
            ${formData.password ? `<p><strong>New password set!</strong></p>` : ''}
            <p><strong>Login Details:</strong></p>
            <p>Registration Number: <strong>${formData.Number}</strong></p>
            ${formData.password ? `<p>Password: <strong>${formData.password}</strong></p>` : '<p>Password: <em>Unchanged</em></p>'}
          `,
          icon: "success"
        });
      } else {
        await axios.post("/student/create", payload);
        Swal.fire({
          title: "Added!",
          html: `
            <p>New student added successfully.</p>
            <p><strong>Student Login Credentials:</strong></p>
            <p>Registration Number: <strong>${formData.Number}</strong></p>
            <p>Password: <strong>${formData.password}</strong></p>
            <p><em>The student can now log in to access notifications using these credentials.</em></p>
          `,
          icon: "success"
        });
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      
      let errorMessage = "Something went wrong.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Swal.fire("Error!", errorMessage, "error");
    }
  };

  const handleEdit = (student) => {
    setFormData({
      Name: student.Name,
      Faculty: student.Faculty,
      Year: student.Year,
      Email: student.Email,
      Number: student.Number,
      password: "", // Don't prefill password for security
    });
    setEditEmail(student.Email);
    setIsEditMode(true);
  };

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/student/delete/${email}`);
        Swal.fire("Deleted!", "The student has been deleted.", "success");
        fetchStudents();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete student.", "error");
        console.error("Delete error:", error);
      }
    }
  };

  // Enable login access for a student
  const handleEnableLogin = async (student) => {
    const { value: password } = await Swal.fire({
      title: "Enable Login Access",
      html: `
        <p>Set a password for <strong>${student.Name}</strong></p>
        <p>Registration Number: <strong>${student.Number}</strong></p>
      `,
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter password (min. 6 characters)",
      inputAttributes: {
        minlength: 6,
        autocapitalize: "off",
        autocorrect: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Enable Login",
      inputValidator: (value) => {
        if (!value) {
          return "Password is required";
        }
        if (value.length < 6) {
          return "Password must be at least 6 characters";
        }
      }
    });

    if (password) {
      try {
        // First, set a new password
        await axios.put(`/student/reset-password/${student.Email}`, {
          newPassword: password
        });

        // Then, enable login access
        await axios.put(`/student/toggle-login/${student.Email}`, {
          loginAccess: true
        });

        Swal.fire({
          title: "Login Enabled!",
          html: `
            <p>Login access enabled for <strong>${student.Name}</strong></p>
            <p><strong>Login Credentials:</strong></p>
            <p>Registration Number: <strong>${student.Number}</strong></p>
            <p>Password: <strong>${password}</strong></p>
            <p><em>Student can now log in to access notifications.</em></p>
          `,
          icon: "success"
        });
        fetchStudents();
      } catch (error) {
        Swal.fire("Error!", "Failed to enable login access.", "error");
        console.error("Enable login error:", error);
      }
    }
  };

  // Disable login access for a student
  const handleDisableLogin = async (student) => {
    const result = await Swal.fire({
      title: "Disable Login Access?",
      html: `
        <p>This will disable login access for <strong>${student.Name}</strong></p>
        <p>The student will no longer be able to log in to view notifications.</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, disable login",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`/student/toggle-login/${student.Email}`, {
          loginAccess: false
        });

        Swal.fire("Disabled!", "Login access has been disabled.", "success");
        fetchStudents();
      } catch (error) {
        Swal.fire("Error!", "Failed to disable login access.", "error");
        console.error("Disable login error:", error);
      }
    }
  };

  // Reset password for a student
  const handleResetPassword = async (student) => {
    const { value: formValues } = await Swal.fire({
      title: "Reset Password",
      html: `
        <p>Reset password for <strong>${student.Name}</strong></p>
        <p>Registration Number: <strong>${student.Number}</strong></p>
        <div style="margin: 20px 0;">
          <input id="new-password" type="password" class="swal2-input" placeholder="New password (min. 6 chars)" minlength="6">
          <input id="confirm-password" type="password" class="swal2-input" placeholder="Confirm password" minlength="6">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Reset Password",
      preConfirm: () => {
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!newPassword || !confirmPassword) {
          Swal.showValidationMessage('Please fill in both password fields');
          return false;
        }
        if (newPassword.length < 6) {
          Swal.showValidationMessage('Password must be at least 6 characters');
          return false;
        }
        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('Passwords do not match');
          return false;
        }
        return { newPassword, confirmPassword };
      }
    });

    if (formValues) {
      try {
        await axios.put(`/student/update/${student.Email}`, {
          name: student.Name,
          faculty: student.Faculty,
          year: student.Year,
          email: student.Email,
          number: student.Number,
          password: formValues.newPassword
        });

        Swal.fire({
          title: "Password Reset!",
          html: `
            <p>Password reset successful for <strong>${student.Name}</strong></p>
            <p><strong>New Login Credentials:</strong></p>
            <p>Registration Number: <strong>${student.Number}</strong></p>
            <p>New Password: <strong>${formValues.newPassword}</strong></p>
          `,
          icon: "success"
        });
        fetchStudents();
      } catch (error) {
        Swal.fire("Error!", "Failed to reset password.", "error");
        console.error("Reset password error:", error);
      }
    }
  };

  // Generate passwords for students without login access
  const generateBulkPasswords = async () => {
    const studentsWithoutAccess = students.filter(s => !s.password || s.password === 'password123');
    
    if (studentsWithoutAccess.length === 0) {
      Swal.fire("Info", "All students already have login access.", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Generate Bulk Passwords",
      html: `
        <p>This will generate random passwords for <strong>${studentsWithoutAccess.length}</strong> students who don't have login access:</p>
        <ul style="text-align: left; margin: 10px 0;">
          ${studentsWithoutAccess.map(s => `<li>• ${s.Name} (${s.Number})</li>`).join('')}
        </ul>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Generate Passwords",
    });

    if (result.isConfirmed) {
      try {
        const credentials = [];
        
        for (const student of studentsWithoutAccess) {
          const randomPassword = Math.random().toString(36).slice(-8);
          
          await axios.put(`/student/update/${student.Email}`, {
            name: student.Name,
            faculty: student.Faculty,
            year: student.Year,
            email: student.Email,
            number: student.Number,
            password: randomPassword
          });
          
          credentials.push({
            name: student.Name,
            registrationNo: student.Number,
            password: randomPassword
          });
        }

        // Show generated credentials
        const credentialsHtml = credentials.map(c => 
          `<tr><td style="padding: 5px; border: 1px solid #ddd;">${c.name}</td>
           <td style="padding: 5px; border: 1px solid #ddd;">${c.registrationNo}</td>
           <td style="padding: 5px; border: 1px solid #ddd; font-family: monospace;">${c.password}</td></tr>`
        ).join('');

        Swal.fire({
          title: "Passwords Generated!",
          html: `
            <p><strong>${credentials.length}</strong> passwords generated successfully:</p>
            <table style="width: 100%; margin: 10px 0; border-collapse: collapse;">
              <tr style="background: #f5f5f5;">
                <th style="padding: 5px; border: 1px solid #ddd;">Name</th>
                <th style="padding: 5px; border: 1px solid #ddd;">Registration No.</th>
                <th style="padding: 5px; border: 1px solid #ddd;">Password</th>
              </tr>
              ${credentialsHtml}
            </table>
            <p><em>Make sure to share these credentials with the students securely.</em></p>
          `,
          icon: "success",
          width: 600
        });
        
        fetchStudents();
      } catch (error) {
        Swal.fire("Error!", "Failed to generate passwords.", "error");
        console.error("Bulk password generation error:", error);
      }
    }
  };

  // Export student credentials
  const exportStudentCredentials = () => {
    const studentsWithAccess = students.filter(s => s.loginAccess);
    
    if (studentsWithAccess.length === 0) {
      Swal.fire("Info", "No students have login access to export.", "info");
      return;
    }

    const csvContent = [
      'Name,Registration Number,Email,Faculty,Year,Login Status',
      ...studentsWithAccess.map(s => 
        `"${s.Name}","${s.Number}","${s.Email}","${s.Faculty}",${s.Year},"${s.loginAccess ? 'Enabled' : 'Disabled'}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_credentials_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    Swal.fire({
      title: "Export Complete!",
      text: `Exported ${studentsWithAccess.length} students with login access.`,
      icon: "success"
    });
  };

  // Export all students in CSV format for editing/re-importing
  const exportAllStudents = () => {
    if (students.length === 0) {
      Swal.fire("Info", "No students found to export.", "info");
      return;
    }

    const csvContent = [
      'Name,Registration Number,Email,Faculty,Year',
      ...students.map(s => 
        `"${s.Name}","${s.Number}","${s.Email}","${s.Faculty}",${s.Year}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_students_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    Swal.fire({
      title: "Export Complete!",
      text: `Exported ${students.length} students in CSV format.`,
      icon: "success"
    });
  };

  // CSV Import functionality
  const handleCSVImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          Swal.fire("Error!", "CSV file must contain at least a header and one data row.", "error");
          return;
        }

        const header = lines[0].toLowerCase();
        // Expected format: Name,Registration Number,Email,Faculty,Year or similar
        if (!header.includes('name') || !header.includes('email') || !header.includes('faculty')) {
          Swal.fire("Error!", "CSV must contain Name, Email, and Faculty columns.", "error");
          return;
        }

        const dataLines = lines.slice(1);
        const results = {
          successful: [],
          failed: [],
          total: dataLines.length
        };

        // Show progress dialog
        Swal.fire({
          title: 'Importing Students...',
          text: `Processing ${dataLines.length} students`,
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          }
        });

        for (let i = 0; i < dataLines.length; i++) {
          const line = dataLines[i];
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          
          if (values.length < 5) {
            results.failed.push({
              line: i + 2,
              data: line,
              error: 'Insufficient columns (expected: Name, Registration Number, Email, Faculty, Year)'
            });
            continue;
          }

          const [name, number, email, faculty, year] = values;
          
          if (!name || !number || !email || !faculty || !year) {
            results.failed.push({
              line: i + 2,
              data: line,
              error: 'Missing required fields'
            });
            continue;
          }

          try {
            await axios.post("/student/create", {
              name: name,
              faculty: faculty,
              year: parseInt(year),
              email: email,
              number: number,
              password: "student@123" // Default password
            });

            results.successful.push({
              name,
              email,
              number,
              password: "student@123"
            });
          } catch (error) {
            results.failed.push({
              line: i + 2,
              data: line,
              error: error.response?.data?.message || "Failed to create student"
            });
          }
        }

        // Show results
        const successCount = results.successful.length;
        const failCount = results.failed.length;
        
        let resultHtml = `
          <div style="text-align: left;">
            <h4>Import Summary:</h4>
            <p>✅ Successfully imported: <strong>${successCount}</strong> students</p>
            <p>❌ Failed: <strong>${failCount}</strong> students</p>
        `;

        if (results.successful.length > 0) {
          resultHtml += `
            <h5>Successfully Created Students:</h5>
            <div style="max-height: 200px; overflow-y: auto; background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0;">
          `;
          results.successful.forEach(student => {
            resultHtml += `
              <div style="margin: 5px 0; font-family: monospace; font-size: 12px;">
                <strong>${student.name}</strong> (${student.number})<br>
                Email: ${student.email}<br>
                Password: <strong>${student.password}</strong>
              </div>
            `;
          });
          resultHtml += `</div>`;
        }

        if (results.failed.length > 0) {
          resultHtml += `
            <h5>Failed Imports:</h5>
            <div style="max-height: 150px; overflow-y: auto; background: #fff5f5; padding: 10px; border-radius: 4px; margin: 10px 0;">
          `;
          results.failed.forEach(fail => {
            resultHtml += `
              <div style="margin: 5px 0; font-size: 12px;">
                <strong>Line ${fail.line}:</strong> ${fail.error}<br>
                <code style="background: #eee; padding: 2px;">${fail.data}</code>
              </div>
            `;
          });
          resultHtml += `</div>`;
        }

        resultHtml += `</div>`;

        await Swal.fire({
          title: "Import Complete!",
          html: resultHtml,
          icon: successCount > 0 ? "success" : "warning",
          width: '600px'
        });

        // Refresh student list
        fetchStudents();

      } catch (error) {
        Swal.fire("Error!", "Failed to process CSV file: " + error.message, "error");
      }
    };
    input.click();
  };

  // Download CSV template for importing
  const downloadCSVTemplate = () => {
    const csvTemplate = [
      'Name,Registration Number,Email,Faculty,Year',
      'John Doe,2024001,john.doe@example.com,Engineering,1',
      'Jane Smith,2024002,jane.smith@example.com,Computer Science,2',
      'Mike Johnson,2024003,mike.johnson@example.com,Business,3'
    ].join('\n');

    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    Swal.fire({
      title: "Template Downloaded!",
      html: `
        <div style="text-align: left;">
          <p>CSV template downloaded successfully.</p>
          <h4>Instructions:</h4>
          <ol style="margin: 10px 0; padding-left: 20px;">
            <li>Fill in the CSV with student data</li>
            <li>Keep the header row: <code>Name,Registration Number,Email,Faculty,Year</code></li>
            <li>Ensure all fields are filled for each student</li>
            <li>Default password will be set to: <strong>student@123</strong></li>
            <li>Use the "Import CSV" button to upload the completed file</li>
          </ol>
        </div>
      `,
      icon: "info",
      width: '500px'
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-800">
          Student List
        </h1>

        {/* Student Form */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isEditMode ? "Edit Student" : "Add Student"}
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {["Name", "Faculty", "Email", "Number"].map((field) => (
              <div key={field} className="flex items-center space-x-2 w-[900px]">
                <label className="font-medium w-82 text-right">{field}:</label>
                <input
                  type={field === "Email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.toLowerCase()}`}
                  className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isEditMode && field === "Email"}
                  inputMode={field === "Number" ? "numeric" : undefined}
                  maxLength={field === "Number" ? 10 : undefined}
                />
              </div>
            ))}

            {/* Year Dropdown */}
            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right">Year:</label>
              <select
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Year</option>
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
              </select>
            </div>

            {/* Password Field */}
            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right">Password:</label>
              <div className="flex-1 flex space-x-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isEditMode ? "Enter new password (leave blank to keep current)" : "Enter password for student login"}
                  className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={setDefaultPassword}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  title="Set default password (student@123)"
                >
                  Default
                </button>
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                  title="Generate random password"
                >
                  Generate
                </button>
              </div>
            </div>
            
            {/* Password Note */}
            <div className="flex items-center space-x-2 w-[900px]">
              <div className="w-82"></div>
              <p className="flex-1 text-sm text-gray-600 italic">
                {isEditMode 
                  ? "This password will allow the student to log in and access notifications. Leave blank to keep current password."
                  : "This password will allow the student to log in and access notifications. Minimum 6 characters required."
                }
              </p>
            </div>
          </form>

          <div className="flex space-x-2 mt-6 ml-124">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update Student" : "Add Student"}
            </button>
            {isEditMode && (
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          {/* Bulk Actions */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Student List ({students.length} students)</h3>
            <div className="flex space-x-2">
              <button
                onClick={generateBulkPasswords}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Generate Bulk Passwords
              </button>
              <button
                onClick={exportStudentCredentials}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Export Credentials
              </button>
              <button
                onClick={exportAllStudents}
                className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
              >
                Export All
              </button>
              <button
                onClick={downloadCSVTemplate}
                className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
              >
                Download Template
              </button>
              <button
                onClick={handleCSVImport}
                className="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
              >
                Import CSV
              </button>
              <button
                onClick={downloadCSVTemplate}
                className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
              >
                Download CSV Template
              </button>
              <button
                onClick={exportAllStudents}
                className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
              >
                Export All Students
              </button>
            </div>
          </div>
          
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Faculty</th>
                <th className="p-2">Year</th>
                <th className="p-2">Email</th>
                <th className="p-2">Registration No.</th>
                <th className="p-2">Login Access</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{student.Name}</td>
                  <td className="p-2">{student.Faculty}</td>
                  <td className="p-2">{student.Year}</td>
                  <td className="p-2">{student.Email}</td>
                  <td className="p-2 font-mono">{student.Number}</td>
                  <td className="p-2">
                    {student.loginAccess ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ✗ Disabled
                      </span>
                    )}
                  </td>
                  <td className="p-2 space-x-2">                    <button
                      onClick={() => handleEdit(student)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.Email)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    {student.loginAccess ? (
                      <button
                        onClick={() => handleDisableLogin(student)}
                        className="text-orange-600 hover:underline"
                        title="Disable login access"
                      >
                        Disable Login
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnableLogin(student)}
                        className="text-green-600 hover:underline"
                        title="Enable login access"
                      >
                        Enable Login
                      </button>
                    )}
                    <button
                      onClick={() => handleResetPassword(student)}
                      className="text-blue-600 hover:underline"
                      title="Reset password"
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudentPage;
