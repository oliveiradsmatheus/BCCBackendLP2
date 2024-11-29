// DAO - Data Access Object
import Fornecedor from "../Modelo/fornecedor.js";

import conectar from "./Conexao.js";
export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor(
                forn_codigo INT NOT NULL AUTO_INCREMENT,
                forn_razaoSocial VARCHAR(200) NOT NULL,
                forn_cnpj VARCHAR(18) NOT NULL,
                forn_telefone VARCHAR(20) NOT NULL,
                forn_endereco VARCHAR(50) NOT NULL,
                forn_numero INT NOT NULL,
                forn_bairro VARCHAR(50) NOT NULL,
                forn_cidade VARCHAR(50) NOT NULL,
                forn_uf VARCHAR(50) NOT NULL,
                forn_cep VARCHAR(50) NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(forn_razaoSocial, forn_cnpj, forn_telefone, forn_endereco, forn_numero, forn_bairro, forn_cidade, forn_uf, forn_cep)
                values(?,?,?,?,?,?,?,?,?)
            `;
            let parametros = [
                fornecedor.razaoSocial,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.endereco,
                fornecedor.numero,
                fornecedor.bairro,
                fornecedor.cidade,
                fornecedor.uf,
                fornecedor.cep,
            ]; // Dados do fornecedor
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET forn_razaoSocial=?, forn_cnpj=?, forn_telefone=?, forn_endereco=?, forn_numero=?, forn_bairro=?, forn_cidade=?, forn_uf=?, forn_cep=? WHERE forn_codigo = ?
            `;
            let parametros = [
                fornecedor.razaoSocial,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.endereco,
                fornecedor.numero,
                fornecedor.bairro,
                fornecedor.cidade,
                fornecedor.uf,
                fornecedor.cep,
                fornecedor.codigo
            ]; // Dados do fornecedor
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        // Recuperar as linhas da tabela fornecedor e transformá-las de volta em fornecedores
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor f
                   WHERE forn_razaoSocial LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM fornecedor f
                   WHERE forn_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['forn_codigo'],
                linha['forn_razaoSocial'],
                linha['forn_cnpj'],
                linha['forn_telefone'],
                linha['forn_endereco'],
                linha['forn_numero'],
                linha['forn_bairro'],
                linha['forn_cidade'],
                linha['forn_uf'],
                linha['forn_cep']
            );
            listaFornecedores.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_codigo = ?`;
            let parametros = [
                fornecedor.codigo
            ]; // Dados do fornecedor
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}