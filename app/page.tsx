"use client";
import { todoController } from "@client/controller/todo";
import { Todo } from "@client/repository/todo";
import { GlobalStyles } from "@theme/GlobalStyles";
import { formatedDate } from "@utils/formatedDate";
import { useEffect, useState } from "react";

function HomePage() {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    todoController.get({ page, limit: 2 }).then(({ todos, pages }) => {
      setTodoList((oldTodos) => [...oldTodos, ...todos]);
      setTotalPages(pages);
    });
  }, [page]);

  const hasMorePages = totalPages > page;
  const handlePage = () => setPage(page + 1);

  const formatedTodoList = todoList.map(({ id, date, content }) => (
    <tr key={`${id}`}>
      <td>
        <input type="checkbox" />
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
          <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
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
            {/* <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Carregando...
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center">
                Nenhum item encontrado
              </td>
            </tr> */}

            <tr>
              <td colSpan={5} align="center" style={{ textAlign: "center" }}>
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
