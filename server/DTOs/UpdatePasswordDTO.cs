using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace server.DTOs
{
    public class UpdatePasswordDTO
    {
        public string NewPassword { get; set; }

        public string ConfirmNewPassword { get; set; }

    }
}