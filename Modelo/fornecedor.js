import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados
    #codigo;
    #razaoSocial;
    #cnpj;
    #telefone;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get razaoSocial() {
        return this.#razaoSocial;
    }

    set razaoSocial(novaRazaoSocial) {
        this.#razaoSocial = novaRazaoSocial;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get numero() {
        return this.#numero;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get uf() {
        return this.#uf;
    }

    set uf(novaUf) {
        this.#uf = novaUf;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    // Construtor (criador de um fornecedor)
    constructor(codigo = 0, razaoSocial = "", cnpj = "", telefone = "", endereco = "",
        numero = 0, bairro = "", cidade = "", uf = "", cep = "") {
        this.#codigo = codigo;
        this.#razaoSocial = razaoSocial;
        this.#cnpj = cnpj;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
    }

    // Override do método toJSON
    // O método toJSON é chamado automaticamente quando um fornecedor
    // Precisar ser convertido no formato JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "razaoSocial": this.#razaoSocial,
            "cnpj": this.#cnpj,
            "telefone": this.#telefone,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep
        }
    }

    async incluir() {
        // Instanciar a camada de persistencia do fornecedor
        const fornDAO = new FornecedorDAO();
        await fornDAO.incluir(this); // this referencia a si mesmo
    }

    async consultar(termo) {
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }

    async excluir() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async alterar() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.alterar(this);
    }
}