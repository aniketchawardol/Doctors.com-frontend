import { useState } from "react";
import "../App.css";
function PatientList({ patients }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleClose = () => {
    setSelectedPatient(null);
  };

  return (
    <div>
      {/* Minimized List */}
      <ul className="flex space-x-4 overflow-x-auto p-4 rounded-xl bg-white shadow-xl">
        {patients.map((patient) => (
          <li
            key={patient._id}
            onClick={() => handleSelectPatient(patient)}
            className="transition ease-in-out duration-200 flex flex-col items-center bg-white shadow-lg rounded-xl p-4 w-40 cursor-pointer hover:shadow-xl"
          >
            <img
              src={patient.profilephoto}
              alt={`${patient.fullname}'s profile`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-center text-md font-medium mt-2">
              {patient.fullname}
            </div>
          </li>
        ))}
      </ul>

      {/* Maximized View */}
      {selectedPatient && (
        <div className="transition fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-xl p-6 shadow-xl">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600"
            >
              ✖
            </button>
            <div className="flex flex-col sm:flex-row w-full mb-4 rounded-2xl shadow-2xl">
          <div className="flex-shrink-0 m-2 ">
            {selectedPatient.profilephoto ? (
              <img
                src={selectedPatient.profilephoto}
                alt="Profile"
                className="w-32 h-32 m-2 shadow-xl rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 m-4 shadow-xl rounded-full bg-gray-300 flex items-center justify-center text-white">
                No Photo
              </div>
            )}
          </div>
          <div className="w-full shadow-2xl bg-white p-4 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-lg inline font-semibold">Full Name: </p>
              <p className="text-md inline">{selectedPatient.fullname}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Date of Birth: </p>
              <p className="text-md inline">{selectedPatient.dob}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Email: </p>
              <p className="text-md inline">{selectedPatient.email}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Phone Number: </p>
              <p className="text-md inline">{selectedPatient.phonenumber}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Blood Group: </p>
              <p className="text-md inline">{selectedPatient.bloodgroup}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Gender: </p>
              <p className="text-md inline">{selectedPatient.gender}</p>
            </div>
          </div>
        </div>
            {selectedPatient.reports.length > 0 && (
              <>
              <h2>Reports</h2>
              <ul className="flex flex-row gap-4 overflow-x-auto ">
                {selectedPatient.reports.map((photo) => (
                  <li key={photo} className="flex items-center flex-shrink-0 gap-3">
                    <a href={photo} target="_blank" rel="noopener noreferrer">
                    <img src={photo} className="h-[150px] inline object-contain" alt="report" />
                    </a>
                  </li>
                ))}
              </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;
