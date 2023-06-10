import { CyHttpMessages } from "cypress/types/net-stubbing";

const URL_BASE = "http://localhost:3000";
const MOCK_REQUEST_POST = (request: CyHttpMessages.IncomingHttpRequest) => {
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

const MOCK_REQUEST_PUT = (request: CyHttpMessages.IncomingHttpRequest) => {
  request.reply({
    statusCode: 200,
    body: {
      todo: {
        id: "f2249ffa-dcee-4c7f-9104-c27a14f86f13",
        date: "2023-06-10T13:24:53.743Z",
        content: "Teste Cypress",
        done: true,
      },
    },
  });
};

const MOCK_REQUEST_DELETE = (request: CyHttpMessages.IncomingHttpRequest) => {
  request.reply({ statusCode: 204 });
};

describe("<HomePage />", () => {
  beforeEach("should render the page before each action", () => {
    cy.visit(URL_BASE);
  });

  it("should create a new todo and read this in list table", () => {
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST_POST).as(
      "createTodo"
    );
    cy.get("input[name='add-todo']").type("Teste Cypress");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains("Tarefa criada com sucesso!");
    cy.get("table > tbody").contains("Teste Cypress");
  });

  it("should render a error toast when registering a repeated task", () => {
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST_POST).as(
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

  it("should render a erro toast when a submit without having completed the form", () => {
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST_POST).as(
      "createTodo"
    );
    cy.get("input[name='add-todo']").type(" ");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains(
      "Preencha o campo antes de cadastrar uma nova tarefa!"
    );
  });

  it("should strike the table row when marking task complete", () => {
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST_POST).as(
      "createTodo"
    );

    cy.intercept(
      "PUT",
      `${URL_BASE}/api/todos/f2249ffa-dcee-4c7f-9104-c27a14f86f13`,
      MOCK_REQUEST_PUT
    ).as("updateTodo");

    cy.get("input[name='add-todo']").type("Teste Cypress");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains("Tarefa criada com sucesso!");
    cy.get("input[name='checkbox-todo-list']").check();
    expect(cy.get("s[aria-label='strikethrough-line']"));
    expect(
      cy
        .get("div[role='status']")
        .contains("Parabéns! Você concluiu mais uma tarefa!")
    );
  });

  it("should delete task when click in respective delete task button", () => {
    cy.intercept("POST", `${URL_BASE}/api/todos`, MOCK_REQUEST_POST).as(
      "createTodo"
    );

    cy.intercept(
      "DELETE",
      `${URL_BASE}/api/todos/f2249ffa-dcee-4c7f-9104-c27a14f86f13`,
      MOCK_REQUEST_DELETE
    ).as("deleteTodo");

    cy.get("input[name='add-todo']").type("Teste Cypress");
    cy.get("button[aria-label='Adicionar novo item']").click();
    cy.get("div[role='status']").contains("Tarefa criada com sucesso!");
    cy.get("button[data-type='delete']").click();
    expect(cy.get("div[role='status']").contains("Tarefa deletada!"));
  });
});
