# Requisitos da aplicação

## Recuperação de senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos Não Funcionais)**

- Utilizar Mailtrap para testar envio de e-mails em de desenvolvimento;
- Utilizar Amazon SES para envios de e-mails em produção;
- O envio de e-mails deve acontecer em segundo plano;

**RN (Regras de Negócio)**

- O link enviado por e-mail para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

## Atualização do perfil

**RF**

- O usuário deve poder atualizar todas as informações do seu perfil;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

## Exames

**RF**

- O usuário deve poder listar todos os exames cadastrados;
- O usuário deve poder cadastrar novos exames;

**RNF**

- A listagem de consutlas e exames deve ser armazenada em cache;

**RN**

- O usuário deve estar logado para listar e cadastrar exames;

## Consultas

**RF**

- O usuário deve poder agendar novas consultas;
- O usuário deve poder listar todos as consultas cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos uma consulta cadastrada;
- O usuário deve poder listar as consultas cadastradas de um dia específico;

**RNF**

- A listagem de consutlas  deve ser armazenada em cache;

**RN**

- O usuário deve estar logado para listar e agendar consultas;
- O usuário não pode agendar uma consulta em um horário  já ocupado;
- O usuário não pode agendar uma consulta em um horário q já passou;
