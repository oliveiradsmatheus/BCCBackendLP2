import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados
    #codigo;
    #nome;
    #cpf;
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

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
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

    // Construtor (criador de um cliente)
    constructor(codigo = 0, nome = "", cpf = "", endereco = "", numero = 0,
        bairro = "", cidade = "", uf = "", cep = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
    }

    // Override do método toJSON
    // O método toJSON é chamado automaticamente quando um cliente
    // Precisar ser convertido no formato JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep
        }
    }

    async incluir() {
        // Instanciar a camada de persistencia do cliente
        const cliDAO = new ClienteDAO();
        await cliDAO.incluir(this); // this referencia a si mesmo
    }

    async consultar(termo) {
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termo);
    }

    async excluir() {
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async alterar() {
        const cliDAO = new ClienteDAO();
        await cliDAO.alterar(this);
    }
}