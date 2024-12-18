import Usuario from "../Modelo/usuario.js";

export default class UsuarioCtrl {

    gravar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const login = requisicao.body.login;
            const senha = requisicao.body.senha;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const cep = requisicao.body.cep;
            const tipo = requisicao.body.tipo;

            // Pseudo-validação
            if (nome && login && senha && endereco &&
                numero > 0 && bairro && cidade && uf && cep && (tipo == 0 || tipo == 1)) {
                // Gravar o usuário
                const usuario = new Usuario(0, nome, login, senha, endereco, numero, bairro, cidade, uf, cep, tipo);
                usuario.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário adicionado com sucesso!",
                            "codigo": usuario.codigo
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o usuário: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um usuário conforme documentação da API."
                    }
                );
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            // O código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const login = requisicao.body.login;
            const senha = requisicao.body.senha;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const cep = requisicao.body.cep;
            const tipo = requisicao.body.tipo;
            // Validação de regra de negócio
            if (codigo > 0 && nome && login &&
                senha && endereco &&
                numero > 0 && bairro && cidade && uf && cep && (tipo == 0 || tipo == 1)) {
                // Alterar o usuário
                const usuario = new Usuario(codigo, nome, login, senha, endereco, numero, bairro, cidade, uf, cep, tipo);
                usuario.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um usuário conforme documentação da API."
                    }
                );
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            // O código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            // Pseudo-validação
            if (codigo > 0) {
                // Alterar o usuário
                const usuario = new Usuario(codigo);
                usuario.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um usuário conforme documentação da API."
                    }
                );
            }

        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo;
            // Evitar que código tenha valor undefined
            if (isNaN(codigo)) {
                codigo = "";
            }
            const usuario = new Usuario();
            // Método consultar retorna uma lista de usuário
            usuario.consultar(codigo)
                .then((listaUsuarios) => {
                    resposta.status(200).json(listaUsuarios
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar usuários: " + erro.message
                        }
                    );
                });

        } else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
}