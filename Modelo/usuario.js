import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    // Atributos privados
    #codigo;
    #nome;
    #login;
    #senha;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #tipo;

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

    get tipo() {
        return this.#tipo;
    }

    set tipo(novoTipo) {
        this.#tipo = novoTipo;
    }

    // Construtor (criador de um usuário)
    constructor(codigo = 0, nome = "", login = "", senha = "", endereco = "", numero = 0, bairro = "",
        cidade = "", uf = "", cep = "", tipo ="") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#login = login;
        this.#senha = senha;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#tipo = tipo;
    }

    // Override do método toJSON
    // O método toJSON é chamado automaticamente quando um usuário
    // Precisar ser convertido no formato JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "login": this.#login,
            "senha": this.#senha,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep,
            "tipo":this.#tipo
        }
    }

    async incluir() {
        // Instanciar a camada de persistencia do usuário
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