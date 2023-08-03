using System.ComponentModel.DataAnnotations.Schema;

namespace Authentication.Models
{
    public class Image_Gallery
    {
        public int Id { get; set; }
        public string image { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
    }
}
