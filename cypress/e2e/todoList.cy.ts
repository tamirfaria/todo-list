import { CyHttpMessages } from "cypress/types/net-stubbing";

const URL_BASE = "http://localhost:3000";
const MOCK_REQUEST = (request: CyHttpMessages.IncomingHttpRequest) => {
  request.reply({
    statusCode: 201,
    body: {
      todo: {
        id: "f2249ffa-dcee-4c7f-9104-c27a14f86f13",
        date: "2023-06-10T13:24:53.743Z",
        content: "Teste Cypress",
        done: false,
      },
    },
  });
};

describe("/ → <HomePage />", () => {
  beforeEach("should render the page before each action", () => {
    cy.visit(URL_BASE);
  });

  it("should create a new todo and read this in list table", () => {
    // 👇 Essa etapa visa não consumir as rota da API desnecessariamente
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST).as(
      "createTodo"
    );
    cy.get("input[name='add-todo']").type("Teste Cypress");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains("Tarefa criada com sucesso!");
    cy.get("table > tbody").contains("Teste Cypress");
  });

  it("should render a error toast when registering a repeated task", () => {
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST).as(
      "createTodo"
    );
    cy.get("input[name='add-todo']").type("Teste Cypress");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains("Tarefa criada com sucesso!");
    cy.get("table > tbody").contains("Teste Cypress");
    cy.get("input[name='add-todo']").type("Teste Cypress");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains(
      "Há uma tarefa com a mesma descrição. Crie uma tarefa diferente!"
    );
  });

  //Devo criar um caso de teste onde submito o formulário sem inserir nenhum dado, e espero receber um erro

  // it("should risk table row when marking task complete", () => {
  // 1. Entrar na página
  // 2. Capturar o input
  // 3. Inserir uma tarefa no input
  // 4. Clicar no botão de enviar a tarefa
  // 5. Receber o toast de sucesso
  // 6. Marcar a mesma tarefa como concluída
  // 7. Receber o toast de sucesso
  // 8. Verificar se o linha possui a tag <s></s>
  // });

  // it("should delete task when click in respective delete task button", () => {
  // 1. Entrar na página
  // 2. Capturar o input
  // 3. Inserir uma tarefa no input
  // 4. Clicar no botão de enviar a tarefa
  // 5. Receber o toast de sucesso
  // 6. Clicar no botão de apagar da respectiva task
  // 7. Receber um toast de sucesso
  // 8. Não conseguir encontrar a mesma task
  // });
});
