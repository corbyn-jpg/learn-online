namespace LearnOnline.Models
{
    
    public class User
    {
        public int Id {get; set;}
        public string Username {get; set;} = "@sum";
        private string Password {get; set;} = "eg. 123";

        public enum Role
        {
            user,
            admin
        }
    }

}