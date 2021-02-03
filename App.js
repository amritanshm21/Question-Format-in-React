import { useState } from 'react';
import './App.css';
var i =4;
function App() {

  const [datas,setDatas] = useState([{label:'Option 1',value:'',id:'1'},{label:'Option 2',value:'',id:'2'},{label:'Option 3',value:'',id:3},{label:'Option 4',value:'',id:4}]);
  const [display,setDisplay] = useState([]);
  const [isVisible,setIsVisible]=useState(false);
  const [inputQuestion,setInputQuestion]=useState('');
  const [inputAnswer,setInputAnswer]=useState('');
  const [inputOption,setInputOption]=useState([]);
  const [optionId,setOptionId]=useState('');
  const [displayId,setDisplayId]=useState('');
  const [saveBtn,setSaveBtn]=useState('Save');
  const [editId,setEditId]=useState('');
  // const [obj,setObj]=useState([]);
  // const [inputVal,setInputVal]=useState('');

  
  const Add = () => {
    if(i<6){
      i++;
      setDatas([...datas,{label:'Option ' + i,value:'',id:i}]);
    }
    
  }

  const Remove = () =>{
    if(i>3){
      const data1 = [...datas]
      const newData = data1.filter(item => item.label !== "Option "+i)
      setDatas([...newData]);
      i--;
    }
    console.log(i);
  }

  const reset = () => {
    setInputQuestion('');
    let rst = datas.slice();
    rst.forEach(item =>{
      item.value = "";
    })
    setDatas(rst);
    console.log(display);

  }

  const addQuestion = (e) => {
    setInputQuestion(e.target.value)
  }

  const addOption = (e) => {
    let dt = datas.slice();
    const index1 = datas.findIndex(item=>item.id === optionId);
    let opt = [...inputOption];
    opt[index1] = e.target.value;
    dt[index1].value = e.target.value;
    setDatas(dt);
    // setDatas([...datas,{value:opt[index1]}])
    setInputOption(opt);
    // setInputOption(e.target.value)
    // console.log(opt); 
  }
  
  const addAnswer = (e) => {
    setInputAnswer(e.target.value);
    // console.log(inputAnswer);
  }

  const result = () => {
    var qstn = "";
    var optn = [];
    var answ = "";
    qstn = inputQuestion;
    optn = inputOption;
    answ = inputAnswer;
    // setObj([...obj,{qstn,optn}])
    
    setIsVisible(true);
    if(saveBtn === "Save"){
      setDisplay([...display,{qstn,optn,answ,id:Date.now()}]);
    }else{
      const index2 = display.findIndex(item => item.id === editId);
      display[index2] = {qstn,optn,answ,id:editId};
      setDisplay([...display]);
    }
    let s ="Save";
    setSaveBtn(s);
    reset();
  }

  const edit = (que,ans,optns,ids) => {
    setInputQuestion(que);
    setInputAnswer(ans);
    setEditId(ids);
    let opt1 = [...datas];
    var i;
    for(i=0;i<optns.length;i++){
      opt1[i].value = optns[i]
    }
    
    setDatas(opt1);
    let s = "Update";   
    setSaveBtn(s)
    // console.log(opt1)
    // console.log("Questions ",que);
    // console.log("options ",optns[0]);
    // console.log("Answer ",ans)
  }

  const dlt = () => {
    const ind = display.findIndex(item => item.id === displayId);
    display.splice(ind-1,1);
    setDisplay([...display]);
    // console.log(inputAnswer);
  }

  const view = () => {

  }
  

  return (
    <div id="main">
            <div id="form">
                    <div id="qstn">
                    <input type="text" className="inpt1" placeholder="Question Goes Here ..." id="question" value={inputQuestion} onChange={addQuestion}/>
                    <button id="reload" onClick={reset}> </button>
                    </div>
                <div id="addRemove">Add/Remove option    :
                  <button onClick={Add} id="adding"></button>
                  <button onClick={Remove} id="removal"></button>   
                </div>
                <div id="opt">
                    
                    {datas.map(item => {
                      return (
                        <div className="two">
                          <label className="label">{item.label}</label>
                          <input type="text" placeholder="Type option here ..." className="inpt2" value={item.value} onKeyDown={() => setOptionId(item.id)} onChange={addOption} />
                        </div>
                      )
                    } )}
                </div>
                <div id="three">
                        <select id="inpt3" onChange={addAnswer}>
                          <option value=""> --- Choose Answer --- </option>
                          {datas.map(item => 
                            <option id="ans1" className="answer" value={item.value} onKeyPress={() => setInputAnswer(item.value)} >{item.value}</option>
                          )}
                        </select>
                    <button id="btn3" onClick={result} value={saveBtn}>{saveBtn}</button>
                </div>
            </div>
            <div id="form2">
                {isVisible&&<div id="conclude"></div>}
                {/* {display.length&&<div id="conclude"></div>} */}
                {display.map(item => {
                  return (
                    <div className="table">
                      
                      <div className="first">Question : {item.qstn} </div>
                      <div className="box">
                        <button className="second" onClick={() =>edit(item.qstn,item.answ,item.optn,item.id)}></button>
                      </div>
                      <div className="box">
                        <button className="third" onClick={view}></button>
                      </div>
                      <div className="box">
                        <button className="fourth" onClick={dlt} onKeyDown={() => setDisplayId(item.id)} ></button>
                      </div>
                    </div> 
                  )
                })}
              </div>
        </div>
  );
}

export default App;
