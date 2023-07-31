using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profile.Models
{

    public class Profiles
    {
        [Key]
        public int customer_id { get; set; }


        public string? name { get; set; }

 
        public DateTime dob { get; set; }


        public string? gender { get; set; }


        public string? marital_status { get; set; }


        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid mobile number")]
        public long mobile_number { get; set; }


        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? email_id { get; set; }


        public string? password { get; set; }

        public string? image { get; set; }
    }


}
