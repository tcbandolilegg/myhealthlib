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

## Painel do usuário

**RF**

- O usuário deve poder listar todos os exames e consultas cadastrados;
- O usuário deve poder cadastrar novos exames e consultas;

**RNF**

- A listagem de consutlas e exames deve ser armazenada em cache;

**RN**

- O usuário deve estar logado para listar e cadastrar exames e consultas;
