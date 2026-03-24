using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LearnOnline.Data;
using LearnOnline.Models;

namespace LearnOnline.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;
        public TodoController(TodoContext context)
        {
            _context = context;
        }

        //Get
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll()
        {
            return await _context.Todos.ToListAsync();

        }

        //Get all incomplete 
        [HttpGet("incomplete")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetIncomplete()
        {
            return await _context.Todos.Where(t => t.Completed).ToListAsync();
        }

        //Post
        [HttpPost]
        public async Task<ActionResult<TodoItem>> Create(TodoItem item)
        {
            _context.Todos.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeCompleted (int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            return NotFound();
            todo.Completed = !todo.Completed;

             await _context.SaveChangesAsync();
             return NoContent();
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }

}