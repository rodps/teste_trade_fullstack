# Teste técnico Trade Full Stack

## Como executar

Via Docker compose:

1. Abra o arquivo docker-compose.yml.

2. Edite as variaveis de ambiente e args.

3. Execute o comando ```docker compose up```.

4. A aplicação será iniciada na porta 3000 e poderá ser acessada através da página http://localhost:3000 no seu navegador.

## Github OAuth

Ao criar um OAuth App no GitHub, utilize no campo Authorization callback URL, o valor http://127.0.0.1:3000/oauth/github

## Cadastrar usuário

Acesse a collection do postman contida neste repositório, em seguida -> Auth -> Register