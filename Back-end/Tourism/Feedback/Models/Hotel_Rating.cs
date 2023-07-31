using System.ComponentModel.DataAnnotations;

namespace Feedback.Models
{
    public class Hotel_Rating
    {
        [Key]
        [Required(ErrorMessage = "Rating ID is required")]
        public int rating_id { get; set; }

        [Required(ErrorMessage = "Hotel ID is required")]
        public int hotel_id { get; set; }

        public string? customer_name { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime date { get; set; }

        public string? keyword { get; set; }

        public string? description { get; set; }

        [Range(0, 5, ErrorMessage = "Cleanliness rating must be between 0 and 5")]
        public decimal cleanliness { get; set; }

        [Range(0, 5, ErrorMessage = "Hotel service rating must be between 0 and 5")]
        public decimal hotel_service { get; set; }


        [Range(0, 5, ErrorMessage = "Facilities rating must be between 0 and 5")]
        public decimal facilities { get; set; }

        public decimal average { get; set; }
    }
}
