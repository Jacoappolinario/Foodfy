<h3 align="center">
    <img alt="foodfy" title"#logo" src="public/assets/chef.png">
    <br><br>
    <b>Foodfy</b>
    <br><br>
    <p align="center">
        <img src="https://img.shields.io/badge/By-Jac%C3%B3%20Apolin%C3%A1rio-blue">
        <img src="https://img.shields.io/badge/License-MIT-blue">
    </p>
</h3>

## 🚀 Sobre
Foodfy é uma site de receitas que lhe propociona a experiência de:

- 👩🏽‍🍳 Explorar receitas e encontrar chefs incríveis.
- 🍕 Crie uma conta para gerenciar receitas, chefs e usuários.
- 📨 E além de tudo como administrador da plataforma, você pode convidar outros usuários.

## 👷🏾‍♂️ Como usar?

<h4> Você precisa das seguintes ferramentas instaladas para executar este projeto: </h4>
 <p> <a href="https://nodejs.org/en/">Node.js + NPM<a>, <a href="https://www.postgresql.org/download/"> PostgreSQL </a> e <a href="https://www.electronjs.org/apps/postbird"> Postbird. </a> </p>

```bash
# Faça um clone
$ git clone https://github.com/Jacoappolinario/Foodfy.git

# Navegue até o repositório clonado:
$ cd Foodfy

```

```bash
## Configure o banco de dados
sudo -u postgres createdb foodfy 

## Obs: Caso utilize o Docker, você pode executar o seguinte comando
sudo docker run --name foodfy -e POSTGRES_DB=foodfy -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres 

## Agora copie toda query sql no arquivo foodfy.sql e execute no banco de dados.
```

Adicione credenciais de acesso ao banco de dados no arquivo src/config/db.js.<br>
Obs: Caso tenha utilizado a instalação do Postgres pelo docker, as crendencias de acesso ao banco de dados não precisam ser alteradas.<br><br>
Criei uma conta no Mailtrap e adicione credenciais de acesso no arquivo /lib/mailer.js.

```bash
# Baixe as dependências:
$ npm install

# Divirta-se
$ npm start
```

#### Para efetuar o login como admin utilize as seguintes informações
Email: admin@foodfy.com<br>
Senha: 12345

Rota de acesso: http://localhost:3000/admin/users/login

## 📕 Licença
Lançado em 2020 (Trabalho em andamento) Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.

---

Feito com 💙 by [Jacó Apolinário](https://www.linkedin.com/in/jacoapolinario/)
