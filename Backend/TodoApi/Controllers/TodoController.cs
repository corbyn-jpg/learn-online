using Microsoft.AspNetCore.Mvc;
using TodoTest.Models;
using TodoTest.Data;
using Microsoft.EntityFrameworkCore;

namespace TodoTest.Controllers
{
    //classdb

    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        //DUMMY DATA - REPLACE SOON
        // private static List<TodoItem> todos = new List<TodoItem>
        // {
        //     new TodoItem {Id = 0, Task = "Buy Milk", Completed = false},
        //     new TodoItem {Id = 1, Task = "Repair Bike", Completed = false},
        //     new TodoItem {Id = 2, Task = "Relax", Completed = false}
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

        //Get all complete
        [HttpGet("completed")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetCompleted()
        {
            // return Ok(todos.Where(t => t.Completed)); OLD
            return await _context.Todos.Where(t => t.Completed).ToListAsync();
        }

        //Get all incomplete
        [HttpGet("incompleted")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetInCompleted()
        {
            // return Ok(todos.Where(t => !t.Completed)); OLD
            return await _context.Todos.Where(t => !t.Completed).ToListAsync();
        }

        //POST
        [HttpPost]
        public async Task<ActionResult<TodoItem>> Create(TodoItem item)
        {
            // item.Id = todos.Max(t => t.Id + 1);
            // todos.Add(item);
            // return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item); OLD
            _context.Todos.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeCompleted(int id)
        {
            // var todo = todos.FirstOrDefault(t => t.Id == id);
            // if (todo == null)
            //     return NotFound();
            // todo.Completed = !todo.Completed;
            // return NoContent(); OLD
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();
            todo.Completed = !todo.Completed;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // var todo = todos.FirstOrDefault(t => t.Id == id);
            // if (todo == null)
            //     return NotFound();
            // todos.Remove(todo);
            // return NoContent();
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }

}