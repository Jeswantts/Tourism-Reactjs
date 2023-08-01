using System.ComponentModel.DataAnnotations;

namespace Booking.Models
{
    public class Bookings
    {
        [Key]
        public int booking_id { get; set; }

        [Required(ErrorMessage = "Hotel ID is required")]
        public int hotel_id { get; set; }

        [Required(ErrorMessage = "Room ID is required")]
        public int room_id { get; set; }

        [Required(ErrorMessage = "Package ID is required")]
        public int package_id { get; set; }

        [Required(ErrorMessage = "Booking date is required")]
        public DateTime booking_date { get; set; }

        [Required(ErrorMessage = "Check-in date is required")]
        public DateTime checkin { get; set; }

        [Required(ErrorMessage = "Check-out date is required")]
        public DateTime checkout { get; set; }
    }
}
