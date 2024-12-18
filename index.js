// Instalar um módulo que oferece recursos p/ desenvolver um servidor http
// npm install express

// Importar o módulo para ser utilizado em nossa aplicação
// const express = require('express'); commonJS
// Vamos utilizar o padrão modular para importar os módulos
// Não esqueça de atualizar o arquivo package.json adicionando a chave "type":"module"
import express from 'express';
import rotaCategoria from './Rotas/rotaCategorias.js';
import rotaFornecedor from './Rotas/rotaFornecedores.js';
import rotaCliente from './Rotas/rotaClientes.js';
import rotaProduto from './Rotas/rotaProdutos.js';
import rotaUsuario from './Rotas/rotaUsuarios.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente a partir
// do arquivo .env localizado na raiz do projeto
dotenv.config();

const host = "0.0.0.0"; // Todas as placas de rede do computador que está executando a aplicação
const porta = 4000;

const app = express(); // Aplicação completa HTTP
// Prepara a aplicação para processar dados no formato JSON
app.use(express.json());

// Configurar a aplicação para responder requisições não importando a origem
app.use(cors({
    "origin": "*",
    "Access-Control-Allow-Origin": '*'
}));

// app utilize a pasta 'publico' para disponibilizar o conteúdo ali armazenado
app.use(express.static('./publico'));


app.use("/categorias", rotaCategoria);
app.use("/clientes",rotaCliente);
app.use("/fornecedores", rotaFornecedor);
app.use("/produtos", rotaProduto);
app.use("/usuarios", rotaUsuario);

/*app.get('/', (requisicao, resposta) => {
    resposta.send('<h1>Página principal</h1>');
    resposta.end();
})

app.get('/dinheiro', (requisicao, resposta) => {
    resposta.send('<p>Toma aqui seus cinquenta reais</p>');
    resposta.end();
})

//disponibilize a tabuada do 7 no endpoint /tabuada7
app.get('/tabuada', (requisicao, resposta) => {
    let cont = 0;
    const ate = requisicao.query.ate;
    const numero = requisicao.query.numero;
    while (cont < ate) {
        resposta.write(`<p>${numero} x ${cont} = ${numero * cont}</p>`);
        cont++;
    }
    resposta.end();
});*/

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});