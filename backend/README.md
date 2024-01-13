# Meu campeonato API

## Como executar

Via Docker:

```
docker build -t backend .
```

```
docker run -it -e DATABASE_URL="postgresql://" -p 3001:3001 backend
```