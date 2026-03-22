using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoTest.Data;
using TodoTest.Models;

namespace TodoTest.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        // //DUMMY DATA - REPLACE SOON
        // private static List<TodoItem> todos = new List<TodoItem>
        // {
        // new TodoItem {Id = 0, Task = "Buy Milk", Completed = false},
        // new TodoItem {Id = 1, Task = "Repair Bike", Completed = false},  
        // new TodoItem {Id = 2, Task = "Relax", Completed = false},
        // };

        private readonly TodoContext _context;
        public TodoController(TodoContext context)
        {
            _context = context;
        }

        //Get
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll()
        {
            // return Ok(todos); OLD
            return await _context.Todos.ToListAsync();

        }

        //Get all incomplete 
        [HttpGet("incomplete")] // Route attribute - maps to /api/todo/incomplete
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetIncomplete() // Method that returns filtered todos
        {
            // var incomplete = todos.Where(t => !t.Completed).ToList(); // Filter todos where Completed is false
            // return Ok(incomplete); OLD // Return 200 OK with the incomplete todos list

            return await _context.Todos.Where(t => t.Completed).ToListAsync();
        }

        //Post
        [HttpPost]
        public async Task<ActionResult<TodoItem>> Create(TodoItem item)
        {

            // item.Id = todos.Max(t => t.Id + 1);
            // todos.Add(item);
            // return CreatedAtAction(nameof(GetAll), new {id = item.Id}, item); Old

            _context.Todos.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> ChangeCompleted (int id)
        {
            // var todo = todos.FirstOrDefault(t => t.Id == id);
            // if (todo == null)
            //     return NotFound();

            //     todo.Completed = !todo.Completed;
            //     return NoContent(); OLD

            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            return NotFound();
            todo.Completed = !todo.Completed;

             await _context.SaveChangesAsync();
             return NoContent();


        }

        //Delete
        [HttpDelete("{id}")] // Route attribute - maps to DELETE /api/todo/{id}
        public async Task<IActionResult> Delete(int id) // Method to delete a specific todo by id
        {

              // var todo = todos.FirstOrDefault(t => t.Id == id);
            // if (todo == null)
            //     return NotFound();

            // todos.Remove(todo);
            // return NoContent(); OLD

            var todo = await _context.Todos.FindAsync(id); // Find the todo in database by id
            if (todo == null) // Check if todo exists
                return NotFound(); // Return 404 if not found

            _context.Todos.Remove(todo); // Remove the todo from the database context
            await _context.SaveChangesAsync(); // Save changes to the database
            return NoContent(); // Return 204 No Content on success
        }

    }

}