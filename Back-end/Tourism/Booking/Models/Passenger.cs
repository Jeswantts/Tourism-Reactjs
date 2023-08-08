using System.ComponentModel.DataAnnotations;

namespace Booking.Models
{
    public class Passenger
    {
        [Key]
        public int passenger_id { get; set; }

        [Required(ErrorMessage = "Customer Id is required.")]
        public int customer_id { get; set; }

        [Required(ErrorMessage = "Personal titles is required")]
        [RegularExpression("^(Mr|Mrs|Ms)$", ErrorMessage = "Invalid personal title")]
        public string personal_titles { get; set; } = string.Empty;


        [Required(ErrorMessage = "First name is required.")]
        [StringLength(40, ErrorMessage = "First name should not exceed 40 characters.")]
        public string first_name { get; set; } = string.Empty;


        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(40, ErrorMessage = "Last name should not exceed 40 characters.")]
        public string last_name { get; set; } = string.Empty;


        [Required(ErrorMessage = "Gender is required.")]
        [RegularExpression("^(male|female|other)$", ErrorMessage = "Invalid gender.")]
        public string gender { get; set; } = string.Empty;


        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string email { get; set; } = string.Empty;


        [Required(ErrorMessage = "Contact number is required.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid contact number.")]
        public long contact_no { get; set; }

    }
}
