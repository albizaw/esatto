using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;

namespace server.Services.PatientService
{
    public class PatientService : IPatientService
    {
        private readonly AppDbContext _context;

        private readonly IMapper _mapper;

        public PatientService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PatientDTO> AddPatient(PatientDTO patientDto, string userId)
        {
            var doctorId = int.Parse(userId);

            var existingPatient = _context.Patients.FirstOrDefault(p => p.PESEL == patientDto.PESEL);
            if (existingPatient != null)
            {
                throw new ArgumentException($"A patient with this PESEL already exists.");
            }

            var patient = _mapper.Map<Patient>(patientDto);
            patient.UserId = doctorId;

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return _mapper.Map<PatientDTO>(patient);
        }

        public async Task DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                throw new KeyNotFoundException($"Patient with ID {id} not found.");
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

        }

        public async Task<PatientDTO> EditPatient(int id, PatientDTO patientDto)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                throw new KeyNotFoundException($"Patient with ID {id} not found.");
            }

            if (patient.PESEL != patientDto.PESEL)
            {

                var existingPatientWithPESEL = await _context.Patients
                    .AnyAsync(p => p.PESEL == patientDto.PESEL);
                if (existingPatientWithPESEL)
                {
                    throw new InvalidOperationException("PESEL must be unique.");
                }
            }

            _mapper.Map(patientDto, patient);
            await _context.SaveChangesAsync();

            return _mapper.Map<PatientDTO>(patient);

        }


        public async Task<PatientDTO> GetPatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                throw new KeyNotFoundException($"Patient with ID {id} not found.");
            }
            return _mapper.Map<PatientDTO>(patient);
        }


        public async Task<IEnumerable<PatientDTO>> GetPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            return _mapper.Map<IEnumerable<PatientDTO>>(patients);
        }

        public async Task<IEnumerable<PatientDTO>> GetPatientsByUserId(string userId)
        {

            int parsedUserId = int.Parse(userId);

            var patients = await _context.Patients
                                         .Where(p => p.UserId == parsedUserId)
                                         .ToListAsync();

            return _mapper.Map<IEnumerable<PatientDTO>>(patients);
        }


    }
}