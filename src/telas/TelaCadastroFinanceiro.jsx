import Pagina from "../templates/Pagina";
import FormFinanceiro from "../formularios/FormFinanceiro";
import TabelaFinanceiro from "../tabelas/TabelaFinanceiro";
import { useState, useEffect, useCallback } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import Card from 'react-bootstrap/Card';
import { BsBank } from "react-icons/bs";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown

} from "react-icons/fa";

export default function TelaCadastroFinanceiro(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [Financeiros, setFinanceiro] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [FinanceiroEmEdicao, setFinanceiroEmEdicao] = useState({
    id_financeiro: 0,
    saida: "",
    entrada: "",
    valor: 0,
    datadep: "",
    tipodep: "",
  });


  const [totalEntradas, setTotalEntradas] = useState(0); // Estado para armazenar o total das entradas

  const calcularTotalEntradas = useCallback(() => {
    let total = 0;
    Financeiros.forEach((item) => {
      if (item.entrada === "entrada") {
        total += parseFloat(item.valor);
      }
    });
    return total;
  }, [Financeiros]);

  useEffect(() => {
    const total = calcularTotalEntradas();
    setTotalEntradas(total);
  }, [Financeiros, calcularTotalEntradas]);


  // SAIDAAAAS//
  const [totalSaidas, setTotalSaidas] = useState(0);
  const calcularTotalSaidas = useCallback(() => {
    let total = 0;
    Financeiros.forEach((item) => {
      if (item.saida === "saida") {
        total += parseFloat(item.valor);
      }
    });
    return total;
  }, [Financeiros]);

  useEffect(() => {
    const total = calcularTotalSaidas();
    setTotalSaidas(total);
  }, [Financeiros, calcularTotalSaidas]);

  //TOTAL CAIXA//
  const calcularTotalEmCaixa = useCallback(() => {
    return calcularTotalEntradas() - calcularTotalSaidas();
  }, [calcularTotalEntradas, calcularTotalSaidas]);

  function prepararFinanceiroParaEdicao(Financeiro) {
    console.log("prepararFinanceiroParaEdicao", Financeiro);
    setAtualizando(true);
    setFinanceiroEmEdicao(Financeiro);
    setExibirTabela(false);
  }

  function apagarFinanceiro(Financeiro) {
    fetch("https://129.146.68.51/aluno13-pfsii/financas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Financeiro),
    })
      .then((resposta) => {
        if (resposta.ok) {
          const listaAtualizada = Financeiros.filter(
            (item) => item.id_financeiro !== Financeiro.id_financeiro
          );
          setFinanceiro(listaAtualizada);
          alert("Financeiro excluído com sucesso!");
        } else {
          alert("Não foi possível excluir o Financeiro.");
        }
      })
      .catch((erro) => {
        alert("Erro ao executar a requisição: " + erro.message);
      });
  }

  useEffect(() => {
    fetch("https://129.146.68.51/aluno13-pfsii/financas", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setFinanceiro(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter Financeiros:", erro);
      });
  }, []);

  return (
    <Pagina>
      <Container>
        <Alert
          variant={"secondary"}
          className="text-center m-2 shadow-sm mb-4 rounded"
        >
          Cadastro Financeiro
        </Alert>
        <Container className="d-flex flex-wrap justify-content-center align-items-center text-center ">
          <Card className="shadow" style={{ width: '18rem', margin: '10px', backgroundColor: '' }}>
            <Card.Body>

              <Card.Title>ENTRADA {" "} {/* Espaço em branco */}<FaRegArrowAltCircleUp color="green" /></Card.Title>


              <Card.Subtitle className="mb-2 ">TOTAL DE ENTRADAS</Card.Subtitle>
              <Card.Text>
                R$ {totalEntradas.toFixed(2)} {/* Exibe o total das entradas */}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow" variant="dark" style={{ width: '18rem', margin: '10px', backgroundColor: '' }}>
            <Card.Body>

              <Card.Title>SAIDA {" "} {/* Espaço em branco */} <FaRegArrowAltCircleDown color="red" /></Card.Title>
              <Card.Subtitle className="mb-2 ">TOTAL DE SAIDAS</Card.Subtitle>
              <Card.Text>
                R$ {totalSaidas.toFixed(2)} {/* Exibe o total das Saidas */}
              </Card.Text>


            </Card.Body>
          </Card>
          <Card className="shadow" style={{ width: '18rem', margin: '10px', backgroundColor: '' }}>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center align-items-center">
                TOTAL
                <BsBank size={16} style={{ marginLeft: '5px' }} />
              </Card.Title>
              <Card.Subtitle className="mb-2">VALOR EM CAIXA</Card.Subtitle><Card.Text>R$ {calcularTotalEmCaixa().toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
        {exibirTabela ? (
          <TabelaFinanceiro
            listaFinanceiros={Financeiros}
            setFinanceiro={setFinanceiro}
            exibirTabela={setExibirTabela}
            editarFinanceiro={prepararFinanceiroParaEdicao}
            excluirFinanceiro={apagarFinanceiro}
          />
        ) : (
          <FormFinanceiro
            listaFinanceiros={Financeiros}
            setFinanceiro={setFinanceiro}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            atualizando={atualizando}
            Financeiro={FinanceiroEmEdicao}

          />
        )}
      </Container>
    </Pagina>
  );
}