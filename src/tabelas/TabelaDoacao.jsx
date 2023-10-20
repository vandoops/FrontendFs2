import { useState, useEffect } from "react";
import { Button, Container, Table, Form, Row } from "react-bootstrap";
// import { urlBase } from "../utilitarios/definicoes";

export default function TabelaDoacao(props) {
  const [nomes, setNomes] = useState({});

  useEffect(() => {
    async function fetchNomes() {
      const nomesFetched = {};

      for (const doacao of props.listaDoacao) {
        if (!nomesFetched[doacao.pessoaDoadora]) {
          const response = await fetch(`/api/obterNomePorCPF?cpf=${doacao.pessoaDoadora}`);
          const data = await response.json();
          nomesFetched[doacao.pessoaDoadora] = data.nome;
        }
      }

      setNomes(nomesFetched);
    }

    fetchNomes();
  }, [props.listaDoacao]);

  function filtrarDoacao(e) {
    const termoBusca = e.currentTarget.value;
    fetch("https://129.146.68.51/aluno13-pfsii/doacao", { method: "GET" })
    
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaDoacao) => {
        if (Array.isArray(listaDoacao)) {
          const resultadoBusca = listaDoacao.filter((doacao) =>
            doacao.pessoaDoadora.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setDoacao(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Container>
        <Row className="col-4">
          <Form.Control
            type="text"
            id="termoBusca"
            onChange={filtrarDoacao}
            className="my-2"
            placeholder="Pesquisar..."
            aria-label="Search"
          />
        </Row>
      </Container>
      <Table striped bordered hover className="shadow-lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pessoa Doadora</th>
            <th>Item Doado</th>
            
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaDoacao?.map((doacao) => {
            return (
              <tr key={doacao.idDoacao}>
                <td>{doacao.idDoacao}</td>
                <td>{nomes[doacao.pessoaDoadora] || doacao.pessoaDoadora}</td>
                <td>{doacao.quantidade}</td>
                
                
                <td>
                  <Button
                    onClick={() => {
                      props.editarDoacao(doacao);
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
                      if (
                        window.confirm(
                          "Confirma a exclusão da doação?"
                        )
                      ) {
                        props.excluirDoacao(doacao);
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
      {props.listaDoacao && props.listaDoacao.length === 0 && (
        <p className="text-center my-4">Nenhuma doação cadastrada.</p>
      )}
      <div className="d-flex justify-content-end mb-5">
        <Button
          variant="btn btn-outline-success"
          className="mt-3"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          Cadastrar Doação
        </Button>
      </div>
    </Container>
  );
}
