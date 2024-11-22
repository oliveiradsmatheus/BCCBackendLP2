// DAO - Data Access Object
import Usuario from "../Modelo/usuario.js";

import conectar from "./Conexao.js";
export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                usu_codigo INT NOT NULL AUTO_INCREMENT,
                usu_login VARCHAR(20) NOT NULL,
                usu_nome VARCHAR(100) NOT NULL,
                usu_senha VARCHAR(30) NOT NULL,
                usu_endereco VARCHAR(50) NOT NULL,
                usu_numero INT NOT NULL,
                usu_bairro VARCHAR(50) NOT NULL,
                usu_cidade VARCHAR(50) NOT NULL,
                usu_uf VARCHAR(50) NOT NULL,
                usu_cep VARCHAR(50) NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY(usu_codigo)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(usu_login,usu_nome,usu_senha,usu_endereco,usu_numero,usu_bairro,usu_cidade,usu_uf,usu_cep)
                values(?,?,?,?,?,?,?,?,?)
            `;
            let parametros = [
                usuario.login,
                usuario.nome,
                usuario.senha,
                usuario.endereco,
                usuario.numero,
                usuario.bairro,
                usuario.cidade,
                usuario.uf,
                usuario.cep,
            ]; // Dados do usuário
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET usu_nome=?,usu_login=?,usu_senha=?,usu_endereco=?,usu_numero=?,usu_bairro=?, usu_uf=?, usu_cep=? 
                WHERE usu_codigo = ?
            `;
            let parametros = [
                usuario.nome,
                usuario.login,
                usuario.senha,
                usuario.endereco,
                usuario.numero,
                usuario.bairro,
                usuario.cidade,
                usuario.uf,
                usuario.cep,
                usuario.codigo
            ]; // Dados do usuário
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        // Recuperar as linhas da tabela usuário e transformá-las de volta em usuários
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM usuario u
                   WHERE usu_login LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM usuario u
                   WHERE usu_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        for (const linha of linhas) {
            const usuario = new Usuario(
                linha['usu_codigo'],
                linha['usu_nome'],
                linha['usu_login'],
                linha['usu_senha'],
                linha['usu_endereco'],
                linha['usu_numero'],
                linha['usu_bairro'],
                linha['usu_cidade'],
                linha['usu_uf'],
                linha['usu_cep'],
            );
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }
    
    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE usu_codigo = ?`;
            let parametros = [
                usuario.codigo
            ]; // Dados do usuário
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}