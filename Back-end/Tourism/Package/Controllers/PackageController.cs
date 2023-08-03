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

        [HttpPost("Packages")]
        public async Task<IActionResult> PostPackages([FromForm]Packages packages)
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
        public async Task<IActionResult> PostItinerary([FromForm]Itinerary itinerary)
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
