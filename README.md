## Структура проекта
Проект состоит из Backend сервера, реализующего API для Frontend приложения и само Frontend приложение.

- **applications/client**: frontend приложение,
- **applications/server**: простой backend сервер 

### Запуск сервера
```shell
pnpm start:server
```
После запуска сервера, вам будет доступно api по адресу http://localhost:3000/estates с тремя query параметрами:
```
type GetEstatesParams = {
  city?: string;
  type?: string;
  search?: string;
};
```


### Запуск клиента
```shell
pnpm start:client
```
После запуска приложения, вам будет доступна страница с приложением по адресу http://localhost:3001.
