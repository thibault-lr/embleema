import React, { useState } from 'react';

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
};

const patients = [
  { id: 1, firstName: 'William', lastName: 'Miller' },
  { id: 2, firstName: 'Emily', lastName: 'Gonzalez' },
];

function App() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [open, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', width: open ? '20vw' : '100vw' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '20px', borderRight: '2px solid #ccc' }}>
        <h2>Patients List</h2>
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.id}
              style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #eee' }}
              onClick={() => setSelectedPatient(patient)}
            >
              {patient.firstName} {patient.lastName}
            </li>
          ))}
        </ul>
      </div>
      {selectedPatient && (
        <div style={{ flex: 2, overflow: 'auto', padding: '20px' }}>
          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
            onClick={() => {
              setSelectedPatient(null);
              console.log('ok');
            }}
          >
            <h2>Patient Details</h2>

            <div style={{ padding: 2 }}>
              <span>X</span>
            </div>
          </div>

          <div>
            <p>
              <strong>First Name:</strong> {selectedPatient.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedPatient.lastName}
            </p>
            {/* Render more patient details here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
