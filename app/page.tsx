"use client";
import { todoController } from "@client/controller/todo";
import { Todo } from "@client/repository/todo";
import { GlobalStyles } from "@theme/GlobalStyles";
import { formatedDate } from "@utils/formatedDate";
import { useEffect, useState } from "react";

function HomePage() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    todoController.get({ page: 1, limit: 3 }).then((todos) => {
      setTodoList(todos.todos);
    });
  }, []);

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

  enum colorThemes {
    indigo = "indigo",
    devsoutinho = "devsoutinho",
    red = "red",
    yellow = "yellow",
    coolGrey = "coolGrey",
  }

  return (
    <main>
      <GlobalStyles themeName={colorThemes.yellow} />
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
            </tr>

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                <button data-type="load-more">
                  Carregar mais{" "}
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
            </tr> */}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;
