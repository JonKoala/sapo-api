# SAPO-API
API para o sistema SAPO (Sistema de Auditoria de Portais).

## Requisitos
 - [Node](https://nodejs.org) >= 6.9
 - Database SQL Server 2014

## Instalação
Clone o projeto para a sua máquina e acesse o diretório do mesmo.
``` bash
git clone https://github.com/JonKoala/sapo-api.git
cd sapo-api
```
Instale as dependências.
``` bash
npm install
```

## Configuração
O projeto depende de um arquivo `appconfig.json`, na sua raiz, contendo algumas configurações locais. Crie uma cópia do arquivo `appconfig.json.example` e coloque as configurações do seu ambiente.

Exemplo de `appconfig.json`:
``` javascript
{
  "server": {
    "port": "8080"
  },
  "db": {
    "host": ".\SQLEXPRESS",
    "database": "SAPO",
    "driver": "SQL Server Native Client 11.0"
  },
  "auth": {
    "secret": "01ea83e21fce591125f68a8cd591b486"
  }
}
```

## Execução
Para subir o servidor da API, basta executar o comando `start` do _npm_.
``` bash
npm start
```
Caso não ocorra nenhum erro, um servidor deve ser criado, usando a porta especificada no `appconfig.json` (_e.g `http://localhost:8080/`_)
