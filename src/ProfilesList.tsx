

import "./ProfilesList.css";

function ProfilesList() {
  const profiles = [
    "Departamento",
    "Administración",
    "Torre",
    "Dueño",
    "Administrador",
    "Inquilino",
  ];

  return (
    <div className="profiles-container">
      <h1 className="profiles-title">Lista de Perfiles</h1>
      <ul className="profiles-list">
        {profiles.map((profile, index) => (
          <li key={index} className="profile-item">
            {profile}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfilesList;
  