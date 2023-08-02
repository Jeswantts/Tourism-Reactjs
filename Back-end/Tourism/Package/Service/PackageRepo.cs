using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Package.Context;
using Package.Interface;
using Package.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Package.Service
{
    public class PackageRepo : IPackage
    {
        private readonly PackageContext context;
        public PackageRepo(PackageContext _context)
        {
            context = _context;
        }

        public async Task<Location> DeleteLocation(int id)
        {
            var location = await context.locations.FindAsync(id);

            if (location != null)
            {
                context.locations.Remove(location);
                await context.SaveChangesAsync();
            }

            return location;
        }

        public async Task<Itinerary> DeleteItinerary(int id)
        {
            var itinerary = await context.itinerary.FindAsync(id);

            if (itinerary != null)
            {
                context.itinerary.Remove(itinerary);
                await context.SaveChangesAsync();
            }

            return itinerary;
        }

        public async Task<Packages> DeletePackage(int id)
        {
            var package = await context.packages.FindAsync(id);

            if (package != null)
            {
                context.packages.Remove(package);
                await context.SaveChangesAsync();
            }

            return package;
        }

        public async Task<Location> GetLocationById(int id)
        {
            var location = await context.locations.FindAsync(id);
            return location;
        }

        public async Task<Itinerary> GetItineraryById(int id)
        {
            var itinerary = await context.itinerary.FindAsync(id);
            return itinerary;
        }

        public async Task<Packages> GetPackageById(int id)
        {
            var package = await context.packages.FindAsync(id);
            return package;
        }

        public async Task<Location> PostLocation(Location location)
        {
            try
            {
                if (location.file != null)
                {
                    string path = Path.Combine(@"C:\Users\jeswa\OneDrive\Desktop\Kanini\React\api\public\images", location.image);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await location.file.CopyToAsync(stream);
                    }
                }

                context.locations.Add(location);
                await context.SaveChangesAsync();
                return location;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error creating location.", ex);
            }
        }

        public async Task<Itinerary> PostItinerary(Itinerary itinerary)
        {
            try
            {
                if (itinerary.file != null)
                {
                    string path = Path.Combine(@"C:\Users\jeswa\OneDrive\Desktop\Kanini\React\api\public\images", itinerary.image);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await itinerary.file.CopyToAsync(stream);
                    }
                }

                context.itinerary.Add(itinerary);
                await context.SaveChangesAsync();
                return itinerary;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error creating itinerary.", ex);
            }
        }

        public async Task<Packages> PostPackage(Packages packages)
        {
            try
            {
                if (packages.file != null)
                {
                    string path = Path.Combine(@"C:\Users\jeswa\OneDrive\Desktop\Kanini\React\api\public\images", packages.image);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await packages.file.CopyToAsync(stream);
                    }
                }

                context.packages.Add(packages);
                await context.SaveChangesAsync();
                return packages;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error creating packages.", ex);
            }
        }

    }
}
