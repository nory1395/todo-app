package Projecttodo.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhols:3000")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;


    @GetMapping
    public List<TodoEntity> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public TodoEntity createTodo(@RequestBody TodoEntity newTodo) {
        return todoRepository.save(newTodo);
    }

    @PutMapping("/{id}")
        public TodoEntity updateTodo(@PathVariable Long id, @RequestBody TodoEntity newTodo) {
        TodoEntity oldTodo = todoRepository.findById(id).orElseThrow();
        oldTodo.setTitle(newTodo.getTitle());
        oldTodo.setCompleted(newTodo.isCompleted());
        return todoRepository.save(oldTodo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }



}
