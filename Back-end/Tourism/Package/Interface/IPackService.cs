using Package.Models;

namespace Package.Interface
{
    public interface IPackService
    {
        public Task<ICollection<Location>> GetLocations();
        public Task<Location> GetLocationById(int id);
        public Task<Location> PostLocation(Location location);
        public Task<Location> DeleteLocation(int id);

        public Task<ICollection<Packages>> GetPackages();
        public Task<List<Packages>> GetPackagesByLocation(int id);
        public Task<Packages> GetPackageById(int id);
        public Task<Packages> PostPackage(Packages packages);
        public Task<Packages> DeletePackage(int id);

        public Task<ICollection<Itinerary>> GetItinerary();
        public Task<List<Itinerary>> GetItineraryByPackageId(int id);
        public Task<Itinerary> GetItineraryById(int id);
        public Task<Itinerary> PostItinerary(Itinerary itinerary);
        public Task<Itinerary> DeleteItinerary(int id);
    }
}
