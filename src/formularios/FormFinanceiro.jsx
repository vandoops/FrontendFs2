import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import moment from "moment";


export default function FormFinanceiro(props) {
  const [validado, setValidado] = useState(false);
  const [Financeiro, setFinanceiro] = useState(props.Financeiro);
  const [tipoRegistro, setTipoRegistro] = useState("");

  const [movimentacoes, setmovimentacoes] = useState([]);


  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;

    if (elemForm.type === "radio" && elemForm.name === "group1" && elemForm.checked) {
      setTipoRegistro(valor);
    }

    setFinanceiro({ ...Financeiro, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      const dadosParaEnviar = {
        id_financeiro: Financeiro.id_financeiro,
        valor: Financeiro.valor,
        datadep: Financeiro.datadep,
        tipodep: Financeiro.tipodep,
        isExpense: tipoRegistro === "saida" ? true : false,
      };

      if (tipoRegistro === "entrada") {
        dadosParaEnviar.entrada = Financeiro.entrada;
        // Remover a propriedade "saida" para garantir que seja "null"
        delete dadosParaEnviar.saida;
      }

      if (tipoRegistro === "saida") {
        dadosParaEnviar.saida = Financeiro.saida;
        // Remover a propriedade "entrada" para garantir que seja "null"
        delete dadosParaEnviar.entrada;
      }

      const dataFormatada = moment(Financeiro.datadep).format("YYYY-MM-DD");
      dadosParaEnviar.datadep = dataFormatada;

      if (!props.atualizando) {
        fetch("https://129.146.68.51/aluno13-pfsii/financas", {
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
              let novaLista = props.listaFinanceiro || [];
              novaLista.push(Financeiro);
              props.setFinanceiro(novaLista);
              props.exibirTabela(true);
              window.location.reload();
            }
            window.alert(dados.mensagem); // Apenas exibe a propriedade "mensagem" da resposta
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        fetch("https://129.146.68.51/aluno13-pfsii/financas", {
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
              let novaLista = props.listaFinanceiro || [];
              novaLista.push(Financeiro);
              props.setFinanceiro(novaLista);
              props.exibirTabela(true);
              setFinanceiro(props.Financeiro);
              window.location.reload();
            }
            window.alert(dados.mensagem); // Apenas exibe a propriedade "mensagem" da resposta
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



  useEffect(() => {
    fetch("https://129.146.68.51/aluno13-pfsii/tipomovimentacao", {
      method: "GET"
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setmovimentacoes(dados);
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
          <Col className="d-none">
            <Form.Group as={Col} md="12">
              <Form.Label>ID</Form.Label>
              <Form.Control
                className="hidden"
                type="text"
                placeholder="ID do Financeiro"
                value={Financeiro.id_financeiro}
                id="id_financeiro"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Digite o ID deste Financeiro.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="mt-4">
            <Form.Group as={Col} md="6">
              <Form.Check
                type="radio"
                label="Entrada"
                id="entrada"
                name="group1"
                value="entrada"
                onChange={manipularMudanca}
                checked={tipoRegistro === "entrada"}
              />
              <Form.Check
                type="radio"
                label="Saída"
                id="saida"
                name="group1"
                value="saida"
                onChange={manipularMudanca}
                checked={tipoRegistro === "saida"}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} md="8">
              <Form.Label>Movimentação:</Form.Label>
              <Form.Select
                type="text"
                placeholder="Tipo de Movimentação"
                //value={Financeiro.tipodep}
                id="tipodep"
                onChange={manipularMudanca}
                required>
                
                <option value="">Selecione</option>
                {movimentacoes.map((movimentacao) => (
                  <option key={movimentacao.idMovimentacao} value={movimentacao.idMovimentacao} >
                    {movimentacao.tipoMovimentacao}
                  </option>
                ))}

                
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                Digite o tipo de Movimentação !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} md="12">
              <Form.Label>Valor:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor"
                value={Financeiro.valor}
                id="valor"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Digite o valor!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} md="12">
              <Form.Label>Data de Depósito:</Form.Label>
              <Form.Control
                type="date"
                value={moment(Financeiro.datadep).format("YYYY-MM-DD")}
                id="datadep"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Digite a data de depósito ou de retirada !
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <div className="d-flex justify-content-end mb-1 mt-5">
            <Button
              style={{ marginRight: "5px" }}
              variant="btn btn-outline-danger"
              type="button"
              className="mt-5"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>{" "}
            <Button className="mt-5" type="submit" variant="btn btn-outline-success">
              {props.atualizando ? "Atualizar" : "Cadastrar"}
            </Button>{" "}
          </div>
        </Row>
      </Form>
    </>
  );
}