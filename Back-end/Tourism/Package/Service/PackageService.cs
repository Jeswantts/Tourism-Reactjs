using Package.Context;
using Package.Interface;
using Package.Models;

namespace Package.Service
{
    public class PackageService : IPackService
    {
        private readonly IPackage service;
        public PackageService(IPackage service)
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

        public async Task<ICollection<Itinerary>> GetItinerary()
        {
            return await service.GetItinerary();
        }

        public async Task<Itinerary> GetItineraryById(int id)
        {
            return await service.GetItineraryById(id);
        }

        public async Task<List<Itinerary>> GetItineraryByPackageId(int id)
        {
            return await service.GetItineraryByPackageId(id);
        }

        public async Task<Location> GetLocationById(int id)
        {
            return await service.GetLocationById(id);
        }

        public async Task<ICollection<Location>> GetLocations()
        {
            return await service.GetLocations();
        }

        public async Task<Packages> GetPackageById(int id)
        {
            return await service.GetPackageById(id);
        }

        public async Task<ICollection<Packages>> GetPackages()
        {
            return await service.GetPackages();
        }

        public async Task<List<Packages>> GetPackagesByLocation(int id)
        {
            return await service.GetPackagesByLocation(id);
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
