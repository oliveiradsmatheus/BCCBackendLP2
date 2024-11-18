import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    // Atributos privados
    #codigo;
    #login;
    #nome;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #senha;

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get login() {
        return this.#login;
    }

    set login(novoLogin) {
        this.#login = novoLogin;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
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

    get senha() {
        return this.#senha;
    }

    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    // Construtor (criador de um produto)
    constructor(codigo = 0, login = "", nome = "", endereco = "", numero = 0, bairro = "",
        cidade = "", uf = "", cep = "", senha = "") {
        this.#codigo = codigo;
        this.#login = login;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#senha = senha;
    }

    // Override do método toJSON
    // O método toJSON é chamado automaticamente quando um produto
    // Precisar ser convertido no formato JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "login": this.#login,
            "senha": this.#senha,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep
        }
    }

    async incluir() {
        // Instanciar a camada de persistencia do produto
        const usuDAO = new UsuarioDAO();
        await usuDAO.incluir(this); // this referencia a si mesmo
    }

    async consultar(termo) {
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
    }

    async excluir() {
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async alterar() {
        const usuDAO = new UsuarioDAO();
        await usuDAO.alterar(this);
    }
}