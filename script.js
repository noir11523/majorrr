// Combined JavaScript for MediCare Clinic

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const registerBtn = document.getElementById('register-btn');
    const userGreeting = document.getElementById('user-greeting');
    const usernameDisplay = document.getElementById('username-display');
    const loginForm = document.getElementById('login-form');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const bookFromViewBtn = document.getElementById('book-from-view');
    const heroBookBtn = document.getElementById('hero-book-btn');
    const registerFromLogin = document.getElementById('register-from-login');
    const loginFromRegister = document.getElementById('login-from-register');
    const bookingForm = document.getElementById('booking-form');
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    const dateInput = document.getElementById('date');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const filterStatus = document.getElementById('filter-status');
    const refreshAppointments = document.getElementById('refresh-appointments');
    const appointmentsList = document.getElementById('appointments-list');
    const printAppointmentBtn = document.getElementById('print-appointment');
    const viewAppointmentsBtn = document.getElementById('view-appointments');
    const patientLoginBtn = document.getElementById('patient-login-btn');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const loginLabel = document.getElementById('login-label');
    const sampleUser = {username: 'user@email.com', password: 'password123'};
    const adminUser = [{username: 'user@wecare.com', password: 'password123'},
    {username: 'user1@wecare.com', password: 'password123'}];
    const nav = document.querySelector('nav ul');
    const ADMIN_PIN = "123456";

    
function showNavLinks() {
    navLinks.forEach(link => link.style.display = 'block');
  }


// Hide nav links initially
  navLinks.forEach(link => link.style.display = 'none');



    

    // Admin functionality
    let appointmentsChart = null;
    const adminCredentials = {
        username: "admin",
        password: "admin123"
    };

    // Calendar instance variable
    let calendar = null;

    // Sample data for doctors and time slots
    const doctorsData = {
        cardiology: [
            { id: 'doc-1', name: 'Dr. Sarah Johnson', availableDays: ['Monday', 'Wednesday', 'Friday'] },
            { id: 'doc-2', name: 'Dr. Robert Smith', availableDays: ['Tuesday', 'Thursday', 'Saturday'] }
        ],
        neurology: [
            { id: 'doc-3', name: 'Dr. Michael Chen', availableDays: ['Monday', 'Tuesday', 'Thursday'] },
            { id: 'doc-4', name: 'Dr. Jennifer Lee', availableDays: ['Wednesday', 'Friday', 'Saturday'] }
        ],
        general: [
            { id: 'doc-5', name: 'Dr. James Brown', availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
            { id: 'doc-6', name: 'Dr. Emily Rodriguez', availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }
        ]
    };
    
    // Sample appointments data
    let appointments = [
        {
            id: 'MC-2023-001',
            department: 'Cardiology',
            doctor: 'Dr. Sarah Johnson',
            date: '2023-06-15',
            patientName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            status: 'upcoming'
        },
        {
            id: 'MC-2023-002',
            department: 'Neurology',
            doctor: 'Dr. Michael Chen',
            date: '2023-05-20',
            patientName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            status: 'completed'
        },
        {
            id: 'MC-2023-003',
            department: 'General Medicine',
            doctor: 'Dr. Jennifer Lee',
            date: '2023-06-01',
            patientName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            status: 'cancelled'
        }
    ];

    // Initialize the page
    init();
    
    function init() {
        // Set current date as min date for appointment
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Load appointments
        renderAppointments();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.id.replace('-link', '-section');
                showSection(sectionId);
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            });
           const registerForm = document.getElementById('register-form');
                if (registerForm) {
                    // First remove any existing listeners to prevent duplicates
                    registerForm.removeEventListener('submit', handleRegisterSubmit);
                    registerForm.addEventListener('submit', handleRegisterSubmit);
                }
        });

        

