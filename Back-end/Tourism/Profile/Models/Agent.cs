using System.ComponentModel.DataAnnotations;

namespace Profile.Models
{
    public class Agent
    {
        [Key]
        public int customer_id { get; set; }
        public string? agent_name { get; set; }
        public string? agency_name { get; set; }

        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid mobile number")]
        public long agent_mobile { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? email_id { get; set; }
        public string? password { get; set; }
        public string? status { get; set; } = "waiting";
    }
}
