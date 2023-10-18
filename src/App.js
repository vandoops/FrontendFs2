import TelaCadastrofuncao from "./telas/TelaCadastroFuncao.jsx";
import TelaCadPessoa from "./telas/TelaCadPessoa.jsx";
import TelaCadastroFinanceiro from "./telas/TelaCadastroFinanceiro.jsx";
import TelaCadastroMovimentacao from "./telas/TelaCadastroMovimentacao.jsx";
import TelaCadastroItem from "./telas/TelaCadastroItem.jsx";
import TelaCadastroDoacao from "./telas/TelaDoacao.jsx";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/Tela404";

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          
          <Route path="/funcao" element={<TelaCadastrofuncao/>}/>
                  
          <Route path="/pessoas" element={<TelaCadPessoa/>}/>
          <Route path="/financas" element={<TelaCadastroFinanceiro/>}/>
          <Route path="/tipomovimentacao" element={<TelaCadastroMovimentacao/>}/>
          <Route path="/itemdoacao" element={<TelaCadastroItem/>}/>
          <Route path="/doacao" element={<TelaCadastroDoacao/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>} />
          

        </Routes>
        
     </BrowserRouter>
    </div>
  );
}

export default App;
