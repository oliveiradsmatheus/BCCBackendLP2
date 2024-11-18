// DAO - Data Access Object
import Cliente from "../Modelo/cliente.js";

import conectar from "./Conexao.js";
export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente(
                cli_codigo INT NOT NULL AUTO_INCREMENT,
                cli_nome VARCHAR(100) NOT NULL,
                cli_cpf VARCHAR(30) NOT NULL,
                cli_endereco VARCHAR(50) NOT NULL,
                cli_numero INT NOT NULL,
                cli_bairro VARCHAR(50) NOT NULL,
                cli_cidade VARCHAR(50) NOT NULL,
                cli_uf VARCHAR(50) NOT NULL,
                cli_cep VARCHAR(50) NOT NULL,
                CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(cli_nome,cli_cpf,cli_endereco,cli_numero,cli_bairro, cli_cidade,cli_uf,cli_cep)
                values(?,?,?,?,?,?,?,?)
            `;
            let parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.endereco,
                cliente.numero,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep,
            ]; // Dados do cliente
            const resultado = await conexao.execute(sql, parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release(); // Libera a conexão
        }
    }
    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cli_nome=?,cli_cpf=?,cli_endereco=?,cli_numero=?,cli_bairro=?, cli_uf=?, cli_cep=?, 
                WHERE cli_codigo = ?
            `;
            let parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.endereco,
                cliente.numero,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep,
                cliente.codigo
            ]; // Dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
    async consultar(termo) {
        // Recuperar as linhas da tabela cliente e transformá-las de volta em clientes
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM cliente c
                   WHERE cli_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM cliente c
                   WHERE cli_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha['cli_codigo'],
                linha['cli_nome'],
                linha['cli_cpf'],
                linha['cli_endereco'],
                linha['cli_numero'],
                linha['cli_bairro'],
                linha['cli_cidade'],
                linha['cli_uf'],
                linha['cli_cep'],
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }
    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cli_codigo = ?`;
            let parametros = [
                cliente.codigo
            ]; // Dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}