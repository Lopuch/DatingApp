namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; } // Kdo likoval
        public int LikeeId { get; set; } // Kdo byl likovan
        public virtual User Liker { get; set; }
        public virtual User Likee { get; set; }
    }
}