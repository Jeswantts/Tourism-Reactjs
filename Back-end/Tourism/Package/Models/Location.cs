using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Package.Models
{
    public class Location
    {
        [Key]
        public int location_id {  get; set; }
        public string location_name { get; set; }
        public string image { get; set;}

        [NotMapped] 
        public IFormFile file { get; set; }
    }
}
