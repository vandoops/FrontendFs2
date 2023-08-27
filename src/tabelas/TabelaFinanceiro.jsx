import React, { useState, useEffect } from "react";
import { Button, Container, Table, Row } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";
import pt from "date-fns/locale/pt-BR";





export default function TabelaFinanceiro(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("https://129.146.68.51/aluno13-pfsii/financas", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaFinanceiros) => {
        if (Array.isArray(listaFinanceiros)) {
          setOriginalData(listaFinanceiros);
          setFilteredData(listaFinanceiros);
        }
      });
  }, []);

  function filtrarPorDataRange() {
    if (startDate && endDate) {
      const startDateFormatted = moment(startDate).format('DD/MM/YYYY');
      const endDateFormatted = moment(endDate).format('DD/MM/YYYY');

      const filteredResult = originalData.filter(
        (Financeiro) =>
          moment(Financeiro.datadep).isBetween(
            startDateFormatted,
            endDateFormatted,
            undefined,
            "[]"
          )
      );
      setFilteredData(filteredResult);
    }
  }

  function limparFiltro() {
    setStartDate(null);
    setEndDate(null);
    setFilteredData(originalData);
  }



  return (
    <Container>

      <Container>
        <Row className="col-12">
          <div className="d-flex my-3 justify-content-start">
            <div className="d-flex align-items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Data inicial"
                locale={pt}
                className="ml-2 mx-3 custom-date-picker start-date-picker" // ARREDONDAMENTO DE BORDA
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="Data final"
                locale={pt}
                className="ml-2 custom-date-picker end-date-picker" // ARREDONDAMENTO DE BORDA
              />
            </div>
            <Button className="mx-3" onClick={filtrarPorDataRange} variant="btn btn-outline-success ml-2 btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Button>
            <Button onClick={limparFiltro} variant="btn btn-outline-secondary ml-2 btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </Button>
          </div>
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
            {filteredData.map((Financeiro) => {
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
                  <td>{Financeiro.idMovimentacao}</td>
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
      <div className="d-flex justify-content-end mb-5">
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
    </Container>
  );
}