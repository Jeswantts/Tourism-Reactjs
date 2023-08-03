using Package.Context;
using Package.Interface;
using Package.Models;

namespace Package.Service
{
    public class PackageService : IPackService, IPackage
    {
        private readonly IPackService service;
        public PackageService(IPackService service)
        {
            this.service = service;
        }
        public async Task<Itinerary> DeleteItinerary(int id)
        {
            return await service.DeleteItinerary(id);
        }

        public async Task<Location> DeleteLocation(int id)
        {
            return await service.DeleteLocation(id);
        }

        public async Task<Packages> DeletePackage(int id)
        {
            return await service.DeletePackage(id);
        }

        public async Task<Itinerary> GetItineraryById(int id)
        {
            return await service.GetItineraryById(id);
        }

        public async Task<Location> GetLocationById(int id)
        {
            return await service.GetLocationById(id);
        }

        public async Task<Packages> GetPackageById(int id)
        {
            return await service.GetPackageById(id);
        }

        public async Task<Itinerary> PostItinerary(Itinerary itinerary)
        {
            return await service.PostItinerary(itinerary);
        }

        public async Task<Location> PostLocation(Location location)
        {
            return await service.PostLocation(location);
        }

        public async Task<Packages> PostPackage(Packages packages)
        {
            return await service.PostPackage(packages);
        }
    }
}
