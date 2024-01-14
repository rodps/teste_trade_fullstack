# Meu campeonato API

## Como executar

Via Docker:

```console
docker build -t backend .
```

```console
docker run -it -e DATABASE_URL="postgresql://" -p 3001:3001 backend
```

Via npm:

```console
npm install
```

```console
npm start
```

## Testes

```console
npm run test
```