async function handleRegisterSubmit(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        try {
            const fullNameInput = document.getElementById('reg-name');
            const emailInput = document.getElementById('reg-email');
            const phoneInput = document.getElementById('reg-phone');
            const passwordInput = document.getElementById('reg-password');
            const adminPinInput = document.getElementById('reg-pin'); // Updated ID

            // Debugging: Check if elements are found
            console.log('Full Name:', fullNameInput);
            console.log('Email:', emailInput);
            console.log('Phone:', phoneInput);
            console.log('Password:', passwordInput);
            console.log('Admin Pin:', adminPinInput);

            if (!fullNameInput || !emailInput || !phoneInput || !passwordInput || !adminPinInput) {
                throw new Error("One or more form elements are missing.");
            }

            const formData = {
                fullName: fullNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value,
                adminPin: adminPinInput.value // Ensure this field is included
            };

            const response = await fetch('register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData)
            });

            const data = await response.text();

            if (!response.ok) {
                throw new Error(data);
            }

            alert(data);
            if (data.includes("success")) {
                document.getElementById('register-modal').classList.remove('active');
                document.getElementById('login-modal').classList.add('active');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            submitBtn.disabled = false;
        }
    }

    const emailInput = document.getElementById('reg-email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const adminPinGroup = document.getElementById('admin-pin-group');
            if (adminPinGroup) {
                if (email.endsWith('@wecare.com')) {
                    adminPinGroup.style.display = 'block';
                } else {
                    adminPinGroup.style.display = 'none';
                }
            }
        });
    }




        
function isValidUser(username, password) {
    return adminUser.some(user => user.username === username && user.password === password);
}


// Simplify the login form submission:
document.getElementById('login-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            if (data.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                // Hide login/register buttons
                loginBtn.style.display = 'none';
                registerBtn.style.display = 'none';

                // Show user greeting
                userGreeting.style.display = 'flex';
                usernameDisplay.textContent = data.user.name || data.user.email;

                // Show nav links
                navLinks.forEach(link => link.style.display = 'block');

                // Close login modal
                loginModal.classList.remove('active');
                
                // Store user info in sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
            }
        } else {
            alert(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

// Handle logout
logoutBtn.addEventListener('click', function() {
    // Hide user greeting
    userGreeting.style.display = 'none';

    // Show login/register buttons
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';

    // Hide nav links
    navLinks.forEach(link => link.style.display = 'none');

    // Reset active section to home
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById('home-section').classList.add('active-section');

    // Reset nav active state
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    document.getElementById('home-link').classList.add('active');
    
    // Clear user session
    sessionStorage.removeItem('loggedInUser');
});

function isLoggedIn() {
    return sessionStorage.getItem('loggedInUser') !== null;
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const userData = sessionStorage.getItem('loggedInUser');
    if (userData) {
        const user = JSON.parse(userData);
        
        // Hide login/register buttons
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';

        // Show user greeting
        userGreeting.style.display = 'flex';
        usernameDisplay.textContent = user.name || user.email;

        // Show nav links
        navLinks.forEach(link => link.style.display = 'block');
    }
});

// Event listener for "Book an Appointment" button
heroBookBtn.addEventListener('click', function() {
    if (!isLoggedIn()) {
        alert('Please log in or register first.');
        loginModal.classList.add('active');
    } else {
        showSection('book-section');
        document.querySelectorAll('nav a').forEach(navLink => navLink.classList.remove('active'));
        document.getElementById('book-link').classList.add('active');
    }
});




        
        // Auth buttons
        document.getElementById('login-btn')?.addEventListener('click', () => {
            document.getElementById('login-modal').classList.add('active');
        });
        
        document.getElementById('register-btn')?.addEventListener('click', () => {
            document.getElementById('register-modal').classList.add('active');
        });
        
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('login-modal').classList.remove('active');
                document.getElementById('register-modal').classList.remove('active');
                document.getElementById('confirmation-modal').classList.remove('active');
            });
        });
        
        // Modal switches
        document.getElementById('register-from-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-modal').classList.remove('active');
            document.getElementById('register-modal').classList.add('active');
        });
        
        document.getElementById('login-from-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('register-modal').classList.remove('active');
            document.getElementById('login-modal').classList.add('active');
        });
        
        // Book appointment buttons
        
