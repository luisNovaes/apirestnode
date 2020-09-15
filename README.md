# Documentação do projeto 


# Projeto API REST,  Node Js com Postgres

O projeto foi desenvolvido com a seguinte arquitetura:

Tecnologias do lado do Back end:
Node js - version 12.18.3,
npm - version 6.14.6,
PostgreSQL - version 9.5,
PgAdmin4 - version 4.24.

Tools:
Visual Studio code ,
Postman.

Link do Repositório: https://github.com/luisNovaes/apirestnode.git

Para rodar o projetos, você precisará:

1 - Preparar o ambiente local, instalando as ferramentas listadas acima. 

2 - Baixar os fontes do link acima, ou cloná-los.

3 - Importar na IDE o código fonte do projeto, neste caso eu usei o  Visual Studio Code. 

4 - Rode um “npm install”, para que as dependências sejam baixadas e criadas em  seus respectivos módulos e depois um “ng start“ para subir o projeto na porta padrão http://localhost:8080/ .

5 - Conexão com o banco de dados:
Crie uma base de dados no postgreSQL com os seguintes dados de conexão:

 database: 'base',
 
 username: 'postgres',
 
 password: 'root',
 
 host: 'localhost',
 
 dialect: 'postgres',
 
Estes dados estão no arquivo: config/env.js.


Ao rodar o projeto com npm instal, será disparado um script (/server.js) que criará todas as tabelas, assim como deve inserir os roles e os valores de avaliação em suas respectivas tabelas.


Figura - 1: Estrutura do banco de dados.


Figura - 2: Tabela: Roles.


Figura - 3: Tabela: Valores Avaliação.


6 - Endpoints disponíveis para consumo (usei o Postman para os testes):

Rotas de Autenticação:

POST - Cadastrar usuário: 
http://localhost:8080/api/auth/signup

POST - Login usuário: 
http://localhost:8080/api/auth/signin 

GET - Teste conteúdo do usuário: 
http://localhost:8080/api/test/user

GET - Teste conteúdo público: 
http://localhost:8080/api/test/pm

GET - Teste conteúdo do Admin: 
http://localhost:8080/api/test/admin

Rotas de locais:

POST - Cadastrar local
http://localhost:8080/api/local/cadastrar-local

POST - Avaliar local
http://localhost:8080/api/local/avaliar-local/1 

GET - Listar todos os os locais: 
http://localhost:8080/api/local/listar-todos-locais

GET - Listar todas as avaliações: 
http://localhost:8080/api/local/listar-todas-avaliacoes

POST - Listar local por latitude e longitude
http://localhost:8080//api/local/listar-todas-proximidade-lat-lngl 

GET - Listar avaliações por usuário especificado.
http://localhost:8080/api/local/listar-local-especifico/1

GET - Lista todas as avaliações de um local 
http://localhost:8080/api/local/listar-avaliacoes-local/1


GET - Listar locais por usuário
http://localhost:8080/api/local/listar-local-por-usuario/1

7 - Testes:
Para rodar os teste será necessário executar antes um npm start para que limpe o bando de dados, caso não siga este procedimento, o teste 1 que corresponde ao cadastro de usuário falhará, pois já existirá um usuário com o id 1 cadastrado. 
Rode o teste com: npm test.



Luis Magno Novaes
Analista de Sistema Sênior 
Data Scientist

luismagnovaes@gmail.com

