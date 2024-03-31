using server.DTOs;
using server.Models;

namespace server.Services
{
    public interface IAuthService
    {
        Task RegisterUser(RegisterRequestDTO registerRequest);
        Task<string> LoginUser(LoginRequestDTO loginRequest);

    }
}