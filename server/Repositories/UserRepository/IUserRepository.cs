using server.Models;

namespace server.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(int id);
        Task CreateUser(User user);
        Task UpdateUser(User user);
    }
}