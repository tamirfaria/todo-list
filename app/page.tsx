"use client";
import { todoController } from "@client/controller/todo";
import { Todo } from "@client/model/todo";
import { GlobalStyles } from "@theme/GlobalStyles";
import { formatedDate } from "@utils/formatedDate";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function HomePage() {
  const initialLoadComplete = useRef(false);
  const isLoading = useRef(true);

  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);

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

  const filteredTodos = todoController.filterTodosByContent({
    todoList,
    search,
  });

  const hasMorePages = totalPages > page;
  const hasNoTodos = filteredTodos.length === 0;

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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const valueSearch = event.target.value;
    setSearch(valueSearch);
  };

  const formatedTodoList = filteredTodos.map(({ id, date, content, done }) => (
    <tr key={`${id}`}>
      <td>
        <input type="checkbox" checked={done} />
      </td>
      <td>{id.substring(0, 5)}</td>
      <td>{content}</td>
      <td>{formatedDate(date)}</td>
      <td align="right">
        <button data-type="delete">Apagar</button>
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
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
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
            onChange={handleSearch}
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

            {hasNoTodos && (
              <tr>
                <td colSpan={5} align="center">
                  Nenhum item encontrado
                </td>
              </tr>
            )}

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
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;
