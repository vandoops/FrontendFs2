import TelaCadastrofuncao from "./telas/TelaCadastroFuncao.jsx";
import TelaCadastroFinanceiro from "./telas/TelaCadastroFinanceiro.jsx";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/Tela404";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/funcao" element={<TelaCadastrofuncao/>}/>
          <Route path="/financas" element={<TelaCadastroFinanceiro/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>} />
            
        </Routes>
        
     </BrowserRouter>
    </div>
  );
}

export default App;
