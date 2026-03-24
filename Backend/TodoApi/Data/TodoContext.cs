using Microsoft.EntityFrameworkCore;
using LearnOnline.Models;

namespace LearnOnline.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}