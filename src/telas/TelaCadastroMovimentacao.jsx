import Pagina from "../templates/Pagina";
import FormTipoMovimentacao from "../formularios/FormTipoMovimentacao";
import TabelaTipoMovimentacao from "../tabelas/TabelaTipoMovimentacao";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroMovimentacao(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [movimentacoes, setMovimentacao] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [movimentacaoEmEdicao, setMovimentacaoEmEdicao] = useState({
        idMovimentacao: 0,
        tipoMovimentacao: ""
    });

    function prepararMovimentacaoParaEdicao(movimentacao) {
        setAtualizando(true);
        setMovimentacaoEmEdicao(movimentacao);
        setExibirTabela(false);
    }

    function excluirMovimentacao(movimentacao) {
        fetch(urlBase + "/tipomovimentacao",  {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movimentacao),
        })
            .then((resposta) => {
                if (resposta.ok) {
                    const listaAtualizada = movimentacoes.filter(
                        (item) => item.idMovimentacao !== movimentacao.idMovimentacao
                    );
                    setMovimentacao(listaAtualizada);
                    alert("Movimentação excluída com sucesso!");
                } else {
                    alert("Não foi possível excluir a movimentação.");
                }
            })
            .catch((erro) => {
                alert("Erro ao executar a requisição: " + erro.message);
            });
    }

    useEffect(() => {
        fetch(urlBase + "/tipomovimentacao",  {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setMovimentacao(dados);
            }
        }).catch((erro) => {
            console.error("Erro ao obter movimentações:", erro);
        });
    }, []);

    return (
        <Pagina>
            <Container>
                <Alert variant="secondary" className="text-center m-2 shadow-sm mb-4 rounded">
                    Cadastro de Movimentações
                </Alert>
                {exibirTabela ? (
                    <TabelaTipoMovimentacao
                        listaMovimentacao={movimentacoes}
                        setMovimentacao={setMovimentacao}
                        exibirTabela={setExibirTabela}
                        editarMovimentacao={prepararMovimentacaoParaEdicao}
                        excluirMovimentacao={excluirMovimentacao}
                    />
                ) : (
                    <FormTipoMovimentacao
                        listaMovimentacao={movimentacoes}
                        setMovimentacao={setMovimentacao}
                        exibirTabela={setExibirTabela}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        atualizando={atualizando}
                        movimentacao={movimentacaoEmEdicao}
                    />
                )}
            </Container>
        </Pagina>
    );
}
