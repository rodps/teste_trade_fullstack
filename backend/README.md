# Meu campeonato API

## Como executar

Via Docker:

```console
docker build -t backend .
```

```console
docker run -it -e DATABASE_URL="postgresql://url_da_sua_database" -p 3001:3001 backend
```

Via npm:

Crie um arquivo .env e adicione a variável DATABASE_URL. Em seguida execute os comandos abaixo:

```console
npm install
```

```
npx prisma migrate dev
```

```console
npm run dev
```

## Testes

```console
npm run test
```