<h1># Doctors.com Frontend </h1>

visit the website <a href="https://doctors-production.onrender.com/">here</a>

## Overview
The frontend of Doctors.com is a user-friendly interface that provides seamless interaction with the backend features. Built using modern web technologies, the website enables patients and hospitals to manage reports, search for hospitals, and authenticate users efficiently.

## Features
- **User Authentication:**
  - Secure login and registration for patients and hospitals.
  - Token-based authentication to ensure session security.

- **Dashboard:**
  - Personalized dashboard for both patients and hospitals.
  - Patients can view their uploaded reports and submission history.
  - Hospitals can manage received reports and view patient details.

- **File Uploads:**
  - button-based upload for patient reports.

- **Search Functionality:**
  - Search for hospitals by name using a dynamic search bar.
  - View hospital details, including contact information and location.

- **Report Management:**
  - Submit reports to selected hospitals directly.
  - View and manage previously uploaded reports.

- **Responsive Design:**
  - Optimized for tablet, and desktop devices.

- **Interactive Notifications:**
  - Alerts and messages for successful actions or errors.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aniketchawardol/doctors.git
   cd doctors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
   ```env
   VITE_SERVER_URL=your_backend_api_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Technologies Used
- **React.js:** Framework for building the user interface.
- **Tailwind CSS:** For responsive and modern styling.
- **React Router:** For navigation and route management.

---

## Available Pages

### 1. Home Page
- Landing page with a brief overview of the platform.
- Quick links to login or register.

### 2. Login and Registration Pages
- Secure forms for patient and hospital authentication.
- Password validation and error handling.

### 3. Dashboard
#### Patient Dashboard
- List of uploaded reports.
- Option to upload new reports.
- Delete existing reports.
- Submission history.

#### Hospital Dashboard
- List of received reports.
- View patient details.

### 4. Search Page
- Dynamic search bar to find hospitals by name.
- Display of relevant hospital details.

---

## Integration with Backend
- **API Endpoints:** All features are integrated with the backend via RESTful API calls.
- **Error Handling:** User-friendly error messages for failed requests or invalid actions.

---

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.


