using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoTest.Data;
using UserTest.Models;

namespace UserTest.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        // //DUMMY DATA - REPLACE SOON
        // private static List<userItem> users = new List<userItem>
        // {
        // new userItem {Id = 0, Task = "Buy Milk", Completed = false},
        // new userItem {Id = 1, Task = "Repair Bike", Completed = false},  
        // new userItem {Id = 2, Task = "Relax", Completed = false},
        // };

        private readonly TodoContext _context;
        public UserController(TodoContext context)
        {
            _context = context;
        }

        //Get
         public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            // return Ok(users); OLD
            return await _context.Users.ToListAsync();

        }
       

}}