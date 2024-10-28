import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItems";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((existingarray) => [
      { id: Date.now(), ...todo },
      ...existingarray,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((existingarray) =>
      existingarray.map((existingTodo) =>
        existingTodo.id === id ? todo : existingTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((existingarray) =>
      existingarray.filter((existingTodo) => existingTodo.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setTodos((existingarray) =>
      existingarray.map((existingTodo) =>
        existingTodo.id === id
          ? { ...existingTodo, completed: !existingTodo.completed }
          : existingTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="bg-[#223a5f] ring-2 w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
