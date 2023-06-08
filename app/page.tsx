"use client";
import { todoController } from "@client/controller/todo";
import { Todo } from "@client/model/todo";
import { GlobalStyles } from "@theme/GlobalStyles";
import { formatedDate } from "@utils/formatedDate";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState("");

  const initialLoadComplete = useRef(false);
  const isLoading = useRef(true);

  const filteredTodos: Todo[] = todoController.filterTodosByContent({
    todoList,
    search,
  });

  const hasMorePages = totalPages > page;
  const hasNoTodos = filteredTodos.length === 0;
  const hasRepeatedTodo = todoList.find(
    (todo) => todo.content.toLowerCase() === newTodoContent.toLowerCase()
  );

  const handleSearchTodo = (event: ChangeEvent<HTMLInputElement>) => {
    const valueSearch = event.target.value;
    setSearch(valueSearch);
  };

  const handleSetNewTodo = (event: ChangeEvent<HTMLInputElement>) => {
    const newTodo = event.target.value;
    setNewTodoContent(newTodo);
  };

  const handlePage = () => {
    isLoading.current = true;
    const nextPage = page + 1;
    setPage(nextPage);

    todoController
      .get({ page: nextPage, limit: 2 })
      .then(({ todos, pages }) => {
        setTodoList((oldTodos) => [...oldTodos, ...todos]);
        setTotalPages(pages);
      })
      .finally(() => {
        isLoading.current = false;
      });
  };

  const handleCreateTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasRepeatedTodo) {
      setNewTodoContent("");
      toast.error(
        "Há uma tarefa com a mesma descrição. Crie uma tarefa diferente!"
      );
      return;
    }

    todoController.create({
      content: newTodoContent,
      onError: () => {
        toast.error("Preencha o campo antes de cadastrar uma nova tarefa");
      },
      onSuccess: (todo) => {
        setTodoList((oldTodos) => [...oldTodos, todo].reverse());
        setNewTodoContent("");
        toast.success("Tarefa criada com sucesso!");
      },
    });
  };

  const handleDeleteTodoById = (id: string) => {
    todoController
      .deleteTodoById(id)
      .then(() => {
        setTodoList((currentTodos) =>
          currentTodos.filter((currentTodo) => currentTodo.id !== id)
        );
        toast.success("Tarefa deletada!", { icon: "🪓" });
      })
      .catch(() => {
        toast.error("Não foi possível deletar a tafera");
      });
  };

  useEffect(() => {
    if (!initialLoadComplete.current) {
      todoController
        .get({ page, limit: 2 })
        .then(({ todos, pages }) => {
          setTodoList(todos);
          setTotalPages(pages);
        })
        .finally(() => {
          isLoading.current = false;
          initialLoadComplete.current = true;
        });
    }
  }, []);

  const formatedTodoList = filteredTodos.map(({ id, date, content, done }) => (
    <tr key={`${id}`}>
      <td>
        <input
          type="checkbox"
          checked={done}
          onChange={() => {
            todoController.toggleDone({
              id,
              onError() {
                toast.error("Falha ao atualizar a TODO...");
              },
              onSuccess() {
                !done &&
                  toast.success("Parabéns! Você concluiu mais uma tarefa");
              },
              updateTodoOnScreen() {
                setTodoList((currentTodos) => {
                  return currentTodos.map((currentTodo) => {
                    if (currentTodo.id === id) {
                      return {
                        ...currentTodo,
                        done: !currentTodo.done,
                      };
                    }
                    return currentTodo;
                  });
                });
              },
            });
          }}
        />
      </td>
      <td>{!done ? id.substring(0, 5) : <s>{id.substring(0, 5)}</s>}</td>
      <td>{!done ? content : <s>{content}</s>}</td>
      <td>{!done ? formatedDate(date) : <s>{formatedDate(date)}</s>}</td>
      <td align="right">
        <button data-type="delete" onClick={() => handleDeleteTodoById(id)}>
          Apagar
        </button>
      </td>
    </tr>
  ));

  return (
    <main>
      <GlobalStyles themeName={"yellow"} />
      <header
        className="bg-pan-left"
        style={{ backgroundImage: `url("/bg.avif")` }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form onSubmit={handleCreateTodo}>
          <input
            type="text"
            placeholder="Correr, Estudar..."
            value={newTodoContent}
            onChange={handleSetNewTodo}
          />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            placeholder="Filtrar lista atual, ex: Dentista"
            onChange={handleSearchTodo}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th align="left">Data</th>
              <th align="center">Ação</th>
            </tr>
          </thead>

          <tbody>
            {formatedTodoList}

            {isLoading.current && (
              <tr>
                <td colSpan={5} align="center" style={{ textAlign: "center" }}>
                  Carregando...
                </td>
              </tr>
            )}

            {hasNoTodos ? (
              <tr>
                <td colSpan={5} align="center">
                  Nenhum item encontrado
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5} align="center">
                  <button
                    data-type="load-more"
                    onClick={handlePage}
                    disabled={!hasMorePages}
                  >
                    Página {page} - Carregar mais{" "}
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        fontSize: "1.2em",
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Toaster position="top-center" />
    </main>
  );
}

export default HomePage;
