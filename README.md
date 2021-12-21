# ATM MANAGER

Plataforma desenvolvido para solucionar problemas ATM.



## Executando
- Criar Banco de dados PostgresSQL
- Configurar arquivo backend/ormconfig.json com os dados do BD
    [
        "username": "user",
        "password": "",
        "database": "nomebd",
    ]



- Run ./backend/yarn install && ./frontend/yarn install
- Run ./backend/yarn typeorm migration:run
- Run ./backend/yarn dev && ./frontend/yarn start



