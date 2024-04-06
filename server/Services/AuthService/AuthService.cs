using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using server.Configuration;
using server.DTOs;
using server.Helpers;
using server.Models;
using server.Repositories;

namespace server.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        private readonly JwtSettings _jwtSettings;

        public AuthService(IUserRepository userRepository, JwtSettings jwtSettings)
        {
            _userRepository = userRepository;
            _jwtSettings = jwtSettings;
        }

        public async Task RegisterUser(RegisterRequestDTO registerRequest)
        {
            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                throw new Exception("Passwords do not match");
            }

            var existingUser = await _userRepository.GetUserByEmail(registerRequest.Email);

            if (existingUser != null)
            {
                throw new Exception("User with that email already exists");
            }

            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                Email = registerRequest.Email,
                HashedPassword = hasher.HashPassword(null, registerRequest.Password)
            };

            await _userRepository.CreateUser(user);
        }

        public async Task<string> LoginUser(LoginRequestDTO loginRequest)
        {
            var user = await _userRepository.GetUserByEmail(loginRequest.Email);

            if (user == null)
            {
                throw new Exception("User with that email does not exist");
            }

            var hasher = new PasswordHasher<User>();

            if (hasher.VerifyHashedPassword(null, user.HashedPassword, loginRequest.Password) == PasswordVerificationResult.Failed)
            {
                throw new Exception("Incorrect password");
            }

            var token = JwtHelper.GenerateJwtToken(user, _jwtSettings);

            return token;
        }

        public async Task UpdateUserPassword(int userId, UpdatePasswordDTO updatePasswordDTO)
        {
            var user = await _userRepository.GetUserById(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            if (updatePasswordDTO.NewPassword != updatePasswordDTO.ConfirmNewPassword)
            {
                throw new Exception("New passwords do not match");
            }

            var hasher = new PasswordHasher<User>();
            user.HashedPassword = hasher.HashPassword(user, updatePasswordDTO.NewPassword);


            await _userRepository.UpdateUser(user);
        }
    }
}