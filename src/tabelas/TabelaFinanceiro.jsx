import React from "react";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";


export default function TabelaFinanceiro(props) {

  function Pesquisar(e) {
    const termoBusca = e.currentTarget.value;
    console.log(e)
    fetch(urlBase + "/financas", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaFinanceiros) => {
        if (Array.isArray(listaFinanceiros)) {
          const resultadoBusca = listaFinanceiros.filter((Financeiro) =>
            Financeiro.tipodep.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setFinanceiro(resultadoBusca);
        }
      });
  }

  return (
    <Container>

      <Container>
        <Row className="col-12">
          <Col>
            <div className="d-flex my-3 justify-content-between align-items-center">
              <Row className="col-4">
                <Form.Control
                  className="my-2"
                  type="text"
                  placeholder="Pesquisar..."
                  id="termoBusca"
                  onChange={Pesquisar}
                />
              </Row>
              <Button
                variant="btn btn-outline-success"
                className="mt-3"
                onClick={() => {
                  props.exibirTabela(false);
                }}
              >
                Cadastrar
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="table-responsive">
        <Table striped bordered hover className="shadow-lg">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Movimentação</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {props.listaFinanceiros.map((Financeiro) => {
              return (
                <tr key={Financeiro.id_financeiro}>
                  <td>{Financeiro.id_financeiro}</td>
                  <td className="text-center">
                    {Financeiro.saida ? (
                      <FaRegArrowAltCircleDown color="red" />
                    ) : (
                      <FaRegArrowAltCircleUp color="green" />
                    )}
                  </td>
                  <td>R$ {Financeiro.valor}</td>
                  <td>{moment(Financeiro.datadep).format('DD/MM/YYYY')}</td>
                  <td>{Financeiro.tipodep}</td>
                  <td>
                    <Button
                      onClick={() => {
                        props.editarFinanceiro(Financeiro);
                      }}
                      title="Editar"
                      variant="btn btn-outline-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        if (window.confirm("Confirma a exclusão do valor ?")) {
                          props.excluirFinanceiro(Financeiro);
                        }
                      }}
                      title="Excluir"
                      variant="btn btn-outline-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>

    </Container>
  );
}