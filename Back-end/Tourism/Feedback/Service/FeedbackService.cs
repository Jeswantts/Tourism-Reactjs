using Feedback.Context;
using Feedback.Interface;
using Feedback.Models;

namespace Feedback.Service
{
    public class FeedbackService : IFeedService
    {
        private readonly IFeedback _repo;
        public FeedbackService(IFeedback repo)
        {
            _repo = repo;

        }
        public IEnumerable<Hotel_Rating> GetHotel_Rating()
        {
            return _repo.GetHotel_Rating();
        }

        public Hotel_Rating GetHotel_RatingById(int rating_id)
        {
            return _repo.GetHotel_RatingById(rating_id);
        }

        public IEnumerable<Rating> GetRating()
        {
            return _repo.GetRating();
        }

        public Rating GetRatingById(int rating_id)
        {
            return _repo.GetRatingById(rating_id);
        }

        public Hotel_Rating PostHotel_Rating(Hotel_Rating Hotel_Rating)
        {
            return _repo.PostHotel_Rating(Hotel_Rating);      
        }

        public async Task<Rating> PostRating(Rating Rating)
        {
            return await _repo.PostRating(Rating);
        }
        public async Task<decimal> GetAverageRating(int packageId)
        {
            List<decimal> ratingValues = await _repo.GetRatingValues(packageId);

            if (ratingValues.Count == 0)
            {
                return 0; 
            }

            decimal averageRating = ratingValues.Average();
            return averageRating;
        }

    }
}
