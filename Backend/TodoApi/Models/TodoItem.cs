namespace LearnOnline.Models
{
    
    public class TodoItem
    {
        public int Id {get; set;}
        public string Task {get; set;} = "Something Todo";

        public bool Completed { get; set; } = false;
    }

}