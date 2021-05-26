# Acervo de livros

### Projeto de uma Rest API, simulando um acervo de livros com cadastro e login de usuários,

### utilizando Node.js, MySQL, JWT, entre outros.
<br>

* ## Requisitos

    1. Javascript
    1. Node.js
    1. MySQL

<br>

* ## Configurando o projeto

    1. Instalando dependências

        - No terminal:

            ``` javascript
            npm init
            ```

            ``` javascript
            npm install
            ```

    1. Configurando o servidor MySQL

        - Renomeie o arquivo *.env.example* para *.env*

        - Substitua as informações contidas nele para as do seu servidor MySQL

    1. Criando o banco de dados e fazendo as migrations

        - No terminal:

            ``` javascript
            npx sequelize db:migrate
            ```

<br>

* ## Iniciando o servidor

  * No terminal:

      ``` javascript
      npm run dev
      ```

  * Em sua ferramenta de testes (Postman, Insomnia), utilize o ip http://localhost:3000

  * Caso necessite, a porta do servidor pode ser alterada no arquivo *server.js*
