import Categoria from "../Modelo/categoria";
import conectar from "./Conexao";

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
                    CONSTRAINT pk_categoria
                        PRIMARY KEY (cat_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (erro) {
            console.log("Erro ao iniciar a tabela categoria");
        }
    }

    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = "INSERT INTO categoria(cat_descricao) VALUES ?";
            const parametros = [categoria.descricao];
            const resultado = await conexao.execute(sql, parametros);
            categoria.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = "UPDATE categoria SET cat_descicao = ?";
            const parametros = [categoria.descricao];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = "DELETE FROM categoria WHERE cat_codigo = ?";
            const parametros = [categoria.descricao];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }

    }
    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM categoria ORDER BY cat_descricao";
        const [registros, campos] = await conexao.query(sql);
        listaCategorias = [];
        for (const registro of registros) {
            const categoria = new Categoria(registro['cat_codigo'], registro['cat_descricao']);
            listaCategoria.push(categoria);
        }
        return listaCategorias;
    }
}