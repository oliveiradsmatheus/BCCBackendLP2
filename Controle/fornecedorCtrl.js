import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const razaoSocial = requisicao.body.razaoSocial;
            const cnpj = requisicao.body.cnpj;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const cep = requisicao.body.cep;
            // Pseudo-validação
            if (razaoSocial && cnpj &&
                telefone && endereco &&
                numero > 0 && bairro && cidade && uf && cep) {
                // Gravar o fornecedor
                const fornecedor = new Fornecedor(0, razaoSocial, cnpj, telefone, endereco, numero, bairro, cidade, uf, cep);
                fornecedor.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor adicionado com sucesso!",
                            "codigo": fornecedor.codigo
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
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
            const razaoSocial = requisicao.body.razaoSocial;
            const cnpj = requisicao.body.cnpj;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const cep = requisicao.body.cep;
            // Validação de regra de negócio
            if (codigo > 0 && razaoSocial && cnpj &&
                telefone && endereco &&
                numero > 0 && bairro && cidade && uf && cep) {
                // Alterar o fornecedor
                const fornecedor = new Fornecedor(codigo, razaoSocial, cnpj, telefone, endereco, numero, bairro, cidade, uf, cep);
                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
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
                // Alterar o fornecedor
                const fornecedor = new Fornecedor(codigo);
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um fornecedor conforme documentação da API."
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
            const fornecedor = new Fornecedor();
            // Método consultar retorna uma lista de fornecedor
            fornecedor.consultar(codigo)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar fornecedores: " + erro.message
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