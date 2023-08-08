using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel.Models
{
    public class Hotels
    {
        [Key]
        public int hotel_id { get; set; }

        [Required(ErrorMessage = "Hotel name is required")]
        public string? hotel_name { get; set; }

        [Required(ErrorMessage = "Hotel location is required")]
        public string? hotel_location { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? hotel_email { get; set; }

        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number should be 10 digits")]
        public long hotel_phone { get; set; }

        public string? hotel_image { get; set; }

        public string? detailed_location { get; set; }

        public string? amenities { get; set; }

        public string? hotel_types { get; set; }

        public string? whats_nearby { get; set; }

        public string? policies { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
    }
}
