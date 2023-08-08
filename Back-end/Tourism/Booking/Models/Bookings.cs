using System.ComponentModel.DataAnnotations;

namespace Booking.Models
{
    public class Bookings
    {
        [Key]
        public int booking_id { get; set; }
        public int customer_id { get; set; }
        public int location_id { get; set; }
        public string location_name { get; set; }
        public int package_id { get; set; }
        public string package_name { get; set; }
        public string passenger_id { get; set; }
        public int num_passengers { get; set; }
        public string passenger_name { get; set; }
        public decimal total_price { get; set; }
        public string duration { get; set; }
        public string email { get; set; }
        public long contact { get; set; }
        public string status { get; set; }
        public DateTime booking_date { get; set; }
    }
}
