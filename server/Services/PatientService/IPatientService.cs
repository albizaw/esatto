using server.DTOs;
using server.Models;

namespace server.Services.PatientService
{
    public interface IPatientService
    {
        Task<PatientDTO> AddPatient(PatientDTO patient, string userId);

        Task DeletePatient(int id);
        Task<PatientDTO> EditPatient(int id, PatientDTO patient);
        Task<PatientDTO> GetPatient(int id);
        Task<IEnumerable<PatientDTO>> GetPatients();

    }
}