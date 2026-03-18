using Microsoft.EntityFrameworkCore;
using TodoTest.Models;

namespace TodoTest.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {

        }

        public DbSet<TodoItem> Todos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}