import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function FormItem(props) {
  const [validado, setValidado] = useState(false);
  const [item, setItens] = useState(props.item);
 

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setItens({ ...item, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.atualizando) {
        // Lógica para criar um novo item
        fetch(urlBase + "/item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaItens;
              novaLista.push(item);
              props.setItens(novaLista);
              props.exibirTabela(true);
              window.location.reload();
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        // Lógica para atualizar um item existente
        fetch(urlBase + "/item", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((resposta) => {
            return resposta.json()
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaItens || [];
              novaLista.push(item);
              props.setItens(novaLista);
              props.exibirTabela(true);
              setItens(props.item);
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
      <Form
        className="shadow-lg p-3 mt-4 bg-white rounded"
        noValidate
        validated={validado}
        onSubmit={manipulaSubmissao}
      >
        <Row>
          <Col className="d-none">
            <Form.Group as={Col} md="12">
              <Form.Label>ID</Form.Label>
              <Form.Control
                className="hidden"
                type="text"
                placeholder="ID do Item"
                value={item.idItem}
                id="idItem"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Digite o ID deste Item, em breve será auto incremento....
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} md="12">
              <Form.Label>Nome do Item:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Item a ser cadastrado, Ex: Arroz, açucar , cadeira etc..."
                value={item.nomeItem}
                id="nomeItem"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Digite o item a ser cadastrado, Ex: Produto, Serviço...
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <div className="d-flex justify-content-end mb-1 mt-5">
                        <Button style={{ marginRight: '5px' }} variant="btn btn-outline-danger" type="button" className="mt-5 " onClick={() => {
                            props.exibirTabela(true);
                        }}>Voltar</Button>{" "}
            <Button className="mt-5" type="submit" variant="btn btn-outline-success">{props.atualizando ? ('Atualizar') : "Cadastrar"}</Button>{' '}
                    </div>
        </Row>
      </Form>
    </>
  );
}
