namespace Profile.Models.DTO
{
    public class ChangePass_DTO
    {
        public int customer_id { get; set; }
        public string Password { get; set; }
        public string HashedPassword { get; set; }
    }
}
