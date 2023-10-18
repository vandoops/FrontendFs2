import Pagina from "../templates/Pagina";
import FormItem from "../formularios/FormItem"; // Importe o componente de formulário de itens
import TabelaItem from "../tabelas/TabelaItem"; // Importe o componente de tabela de itens
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroItem(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [itens, setItens] = useState([]); // Altere para 'itens' em vez de 'funcoes'
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [itemEmEdicao, setItemEmEdicao] = useState({
    idItem: 0,
    nomeItem: "",
  });

  function prepararItemParaEdicao(item) {
    setAtualizando(true);
    setItemEmEdicao(item);
    setExibirTabela(false);
  }

  function apagarItem(item) {
    fetch(urlBase + "/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((resposta) => {
        if (resposta.ok) {
          const listaAtualizada = itens.filter(
            (item) => item.idItem !== item.idItem
          );
          setItens(listaAtualizada);
          alert("Item excluído com sucesso!");
        } else {
          alert("Não foi possível excluir o item.");
        }
      })
      .catch((erro) => {
        alert("Erro ao executar a requisição: " + erro.message);
      });
  }

  useEffect(() => {
    fetch(urlBase + "/item", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setItens(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter itens:", erro);
      });
  }, []);

  return (
    <Pagina>
      <Container>
        <Alert variant={"secondary"} className="text-center m-2 shadow-sm mb-4 rounded">
          Cadastro de Itens
        </Alert>
        {exibirTabela ? (
          <TabelaItem
            listaItens={itens}
            setItens={setItens}
            exibirTabela={setExibirTabela}
            editarItem={prepararItemParaEdicao}
            excluirItem={apagarItem}
          />
        ) : (
          <FormItem
            listaItens={itens}
            setItens={setItens}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            atualizando={atualizando}
            item={itemEmEdicao}
          />
        )}
      </Container>
    </Pagina>
  );
}
