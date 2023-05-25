import { GlobalStyles } from "@theme/GlobalStyles";

const bg = "/bg.avif";
const todoList = [
  {
    id: "bc7a165a-6f92-4cfd-868e-17399accbcff",
    date: "2023-05-16",
    content: "Primeira 'To Do'!",
    done: false,
  },
  {
    id: "3e57a719-c98a-44e2-aa5e-0cb972b66f1a",
    date: "2023-05-16",
    content: "Terceira, porém atualizada",
    done: false,
  },
  {
    id: "b84fbc0c-aab2-401e-bc15-c2f6ac939995",
    date: "2023-05-16",
    content: "Quarta 'To Do'!",
    done: false,
  },
];

function HomePage() {
  return (
    <main>
      <GlobalStyles themeName="devsoutinho" />
      <header style={{ backgroundImage: `url('${bg}')` }}>
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
            {todoList.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{todo.id.substring(0, 4)}</td>
                <td>{todo.content}</td>
                <td align="right">
                  <button data-type="delete">Apagar</button>
                </td>
              </tr>
            ))}

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
