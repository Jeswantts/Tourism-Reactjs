using System.ComponentModel.DataAnnotations.Schema;

namespace Package.Models
{
    public class Location
    {
        public int location_id {  get; set; }
        public string location_name { get; set; }
        public string image { get; set;}

        [NotMapped] 
        public IFormFile file { get; set; }
    }
}
