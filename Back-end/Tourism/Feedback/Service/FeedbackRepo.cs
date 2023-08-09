using Feedback.Context;
using Feedback.Interface;
using Feedback.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Service
{
    public class FeedbackRepo : IFeedback
    {
        private readonly FeedbackContext _Context;
        public FeedbackRepo(FeedbackContext con)
        {
            _Context = con;

        }
        public IEnumerable<Hotel_Rating> GetHotel_Rating()
        {
            return _Context.hrating.ToList();
        }
        public Hotel_Rating GetHotel_RatingById(int rating_id)
        {
            try
            {
                return _Context.hrating.FirstOrDefault(x => x.rating_id == rating_id);

            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public Hotel_Rating PostHotel_Rating(Hotel_Rating Hotel_Rating)
        {
            try
            {
                _Context.hrating.Add(Hotel_Rating);
                _Context.SaveChanges();
                return Hotel_Rating;
            }

            catch (Exception ex)
            {
                return null;
            }

        }

        public IEnumerable<Rating> GetRating()
        {
            return _Context.rating.ToList();
        }
        public Rating GetRatingById(int rating_id)
        {
            try
            {
                return _Context.rating.FirstOrDefault(x => x.rating_id == rating_id);

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Rating> PostRating(Rating Rating)
        {
            try
            {
                 _Context.rating.Add(Rating);
                 _Context.SaveChanges();
                return Rating;
            }

            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<decimal>> GetRatingValues(int packageId)
        {
            List<decimal> ratingValues = await _Context.rating
                .Where(r => r.package_id == packageId)
                .Select(r => r.rating) 
                .ToListAsync();

            return ratingValues;
        }

    }
}
