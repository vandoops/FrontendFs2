import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
//import { urlBase } from "../utilitarios/definicoes";

export default function FormTipoMovimentacao(props) {
    const [validado, setValidado] = useState(false);
    const [movimentacao, setMovimentacao] = useState(props.movimentacao);

    function manipularMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setMovimentacao({ ...movimentacao, [id]: valor });
    }

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.atualizando) {
                fetch("https://129.146.68.51/aluno13-pfsii/tipomovimentacao", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movimentacao)
                })
                    .then((resposta) => resposta.json())
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaMovimentacao;
                            novaLista.push(movimentacao);
                            props.setMovimentacao(novaLista);
                            props.exibirTabela(true);
                            window.location.reload();
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message);
                    });
            } else {
                fetch("https://129.146.68.51/aluno13-pfsii/tipomovimentacao", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movimentacao)
                })
                    .then((resposta) => resposta.json())
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaMovimentacao;
                            novaLista.push(movimentacao);
                            props.setMovimentacao(novaLista);
                            props.exibirTabela(true);
                            setMovimentacao(props.movimentacao);
                            window.location.reload();
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message);
                    });
            }
            setValidado(false);
        } else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <>
            <Form className="shadow-lg p-3 mt-4 bg-white rounded" noValidate validated={validado} onSubmit={manipulaSubmissao}>
                <Row>
                    <Col className="d-none">
                        <Form.Group as={Col} md="12">
                            <Form.Label>ID de Movimentação</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ID da Movimentação"
                                value={movimentacao.idMovimentacao}
                                id="idMovimentacao"
                                onChange={manipularMudanca}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite o ID desta Movimentação.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Tipo de Movimentação:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tipo de Movimentação"
                                value={movimentacao.tipoMovimentacao}
                                id="tipoMovimentacao"
                                onChange={manipularMudanca}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite o tipo de movimentação.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <div className="d-flex justify-content-end mb-1 mt-5">
                        <Button
                            style={{ marginRight: '5px' }}
                            variant="btn btn-outline-danger"
                            type="button"
                            className="mt-5 "
                            onClick={() => {
                                props.exibirTabela(true);
                            }}
                        >
                            Voltar
                        </Button>{' '}
                        <Button className="mt-5" type="submit" variant="btn btn-outline-success">
                            {props.atualizando ? "Atualizar" : "Cadastrar"}
                        </Button>{' '}
                    </div>
                </Row>
            </Form>
        </>
    );
}
