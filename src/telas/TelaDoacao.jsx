import Pagina from "../templates/Pagina";
import FormDoacao from "../formularios/FormDoacao"; // Importe o componente de formulário de doações
import TabelaDoacao from "../tabelas/TabelaDoacao"; // Importe o componente de tabela de doações
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroDoacao(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [doacoes, setDoacoes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [doacaoEmEdicao, setDoacaoEmEdicao] = useState({
    idDoacao: 0,
    pessoaDoadora: "",
    itensdoados: "",
    quantidade: 0,
  });

  function prepararDoacaoParaEdicao(doacao) {
    setAtualizando(true);
    setDoacaoEmEdicao(doacao);
    setExibirTabela(false);
  }

  function apagarDoacao(doacao) {
    fetch(urlBase + "/doacao", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doacao),
    })
      .then((resposta) => {
        if (resposta.ok) {
          const listaAtualizada = doacoes.filter(
            (item) => item.idDoacao !== doacao.idDoacao
          );
          setDoacoes(listaAtualizada);
          alert("Doação excluída com sucesso!");
        } else {
          alert("Não foi possível excluir a doação.");
        }
      })
      .catch((erro) => {
        alert("Erro ao executar a requisição: " + erro.message);
      });
  }

  useEffect(() => {
    fetch(urlBase + "/doacao", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setDoacoes(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter doações:", erro);
      });
  }, []);

  return (
    <Pagina>
      <Container>
        <Alert
          variant={"secondary"}
          className="text-center m-2 shadow-sm mb-4 rounded"
        >
          Cadastro de Doações
        </Alert>
        {exibirTabela ? (
          <TabelaDoacao
            listaDoacao={doacoes}
            setDoacao={setDoacoes}
            exibirTabela={setExibirTabela}
            editarDoacao={prepararDoacaoParaEdicao}
            excluirDoacao={apagarDoacao}
          />
        ) : (
          <FormDoacao
            listaDoacao={doacoes}
            setDoacao={setDoacoes}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            atualizando={atualizando}
            doacao={doacaoEmEdicao}
          />
        )}
      </Container>
    </Pagina>
  );
}
