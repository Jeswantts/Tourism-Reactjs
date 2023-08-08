using System.ComponentModel.DataAnnotations;

namespace Booking.Models
{
    public class Payment
    {
        [Key]
        public int payment_id {  get; set; }
        public string card_number { get; set; }
        public string cardholder_name { get; set; }
        public string expiry_month { get; set; }
        public string expiry_year { get; set; }
        public string cvv { get; set; }
    }
}
