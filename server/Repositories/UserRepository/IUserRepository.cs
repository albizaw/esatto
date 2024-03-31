using server.Models;

namespace server.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmail(string email);
        Task CreateUser(User user);
    }
}