document.getElementById('hero-book-btn')?.addEventListener('click', () => {
        if (!isLoggedIn()) {
            alert('Please log in or register first.');
            loginModal.classList.add('active');
        } else {
            showSection('book-section');
            document.querySelectorAll('nav a').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('book-link').classList.add('active');
        }
    });

    document.getElementById('book-from-view')?.addEventListener('click', () => {
        if (!isLoggedIn()) {
            alert('Please log in or register first.');
            loginModal.classList.add('active');
        } else {
            showSection('book-section');
            document.querySelectorAll('nav a').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('book-link').classList.add('active');
        }
    });


        departmentSelect?.addEventListener('change', populateDoctors);
        doctorSelect?.addEventListener('change', enableDateInput);
        
        bookingForm?.addEventListener('submit', handleBookingSubmit);
        
        [departmentSelect, doctorSelect, dateInput, nameInput, emailInput, phoneInput].forEach(input => {
            input?.addEventListener('change', updatePreview);
        });

        filterStatus?.addEventListener('change', renderAppointments);
        refreshAppointments?.addEventListener('click', renderAppointments);

        printAppointmentBtn?.addEventListener('click', () => window.print());
        viewAppointmentsBtn?.addEventListener('click', () => {
            confirmationModal.classList.remove('active');
            showSection('view-section');
            document.querySelectorAll('nav a').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('view-link').classList.add('active');
        });
    }
    
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        document.getElementById(sectionId).classList.add('active-section');
    }
    
    function populateDoctors() {
        const department = departmentSelect.value;
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        
        if (department) {
            doctorSelect.disabled = false;
            const doctors = doctorsData[department];
            
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            });
        } else {
            doctorSelect.disabled = true;
            dateInput.disabled = true;
        }
        
        updatePreview();
    }
    
    function enableDateInput() {
        if (doctorSelect.value) {
            dateInput.disabled = false;
            // Update calendar with doctor's available days
            const selectedDoctor = doctorSelect.options[doctorSelect.selectedIndex].text;
            updateCalendar(selectedDoctor);
        } else {
            dateInput.disabled = true;
        }
        
        updatePreview();
    }
    
    function updatePreview() {
        document.getElementById('preview-dept').textContent = departmentSelect.options[departmentSelect.selectedIndex].text || 'Not selected';
        document.getElementById('preview-doc').textContent = doctorSelect.options[doctorSelect.selectedIndex].text || 'Not selected';
        document.getElementById('preview-date').textContent = dateInput.value ? new Date(dateInput.value).toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        }) : 'Not selected';
        document.getElementById('preview-name').textContent = nameInput.value || 'Not provided';
        document.getElementById('preview-email').textContent = emailInput.value || 'Not provided';
        document.getElementById('preview-phone').textContent = phoneInput.value || 'Not provided';
    }
    
    function handleBookingSubmit(e) {
        e.preventDefault();
        
        // Validate required fields
        if (!departmentSelect.value || !doctorSelect.value || !dateInput.value || 
            !nameInput.value || !emailInput.value || !phoneInput.value) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create new appointment
        const newAppointment = {
            id: generateAppointmentId(),
            department: departmentSelect.options[departmentSelect.selectedIndex].text,
            doctor: doctorSelect.options[doctorSelect.selectedIndex].text,
            date: dateInput.value,
            patientName: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            status: 'upcoming'
        };
        
        // Add to appointments array
        appointments.unshift(newAppointment);
        
        // Update confirmation modal
        document.getElementById('confirm-id').textContent = newAppointment.id;
        document.getElementById('confirm-doctor').textContent = newAppointment.doctor;
        document.getElementById('confirm-date').textContent = new Date(newAppointment.date).toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
        
        // Show confirmation modal
        confirmationModal.classList.add('active');
        
        // Reset form
        bookingForm.reset();
        doctorSelect.disabled = true;
        dateInput.disabled = true;
        
        // Update preview
        updatePreview();
        
        // Update appointments list
        renderAppointments();
    }
    
    function generateAppointmentId() {
        const randomNum = Math.floor(Math.random() * 900) + 100;
        return `MC-${new Date().getFullYear()}-${randomNum}`;
    }
    
    function renderAppointments() {
        const statusFilter = filterStatus.value;
        let filteredAppointments = appointments;
        
        if (statusFilter !== 'all') {
            filteredAppointments = appointments.filter(app => app.status === statusFilter);
        }
        
        if (filteredAppointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="no-appointments">
                    <i class="far fa-calendar-alt"></i>
                    <p>No ${statusFilter !== 'all' ? statusFilter : ''} appointments found.</p>
                    <button id="book-from-view">Book Appointment</button>
                </div>
            `;
            
            document.getElementById('book-from-view')?.addEventListener('click', () => {
                showSection('book-section');
                document.querySelectorAll('nav a').forEach(navLink => navLink.classList.remove('active'));
                document.getElementById('book-link').classList.add('active');
            });
        } else {
            appointmentsList.innerHTML = '';
            
            filteredAppointments.forEach(appointment => {
                const appointmentCard = document.createElement('div');
                appointmentCard.className = 'appointment-card';
                
                const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                });
                
                appointmentCard.innerHTML = `
                    <div class="appointment-info">
                        <h4>${appointment.department} - ${appointment.doctor}</h4>
                        <p>${formattedDate}</p>
                        <p>Patient: ${appointment.patientName}</p>
                        <span class="appointment-status status-${appointment.status}">
                            ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                    </div>
                    <div class="appointment-actions">
                        ${appointment.status === 'upcoming' ? 
                            `<button class="btn btn-danger cancel-btn" data-id="${appointment.id}">Cancel</button>` : ''}
                        <button class="btn btn-outline details-btn" data-id="${appointment.id}">Details</button>
                    </div>
                `;
                
                appointmentsList.appendChild(appointmentCard);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.cancel-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const appointmentId = this.getAttribute('data-id');
                    cancelAppointment(appointmentId);
                });
            });
            
            document.querySelectorAll('.details-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const appointmentId = this.getAttribute('data-id');
                    showAppointmentDetails(appointmentId);
                });
            });
        }
    }
    
    function cancelAppointment(appointmentId) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);
            if (appointmentIndex !== -1) {
                appointments[appointmentIndex].status = 'cancelled';
                renderAppointments();
                
                // Show notification
                alert('Appointment has been cancelled.');
            }
        }
    }
    
    function showAppointmentDetails(appointmentId) {
        const appointment = appointments.find(app => app.id === appointmentId);
        if (appointment) {
            const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });
            
            const detailsHtml = `
                <h3>Appointment Details</h3>
                <div class="appointment-details">
                    <p><strong>Appointment ID:</strong> ${appointment.id}</p>
                    <p><strong>Department:</strong> ${appointment.department}</p>
                    <p><strong>Doctor:</strong> ${appointment.doctor}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
                    <p><strong>Email:</strong> ${appointment.email}</p>
                    <p><strong>Phone:</strong> ${appointment.phone}</p>
                    <p><strong>Status:</strong> <span class="status-${appointment.status}">
                        ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span></p>
                </div>
            `;
            
            // Create a modal for details
            const detailsModal = document.createElement('div');
            detailsModal.className = 'modal active';
            detailsModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    ${detailsHtml}
                </div>
            `;
            
            document.body.appendChild(detailsModal);
            
            // Add close event
            detailsModal.querySelector('.close-modal').addEventListener('click', () => {
                detailsModal.remove();
            });
        }
    }

    // Helper function to find doctor by name
    function findDoctorByName(name) {
        for (const department in doctorsData) {
            const doctor = doctorsData[department].find(doc => doc.name === name);
            if (doctor) {
                return doctor;
            }
        }
        return null;
    }

    // Function to update calendar with doctor's available days
    function updateCalendar(doctorName) {
        if (calendar) {
            calendar.destroy();
        }

        const doctor = findDoctorByName(doctorName);
        if (!doctor) {
            console.error("Doctor not found!");
            return;
        }

        const allowedDays = doctor.availableDays;

        // Generate list of available dates in next 14 days
        const today = new Date();
        const availableDates = [];

        for (let i = 0; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            if (allowedDays.includes(dayName)) {
                availableDates.push(date.toISOString().split('T')[0]);
            }
        }

        // Setup flatpickr
        calendar = flatpickr(dateInput, {
            dateFormat: "Y-m-d",
            enable: availableDates,
            minDate: "today",
            maxDate: new Date().fp_incr(14)
        });
    }

    // Admin functions
    function handleAdminLogin(username, password) {
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        if (username === adminCredentials.username && password === adminCredentials.password) {
            // Hide all sections
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show admin section
            document.getElementById('admin-section').classList.add('active-section');
            
            // Close login modal
            document.getElementById('login-modal').classList.remove('active');
            
            // Update UI
            document.querySelector('nav').style.display = 'none';
            document.querySelector('.auth-buttons').innerHTML = '<button id="logout-btn">Logout</button>';
            
            // Set up logout button
            document.getElementById('logout-btn').addEventListener('click', logoutAdmin);
            
            // Initialize dashboard
            initDashboard();
        } else {
            alert('Invalid admin credentials');
        }
    }

    function logoutAdmin() {
        // Show all sections again
        document.querySelector('nav').style.display = 'flex';
        document.querySelector('.auth-buttons').innerHTML = `
            <button id="login-btn">Login</button>
            <button id="register-btn">Register</button>
        `;
        
        // Show home section
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
        });
        document.getElementById('home-section').classList.add('active-section');
        
        // Reset nav active state
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        document.getElementById('home-link').classList.add('active');
        
        // Reinitialize event listeners
        setupEventListeners();
    }

    function initDashboard() {
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dashboard-date').value = today;
        document.getElementById('selected-date-text').textContent = formatDate(today);
        
        // Load data for today
        loadDashboardData(today);
        
        // Set up date change listener
        document.getElementById('dashboard-date').addEventListener('change', function() {
            const selectedDate = this.value;
            document.getElementById('selected-date-text').textContent = formatDate(selectedDate);
            loadDashboardData(selectedDate);
        });
    }

    function loadDashboardData(date) {
        // In a real app, this would fetch from an API
        // For demo purposes, we'll use sample data
        
        // Sample data for the selected date
        const sampleData = {
            total: 24,
            booked: 18,
            completed: 4,
            cancelled: 2,
            appointments: [
                { id: 'MC-2023-101', patient: 'John Doe', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', time: '09:00 AM', status: 'booked' },
                { id: 'MC-2023-102', patient: 'Jane Smith', doctor: 'Dr. Michael Chen', department: 'Neurology', time: '10:30 AM', status: 'booked' },
                { id: 'MC-2023-103', patient: 'Robert Brown', doctor: 'Dr. Emily Rodriguez', department: 'General', time: '11:15 AM', status: 'completed' },
                { id: 'MC-2023-104', patient: 'Alice Johnson', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', time: '02:00 PM', status: 'cancelled' }
            ],
            dailyStats: {
                labels: ['8AM', '10AM', '12PM', '2PM', '4PM'],
                booked: [5, 8, 3, 6, 2],
                completed: [1, 2, 0, 1, 0],
                cancelled: [0, 1, 0, 1, 0]
            }
        };
        
        // Update stats
        document.getElementById('total-appointments').textContent = sampleData.total;
        document.getElementById('booked-appointments').textContent = sampleData.booked;
        document.getElementById('completed-appointments').textContent = sampleData.completed;
        document.getElementById('cancelled-appointments').textContent = sampleData.cancelled;
        
        // Update appointments table
        const tableBody = document.getElementById('admin-appointments-list');
        tableBody.innerHTML = '';
        
        sampleData.appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.patient}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.department}</td>
                <td>${appointment.time}</td>
                <td><span class="appointment-status status-${appointment.status}">${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span></td>
            `;
            tableBody.appendChild(row);
        });
        
        // Update chart
        updateChart(sampleData.dailyStats);
    }

    function updateChart(data) {
        const ctx = document.getElementById('appointments-chart').getContext('2d');
        
        // Destroy previous chart if it exists
        if (appointmentsChart) {
            appointmentsChart.destroy();
        }
        
        appointmentsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Booked',
                        data: data.booked,
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    },
                    {
                        label: 'Completed',
                        data: data.completed,
                        backgroundColor: '#27ae60',
                        borderColor: '#219653',
                        borderWidth: 1
                    },
                    {
                        label: 'Cancelled',
                        data: data.cancelled,
                        backgroundColor: '#e74c3c',
                        borderColor: '#c0392b',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Appointments'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time of Day'
                        }
                    }
                }
            }
        });
    }

    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
});

// Prevent scrolling up past the top
window.addEventListener('scroll', function() {
    if (window.scrollY < 0) {
        window.scrollTo(0, 0);
    }
});

// Alternative method that completely prevents upward scrolling
document.body.style.overscrollBehaviorY = 'none';