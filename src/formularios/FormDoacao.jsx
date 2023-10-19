import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
//import { urlBase } from "../utilitarios/definicoes";

export default function FormDoacao(props) {
  const [validado, setValidado] = useState(false);
  const [Doacao, setDoacao] = useState({
    ...props.Doacao,
    itensDoados: []
  });
  const [pessoas, setPessoas] = useState([]);
  const [itens, setItens] = useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;

    setDoacao({ ...Doacao, [id]: valor });
  }


  
  function adicionarItemRelacionado(itemRelacionado) {
    const novoItemRelacionado = {
      idItem: itemRelacionado.idItem,
      nomeItem: itens.find((item) => item.idItem === parseInt(itemRelacionado.idItem, 10)).nomeItem,
      quantidade: parseInt(itemRelacionado.quantidade),
    };
  
    setDoacao({
      ...Doacao,
      itensDoados: [...Doacao.itensDoados, novoItemRelacionado],
    });
  }

  function removerItemRelacionado(index) {
    const updatedItensDoados = [...Doacao.itensDoados];
    updatedItensDoados.splice(index, 1);
    setDoacao({ ...Doacao, itensDoados: updatedItensDoados });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      const dadosParaEnviar = {
        pessoaDoadora: Doacao.pessoaDoadora,
        itensDoados: Doacao.itensDoados,
        quantidade: Doacao.itensDoados.reduce((total, item) => total + item.quantidade, 0),
      };

      if (Doacao.pessoaDoadora || Doacao.itensDoados.length > 0) {
        if (!props.atualizando) {
          fetch("https://129.146.68.51/aluno13-pfsii/doacao", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosParaEnviar),
          })
            .then((resposta) => resposta.json())
            .then((dados) => {
              if (dados.status) {
                props.setModoEdicao(false);
                let novaLista = props.listaDoacao || [];
                novaLista.push(Doacao);
                props.setDoacao(novaLista);
                props.exibirTabela(true);
                // window.location.reload();
              }
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        } else {
          fetch("https://129.146.68.51/aluno13-pfsii/doacao", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosParaEnviar),
          })
            .then((resposta) => resposta.json())
            .then((dados) => {
              if (dados.status) {
                props.setModoEdicao(false);
                let novaLista = props.listaDoacao || [];
                novaLista.push(Doacao);
                props.setdo(novaLista);
                props.exibirTabela(true);
                setDoacao(props.Doacao);
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
        window.alert("Adicione pelo menos um item antes de submeter.");
        setValidado(true);
      }
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  useEffect(() => {
    fetch("https://129.146.68.51/aluno13-pfsii/pessoa", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setPessoas(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter a lista de pessoas:", erro);
      });

    fetch("https://129.146.68.51/aluno13-pfsii/item", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setItens(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter os tipos de movimentação:", erro);
      });
  }, []);

  return (
    <>
      <Form
        className="shadow-lg p-3 mt-4 bg-white rounded"
        noValidate
        validated={validado}
        onSubmit={manipulaSubmissao}
      >
        <Row>
          <Col>
            <Form.Group as={Col} md="9">
              <Form.Label>Pessoa Doadora:</Form.Label>
              <Form.Select
                type="text"
                placeholder="Pessoa Doadora"
                id="pessoaDoadora"
                onChange={manipularMudanca}
                value={Doacao.pessoaDoadora}
              >
                <option value="">Selecione</option>
                {pessoas.map((pessoa) => (
                  <option key={pessoa.cpf} value={pessoa.cpf}>
                    {pessoa.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione a pessoa doadora!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group as={Col} md="5">
              <Form.Label>Item Doado:</Form.Label>
              <Form.Select
                type="text"
                placeholder="Item Doado"
                id="idItem"
                onChange={manipularMudanca}
                value={Doacao.idItem}
              >
                <option value="">Selecione</option>
                {itens.map((item) => (
                  <option key={item.idItem} value={item.idItem}>
                    {item.nomeItem}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione o item doado!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group as={Col} md="3">
              <Form.Label>Quantidade:</Form.Label>
              <Form.Control
                type="number"
                placeholder="QTD"
                id="quantidade"
                value={Doacao.quantidade}
                onChange={manipularMudanca}
              />
            </Form.Group>

            <Button
              variant="outline-primary"
              type="button"
              onClick={() => adicionarItemRelacionado({
                idItem: Doacao.idItem,
                nomeItem: itens.find((item) => item.idItem === parseInt(Doacao.idItem, 10)).nomeItem,
                quantidade: Doacao.quantidade
              })}
            >
              Adicionar Item
            </Button>
          </Col>
        </Row>

        <div className="mt-3">
          {Doacao.itensDoados.map((itemDoados, index) => (
            <div key={index}>
              {itemDoados.nomeItem} - Quantidade: {itemDoados.quantidade}{" "}
              <Button
                className="mt-3"
                variant="btn btn-outline-danger btn-sm"
                type="button"
                onClick={() => removerItemRelacionado(index)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>



        {/* Não é necessário incluir o FormRelacionamento aqui */}
        {/* FormRelacionamento é usado para adicionar itens relacionados, mas o código já faz isso diretamente. */}

        <div className="d-flex justify-content-end mb-1 mt-5">
          <Button
            style={{ marginRight: "5px" }}
            variant="btn btn-outline-danger" // Você pode ajustar o estilo e classe conforme necessário
            type="button"
            className="mt-5"
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>
          <Button className="mt-5" type="submit" variant="btn btn-outline-success">
            {props.atualizando ? "Atualizar" : "Cadastrar"}
          </Button>{" "}
        </div>
      </Form>
    </>
  );
}
