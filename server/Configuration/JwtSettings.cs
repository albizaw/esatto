using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Configuration
{
    public class JwtSettings
    {
        public string Key { get; set; }
        public int ExpireDays { get; set; }
    }
}