const URL_BASE = "http://localhost:3000";

describe("/ → <HomePage />", () => {
  beforeEach("should render the page before each action", () => {
    cy.visit(URL_BASE);
  });

  it("should create a new todo and read this in list table", () => {
    // 👇 Essa etapa visa não precisar consumir as rota da API desnecessariamente
    cy.intercept("POST", `${URL_BASE}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "70905d7e-c969-45b1-99f0-1aa155477204",
            date: "2023-04-15T19:46:51.109Z",
            content: "Test todo",
            done: false,
          },
        },
      });
    }).as("createTodo");
    // 1. Entrar na página
    // 2. Capturar o input
    // 3. Inserir a tarefa no input
    // 4. Clicar no botão de enviar a tarefa
    // 5. Receber o toast de sucesso
    // 6. Ler a nova tarefa na tabela
  });

  it("should render a error toast when registering a repeated task", () => {
    // 1. Entrar na página
    // 2. Capturar o input
    // 3. Inserir uma tarefa no input
    // 4. Clicar no botão de enviar a tarefa
    // 5. Receber o toast de sucesso
    // 6. Inserir a mesma tarefa
    // 7. Clicar no botão de enviar a tarefa
    // 8. Receber o toast de erro
  });

  it("should risk table row when marking task complete", () => {
    // 1. Entrar na página
    // 2. Capturar o input
    // 3. Inserir uma tarefa no input
    // 4. Clicar no botão de enviar a tarefa
    // 5. Receber o toast de sucesso
    // 6. Marcar a mesma tarefa como concluída
    // 7. Receber o toast de sucesso
    // 8. Verificar se o linha possui a tag <s></s>
  });

  it("should delete task when click in respective delete task button", () => {
    // 1. Entrar na página
    // 2. Capturar o input
    // 3. Inserir uma tarefa no input
    // 4. Clicar no botão de enviar a tarefa
    // 5. Receber o toast de sucesso
    // 6. Clicar no botão de apagar da respectiva task
    // 7. Receber um toast de sucesso
    // 8. Não conseguir encontrar a mesma task
  });
});
