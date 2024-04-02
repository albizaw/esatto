using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using server.Configuration;
using server.Models;

namespace server.Helpers
{
    public class JwtHelper
    {

        public static string GenerateJwtToken(User user, JwtSettings jwtSettings)
        {
            var claims = new List<Claim>
          {
              new Claim("userid", user.Id.ToString()),
              new Claim("email", user.Email)
          };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.ExpireDays));


            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}