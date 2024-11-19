import Categoria from "../Modelo/categoria.js";
import conectar from "./Conexao.js";

export default class CategoriaDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    cat_codigo INT NOT NULL AUTO_INCREMENT,
                    cat_descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch (erro) {
            console.log("Erro ao iniciar a tabela categoria!");
        }
    }

    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = "INSERT INTO categoria(cat_descricao) VALUES (?)";
            const parametros = [categoria.descricao];
            const resultado = await conexao.execute(sql, parametros);
            categoria.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = "UPDATE categoria SET cat_descricao = ? WHERE cat_codigo = ?";
            const parametros = [categoria.descricao, categoria.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = "DELETE FROM categoria WHERE cat_codigo = ?";
            const parametros = [categoria.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = "SELECT * FROM categoria WHERE cat_descricao LIKE ? ORDER BY cat_descricao";
            parametros.push("%" + termo + "%");
        } else {
            sql = "SELECT * FROM categoria WHERE cat_codigo = ? ORDER BY cat_descricao";
            parametros.push(termo);
        }
        const conexao = await conectar();

        const [registros, campos] = await conexao.query(sql, parametros);
        await conexao.release();
        let listaCategoria = [];
        for (const registro of registros) {
            const categoria = new Categoria(
                registro['cat_codigo'],
                registro['cat_descricao']
            );
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }
}