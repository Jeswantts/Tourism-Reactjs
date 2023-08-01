﻿using System.ComponentModel.DataAnnotations;

namespace Hotel.Models
{
    public class Rooms
    {
        [Key]
        [Required(ErrorMessage = "Room ID is required")]
        public int room_id { get; set; }

        [Required(ErrorMessage = "Hotel ID is required")]
        public int hotel_id { get; set; }

        public string? room_type { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Price must be a non-negative number")]
        public int room_price { get; set; }

        public string? room_image { get; set; }

        public string? room_details { get; set; }

        [RegularExpression("^(available|unavailable)$", ErrorMessage = "Invalid availability. Must be 'available' or 'unavailable'.")]
        public string? availability { get; set; }
    }
}
