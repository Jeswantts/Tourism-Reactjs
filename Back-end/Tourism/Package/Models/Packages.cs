using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Package.Models
{
    public class Packages
    {
        [Key]
        public int package_id { get; set; }

        public int location_id { get; set; }

        public string package_name { get; set;}

        public string package_duration { get; set;}

        public string spots_nearby { get; set;}

        public string speciality { get;set;}

        public int budget { get;set;}

        public string image { get; set;}

        [NotMapped]
        public IFormFile file { get; set;}
    }
}
