using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Package.Interface;
using Package.Models;
using System.Net;

namespace Package.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackService service;
        public PackageController(IPackService _service)
        {
            service = _service;
        }
        [HttpGet("Location/getall")]
        public async Task<ICollection<Location>> GetLocation()
        {
            return await service.GetLocations();
        }
        [HttpGet("Packages")]
        public async Task<ICollection<Packages>> GetPackages()
        {
            return await service.GetPackages();
        }
        [HttpGet("Itinerary/get/all")]
        public async Task<ICollection<Itinerary>> GetItinerary()
        {
            return await service.GetItinerary();
        }

        [HttpGet("Location/{id}")]
        public async Task<Location> GetId(int id)
        {
            return await service.GetLocationById(id);
        }

        [HttpPost("Location")]
        public async Task<ActionResult<Location>> PostBooking([FromForm] Location location)
        {
            try
            {
                Location location1 = await service.PostLocation(location);
                return Ok(location1);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during image update: {ex.Message}");
            }
        }

        [HttpDelete("Location/{id}")]
        public async Task<Location> Delete(int id)
        {
            return await service.DeleteLocation(id);
        }


        [HttpGet("Packages/{id}")]
        public async Task<Packages> GetPackageById(int id)
        {
            return await service.GetPackageById(id);
        }

        [HttpGet("GetPackage/ByLocationId/{id}")]
        public async Task<List<Packages>> GetPackageByLocId(int id)
        {
            return await service.GetPackagesByLocation(id);
        }
        [HttpGet("GetItinerary/ByPackageId/{id}")]
        public async Task<List<Itinerary>> GetItineraryByLocId(int id)
        {
            return await service.GetItineraryByPackageId(id);
        }
        [HttpPost("Packages")]
        public async Task<ActionResult<Packages>> PostPackages([FromForm]Packages packages)
        {
            try
            {
                Packages packages1 = await service.PostPackage(packages);
                return Ok(packages1);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during image update: {ex.Message}");
            }
        }

        [HttpDelete("Packages/{id}")]
        public async Task<Packages> DeletePackage(int id)
        {
            return await service.DeletePackage(id);
        }



        [HttpGet("Itinerary/{id}")]
        public async Task<Itinerary> GetItineraryById(int id)
        {
            return await service.GetItineraryById(id);
        }

        [HttpPost("Itinerary")]
        public async Task<ActionResult<Itinerary>> PostItinerary([FromForm]Itinerary itinerary)
        {
            try
            {
                Itinerary itinerary1 = await service.PostItinerary(itinerary);
                return Ok(itinerary1);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during image update: {ex.Message}");
            }
        }

        [HttpDelete("Itinerary/{id}")]
        public async Task<Itinerary> DeleteItinerary(int id)
        {
            return await service.DeleteItinerary(id);
        }
    }
}
