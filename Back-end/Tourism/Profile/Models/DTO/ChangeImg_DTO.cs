using System.ComponentModel.DataAnnotations.Schema;

namespace Profile.Models.DTO
{
    public class ChangeImg_DTO
    {
        public int customer_id { get; set; }
        public string image { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
    }
}
