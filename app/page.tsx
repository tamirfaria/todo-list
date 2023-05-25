"use client";
import { TodoList, getTodo } from "@client/controller/todo";
import { GlobalStyles } from "@theme/GlobalStyles";
import { useEffect, useState } from "react";

function HomePage() {
  const [todoList, setTodoList] = useState<TodoList[]>([
    { content: "teste", date: "teste", done: false, id: "teste" },
  ]);

  useEffect(() => {
    getTodo.get().then((todos) => {
      setTodoList(todos);
    });
  }, []);

  return (
    <main>
      <GlobalStyles themeName="devsoutinho" />
      <header style={{ backgroundImage: `url("/bg.avif")` }}>
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
              <th />
            </tr>
          </thead>

          <tbody>
            {todoList.map((todo, index) => {
              // console.log(
              //   `TODO dentro do map - ${JSON.stringify(todo[0].content)}`
              // );
              console.log({ todoList });
              return (
                <tr key={`${index}-${todo.id}`}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.id?.substring(0, 4)}</td>
                  <td>{todo.content}</td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
                  </td>
                </tr>
              );
            })}

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
