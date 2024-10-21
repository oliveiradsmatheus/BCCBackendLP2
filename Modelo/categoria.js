import CategoriaDAO from "../Persistencia/categoriaDAO.js";
export default class Categoria {
    // Atributos privados
    #codigo;
    #descricao;

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    // Construtor (criador de um produto)
    constructor(codigo = 0, descricao = "") {
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    // Override do método toJSON
    // O método toJSON é chamado automaticamente quando um produto
    // Precisa ser convertido no formato JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "descricao": this.#descricao
        }
    }

    async gravar() {
        // Instanciar a camada de persistencia do produto
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this); // this referencia a si mesmo
    }

    async alterar() {
        const catDAO = new CategoriaDAO();
        await catDAO.alterar(this);
    }

    async excluir() {
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async consultar(termo) {
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(termo);
    }
}