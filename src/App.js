import './App.css';
import {useState, useEffect} from 'react';



function App() {

    const [tarefas, setarTarefas] = useState([
/*
      {
        id: 0,
        tarefa: 'Hoje eu preciso programar sobre React',
        finalizada: false
      },

      {
        id: 1,
        tarefa: 'Hoje eu preciso curtir o aniversário de Bela com ela',
        finalizada: true
      },
*/


    ]);
    const [modal, setModal] = useState(false);

    const fechar = (id) =>{
        let addTarefas = tarefas.filter(function(val){
          if(val.id == id){
            if(val.finalizada == false){
              val.finalizada = true;
            }else{
              val.finalizada = false; 
            }
         
        }
          return val;
        

         
        })
        setarTarefas(addTarefas);
        window.localStorage.setItem('tarefas', JSON.stringify(addTarefas));
    }

    useEffect(() => {
      if(window.localStorage.getItem('tarefas') != undefined){
        setarTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
        console.log(window.localStorage.getItem('tarefas'));
      }
    }, [])

    const excluir = (id) =>{
      let addTarefas = tarefas.filter(function(val){
        if(val.id !== id){
          
          return val;
      }
      })
      setarTarefas(addTarefas);

    }
  

    const salvarTarefa = () =>{
      var salvar = document.getElementById('tarefas-js').value;
      
      setarTarefas([
        ...tarefas,
        {
        id: new Date().getTime(),
        tarefa: salvar,
        finalizada: true
        }
      ]);

      window.localStorage.setItem('tarefas', JSON.stringify([

        ...tarefas,
        {
        id: new Date().getTime(),
        tarefa: salvar,
        finalizada: true
        }


      ]))

      setModal(false);
    }

    const abrirModal = () =>{
      setModal(!modal);
    }



  return (

    <div className="section1">
      {
        modal?
        <div className="modal"> 
          <div className="modal-card">
             <h3>Adicionar tarefa</h3>
            <input id="tarefas-js" type="text"></input>
            <button onClick={() => salvarTarefa()}>Salvar</button>
           </div>
           <div className="fechar-modal">
           <p onClick={() => abrirModal()}>x</p> 
          
           </div>
        </div>
        :
        <div></div>
      }
      <div className="adicionar" onClick={() => abrirModal()}>+</div>
      <div className="container">
        <h1>Minhas tarefas do dia!!</h1>
          
         {
           tarefas.map((val)=>{
             if(val.finalizada){
             return(
               <div className="linha"> 
               <p onClick={() => fechar(val.id)}>{val.tarefa}</p>
               <h7 onClick={() => excluir(val.id)}>x</h7>
               </div>
             ) 
           }else{
             return(
               <div className="linha">
               <p className="p" onClick={() => fechar(val.id)} style={{textDecoration:'line-through'}}>{val.tarefa}</p>
               <h7 onClick={() => excluir(val.id)}>x</h7>
               </div>
             )
           }
          
          })
         } 


      </div>
    </div>
  );
}

export default App;
