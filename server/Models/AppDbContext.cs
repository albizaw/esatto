using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace server.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasIndex(e => e.PESEL).IsUnique();
            });

            var hasher = new PasswordHasher<User>();
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Email = "admin@admin.com",
                HashedPassword = hasher.HashPassword(null, "Admin123@")
            });


            var patients = new List<Patient>();
            for (int i = 1; i <= 20; i++)
            {
                patients.Add(new Patient
                {
                    Id = i,
                    FirstName = $"FirstName{i}",
                    LastName = $"LastName{i}",

                    PESEL = (10000000000L + i).ToString(),
                    City = $"City{i}",
                    Street = $"Street{i}",
                    ZipCode = $"Zip{i}",
                    UserId = 1,
                    IllnessName = $"IllnessName{i}",
                    IllnessDescription = $"IllnessDescription{i}"
                });
            }

            modelBuilder.Entity<Patient>().HasData(patients);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }

    }

}



