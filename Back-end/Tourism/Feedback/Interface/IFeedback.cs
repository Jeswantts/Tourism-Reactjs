using Feedback.Models;

namespace Feedback.Interface
{
    public interface IFeedback
    {
        public IEnumerable<Hotel_Rating> GetHotel_Rating();
        public Hotel_Rating GetHotel_RatingById(int rating_id);
        public Hotel_Rating PostHotel_Rating(Hotel_Rating Hotel_Rating);


        public IEnumerable<Rating> GetRating();
        public Rating GetRatingById(int rating_id);
        public Rating PostRating(Rating Rating);
    }
}
