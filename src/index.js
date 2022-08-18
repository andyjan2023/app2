import { useState, useEffect, useContext, useRef } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App2 from "./app2";
import axios from "axios";
import { LoginContext } from "./context";
import { faker } from "@faker-js/faker";
import App from "./App";


// import {CssBaseLine,Grid} from './@material-ui ';

// const Travel=()=>{
//   return(<>
//   <CssBaseLine/>
//   <Header/>
//   <Grid container spacing={12}></Grid>
  
//   </>
//   )
// }

const Person1 = (props) => {
  return (
    <>
      <h2>name: john</h2>Place
      <h1>age: 11{props.gender}</h1>
    </>
  );
};
class Person2 extends React.Component {
  render(props) {
    return (
      <>
        <h2>name:mary</h2>
        <h1>{this.props.sport}</h1>
      </>
    );
  }
}

const App1 = () => {
  const [counter, setCounter] = useState("red");
  useEffect(() => {
    console.log("changed");
  });

  return (
    <div>
      <button onClick={() => setCounter((x) => x + "andy")}>-</button>
      <h2>{counter}</h2>
      <button onClick={() => setCounter((x) => x + "best")}>+</button>
    </div>
  );
};

class Game extends React.Component {
  constructor() {
    super();
    this.name = "andy";
  }
  render() {
    return (
      <div>
        <h1>helo mr. {this.name}</h1>
        {this.name ? "test1" : <>test</>}
        <Person1 gender="boy" />
        <Person2 sport={"swimming"} />
        <App1 />
        <App2 />
      </div>
    );
  }
}

const API_URL = "http://www.omdbapi.com?apikey=1f2d39e0&";

const AppM = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    clicking("batman");
  }, []);

  // const searchMovies = async (title) => {
  //  await fetch(`${API_URL}&s=${title}`).then(response=>response.json())
  //  .then(data=>setMovies(data.Search)).catch((error)=>{console.log(error)})

  const clicking = (x) => {
    axios(`${API_URL}&s=${x}`).then((res) => setMovies(res.data.Search));
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="write"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={() => clicking(input)}>search</button>
        {/* onClick={clicking(input)}>search</button> refresh on input!! */}
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((x) => ( <MCard m={x} /> ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

const MCard = ({ m: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>
      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}/>
      </div>
      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

// fetch('https://catfact.ninja/fact').then((res)=>res.json())//then json to object
// .then((data)=>{
//   console.log(data);})

const Cat = () => {
  //  fetch('https://catfact.ninja/fact').then((res)=>res.json())//then json to object
  //  .then((data)=>{
  // console.log(data);
  // })
  const urll = "https://catfact.ninja/fact";

  const clicking = () => {
    // fetch(urll).then(res=>res.json()).then(data=>setCatfact(data.fact));
    axios.get(urll).then((res) => setCatfact(res.data.fact));
  };
  const [catFact, setCatfact] = useState("");

  useEffect(() => {
    clicking();
  }, []);
  return (
    <div className="app">
      <button onClick={clicking}>cat fact</button>
      <p>{catFact}</p>
    </div>
  );
};

//      <input value={input} onChange={(e) => setInput(e.target.value)} />

const Agge = () => {
  const urlll = "https://api.agify.io/?name=";

  const [agee, setAge] = useState("");
  const [input, setInput] = useState("j1");
  useEffect(() => {
    axios(`${urlll}${input}`)
      .then((res) => setAge(res.data))
      .catch({ name: "j", age: 38, count: 32346 });
  }, [input]);

  // useEffect(()=>{
  //   clicking()
  // },[]
  // )
  return (
    <div className="app">
      {/* <button onClick={clicking} >predicting age</button><br/> */}
      <input
        value={input}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setInput(e.target.value);
          }
        }}
      ></input>
      <p>your age is {agee.age}</p>
      <p>your name is {agee.name}</p>
      <p>your count is {agee.count}</p>
    </div>
  );
};

const InputM = () => {
  const [{ input, input2 }, setInput]
   = useState({ input: JSON.parse(localStorage.getItem('input'))|1, input2: 2 });

  useEffect(()=>{
    localStorage.setItem('input',JSON.stringify(input))
  },[input])

  return (
    <>
      <input value={input}  onChange={e => { setInput(curr=> ({ ...curr, input: e.target.value }));
   //returning object literal in arrow function to avoid being block statment
        }}></input>
      {/* ...curr */}
      {input}<br />{input2}
    </>
  );
};

const useForm = (initial) => {
  const [x, setValue] = useState(initial);
  return [x, e => setValue(curr=>({ ...curr, [e.target.name]: e.target.value }))];
};

const useNumber = (url) => {
  const [state, setState] = useState({ data: "", loading: false });
  useEffect(() => {
    setState(curr=>({ data:curr.data, loading: true }));
    // fetch(url).then((res) => res.text())
    axios(url).then((res)=> {setState({ data: res.data, loading: false });});
  }, [url]);
  return state;
};

const TextM = () => {
  const [btn, setBtn] = useState(true);
  const [form, handleChange] = useForm(()=>JSON.parse(localStorage.getItem('form'
  ))); // for cumstom hook {email:'dand@',password:'dfaj'}

  
  const[count,setCount]=useState(JSON.parse(localStorage.getItem('count'))|'10')
  //lazy intialization useState to prevent exusion
  var url = `http://numbersapi.com/${count}/trivia`;
  const { data, loading } = useNumber(url);

useEffect(()=>{
  localStorage.setItem('count', JSON.stringify(count));
},[count])
useEffect(()=>{
  localStorage.setItem('form', JSON.stringify(form));
},[form]
)
  // const {data,loading}=useNumber(url)

  // Axios.get(url).then(res=>{console.log(res.data);})

  const sdf={color:'red'}
  const date= new Date()
  const dd=[2,3,4]

//can use in ternary notation/ ||(or) inside {}(jsx expression)


  return (
    <div className="app">
{sdf.color}
{new Date().toLocaleDateString()}
<input style={{color:'blue',border:'3px solid green', textDecoration:'underline over'}}></input> 
<textarea autoFocus={true}/>
{/* first {} is jsx(anything inside {} is an inline JSX expression),  second {} is object,  dont forget object " " on the value for inline style!!!!*/} 

{/* html to jsx
// 1)all props camelCase 2)number/true/false with {} 4)class is className 5) inline style are objects becuase they are props*/}
{/* <Greeting username="Max" /> wrong!!! */}
{/* component: nesting/reuse/configure */}
{/* props- pass data from parent to child component , goal is to customize child components*/}
{/* when using <x><y/></x>, y becomes x's prop, use {children} to access y's veriable 1)wrap around 2) add{children}to param and return */}

      <button onClick={() => {setBtn(!btn) }}>display</button>
      {btn && <InputM />}
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange}/>
      <p>
        {form.email}
        <br />
        {form.password}
      </p>
      <button onClick={()=>setCount(c=>c+1)}>+</button>
      <button onClick={()=>setCount(c=>c-1)}>-</button>
      <div>{loading ? "loading....." : data}</div>

       <ApprovalCard><Card x='andy'/></ApprovalCard>
    {[1,2,3,4].map((i)=> < Card x={i}/>)}

    </div>
    
  );
};

const Card=({x})=>{
  return(
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={faker.image.avatar()}/>
          {/* avator takes entire comment height */}
        </a>
        <div className="content">
          <a href="/" className="author">
           x
          </a>
          <div className="metadata">
            {/* metadata class pushed to side */}
          Today at 6:00PM
          </div>
          <div className="text">Nice blog post!</div>
        </div>
      </div>
    </div>
  )
}

const ApprovalCard = ({children})=> {

  return (
    <div className="ui card">
      <div className="content">{children}</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Reject</div>
        </div>
      </div>
    </div>
  );
};

// const useToggle=(curr)=>{
//   const [x, SetX]=useState(curr);
// return[x, e=> SetX(typeof x==='boolean'? x : !x)];
// }
const useToggle=(def)=>{
  const [x, SetX]=useState(def);
  const setting=(x)=>{
    SetX(curr=> typeof x==='boolean'? x : !curr);
  }
return [x, setting]
}


const Hook5=()=>{
const [value,setValue]= useToggle(false);
const {loggedIn, setLoggedIn}= useContext(LoginContext);

  return(
  <div className="app"> {value.toString()}
  <button onClick={setValue}>Toggle</button>
  <button onClick={()=>setValue(true)}>to true</button>
  <button onClick={()=>setValue(false)}>to false</button>

  {loggedIn? <h1> you are logged in</h1>: <h1> not logged in</h1>}
  </div>
  )
  }
  // const myAction = () => { type: 'DO_THIS' }wrong,  You need:const myAction = () => ({ type: 'DO_THIS'}); this is using arrow function to return ojbect
  //this is updater function(short arrow function syntax)


class WeatM extends React.Component{ 
  // state is js object with data relevant to a component, update state causes rerender,must be initiazed when copoemnt creation, only updated with setState
  //class based component 1)contrutor 2)super 3) this.state 4) call setState 5) render and return togother
// constructor(props){
//   super(props);
// this.state={lat:null, errorMessage:''}}// constructor,super, this, are written by babel
//use null for unknown number

//compoenet lyifecycle ---- constructor/render/compoentdidMount/compoentDidUpdaete/componentWillunmont
state={lat:null, errorMessage:''};

componentDidMount(){
  window.navigator.geolocation.getCurrentPosition(position=>this.setState({lat: position.coords.latitude}),err=>this.setState({errorMessage:err.message}));
}
componentDidUpdate(){console.log('updated!');}
// componentWillUnmount()

conditionalRender(){
  if(this.state.errorMessage && !this.state.lat){ return<>Error:{this.state.errorMessage}</>}
  if(!this.state.errorMessage && this.state.lat){ return<SeasonDisplay lat={this.state.lat}/>}
   return<><Spinner message='please approve location'/></>
//(helper function)
}

  render(){
  return(
  <>{this.conditionalRender()}</>

// avoid conditional rendering in render, use function to wrap around all
)}}

// x || y return first true value, || also assign default value {message || 'loading...'}
// x && y return last true value

const SeasonDisplay = ({lat}) => {
  const getSeason = (lat, month) => { if (month > 2 && month < 9) {return lat > 0 ? 'summer' : 'winter';
} else {return lat > 0 ? 'winter' : 'summer'; }};
  const season = getSeason(lat, new Date().getMonth());
  const text =()=> season === 'winter' ? 'Burr, it is chilly' : 'Lets hit the beach';
  const icon = season === 'winter' ? 'snowflake' : 'sun';

  return (
    <div>
      <i className={"massive "+icon+" icon"} />
  {/* dont forget space in " " for string concatenation (template literal to string literal) */}
      <h1>{text()}</h1>
      <i className={`massive ${icon} icon`} />
    </div>
  );
};
const Spinner = ({message}) => {
  return (  <div className="ui active dimmer">  <div className="ui big text loader">{message || 'loading...'}</div> </div>
  );
  // Spinner.defaultProps={message:'loading...'} same as above for default props
};

class CarM extends React.Component{
  state={images:[]}
//not const in class function, and no this in initialation
url='https://api.unsplash.com/search/photos'
SubmitDone=(term)=>{
  axios.get(this.url, {
    params: {query:term},
    headers:{Authorization:'Client-ID xoFnHqBfnBoTlWEyKP-fN2auspTEFMbkgsTMPSH_fAo'}}).then((res)=>this.setState({images:res.data.results}))  
//paramS!!!!headerS!!!!

}

  //this function is used as a prop for searchbar 'oonsubmt', then add this props.oonsubmit to submitting to trigger

  render(){
    return(<>
    <SearchBar oonSubmit={this.SubmitDone}/>
    found :{this.state.images.length}
    <ImgList x={this.state.images} className='vv' />
    </>
//pass props. 1) x = known value, x is variable inside function ({x}){x  }
    )
  }
}

const ImgList=({x})=>{
//destructor {x} in parmaster, x in function unless used in return then {x}
return(<div>
  {x.map((i)=>{ return <img src={i.urls.regular} key={i.id} style={{width:'250px'}}/> })}
 {/* how to map 1)get array first 2) x=arry to pass value 3) x.map(i=>{ dont forget return!!!! <card y= i>})  4) y is ({y}) in each card function  5) key= i.id*/}

  </div>)
}

class SearchBar extends React.Component{
state={term:''}
Submitting=(e)=>{e.preventDefault(); this.props.oonSubmit(this.state.term)}
//always use arrow function to define "this"( press enter to see onSumbit console log)
//preventDefault prevent auto submit. a must!!
//use State change, so its "controlled", info is stored in react component/state{term:} instead of stored in dom/html element/input element(uncontrolled)
render(){
return(
  <><form onSubmit={this.Submitting}>
    <label>search img</label>
    <input type='text' value={this.state.term} onChange={e=>this.setState({term:e.target.value})}/>
    {/* if onChange(), onChange/onClick/onSubmit function automatically called each render. we only want it called in the future, so we pass reference to input element to call*/}
  </form>
  </>
)}}

const WidgetMdisplay=({x})=>{
  const [activeIndex,setactiveIndex]=useState(null)
const clicking=(index)=>{setactiveIndex(index)}

const pp= x.map((i,index)=> {
    const active= index=== activeIndex? "active": "";
    return  <div key={i.title} className='ui styled accordion'>
    <div className={`title${active}`} onClick={()=>clicking(index)}>
    {/* onclick={()=>clicking so it doesnt run at the start ,onClick = {onbuttonClick}  if not pass any props*/}
    
      <i className="dropdown icon"></i>
      {i.title}
    </div>
    <div className={`content${active}`}>
     <p>{i.content}</p>
     </div>
     </div>})
//if {} is used must use return!!!
  return(<div >{pp}</div>
  )}

const Search=()=>{
  const url='https://en.wikipedia.org/w/api.php'
  const[term,SetTerm]=useState('car')
  const [data,SetData]=useState([])
  useEffect(() => {
    const searching = async () =>
      await axios
        .get(url, {  params: { action: "query",list: "search", origin: "*", format: "json", srsearch: term, }, })
        .then((res) => SetData(res.data.query.search));

if(term&&!data.length){searching()}else{// cancel settimout and clearn timeout during first render

    const x= setTimeout(()=> { if (term) {searching()}}, 1000) //only search when term exist
    // useffect(()=>{const x=async()=>await axios.Axios..then..; if(){x()} },[])
  // setTimeout(()=>{} 2000) throttle the api request
  return()=>{ clearTimeout(x)}
//clean up function excuted first on the next render

}
  }, [term]);
console.log(data);


return (
  <div>
    <input value={term} onChange={(e) => SetTerm(e.target.value)} />
    <br />

    {data.map((i) => {
      return (
        <div key={i.pageid} className="item">
          <div className="right floated content">
            <a className="ui button" href={`https://en.wikipedia.org?curid=${i.pageid}`} target='_blank'>go</a> 
            {/* target='_blank' open up new page */}
          </div>
          <div className="content">
            <div className="header">{i.title}</div>
            <span dangerouslySetInnerHTML={{ __html: i.snippet }} />
            <div>
             
            </div>
          </div>
        </div>
      );
    })}
    {/* <span dangerouslySetInnerHTML={{__html:x}}/> to translate x string  to html. be aware of Xss attack */}
  </div>
);}

const WidgetM=()=>{

  const items=[{title:'wats',content:'asdlfajsdfkl'},{title:'w2jj',content:'AAAAajsdfkl'}]
  const options=[{label:'the color red',value:'red'},{label:'the color blue',value:'blue'},{label:'the color green',value:'green'}]
  const options2 = [ { label: 'Afrikaans',value: 'af', },{ label: 'Arabic',value: 'ar', }, { label: 'Hindi',  value: 'hi',},];
  const [selected, setSelected]=useState(options[0])
  const [language, setLanguage]=useState(options2[0])
  const [toggle,SetToggle]=useState(true)
  
  return(<>
   <h1>asdf </h1>
    {/* <WidgetMdisplay x={items}/>
    <br/>
    <Search/> */}
    <button onClick={()=>SetToggle(!toggle)}>toggle</button>
    {toggle? <Dropdown options={options} selected={selected} onSelectedChange={setSelected}/> :''}<br/>
    <Dropdown2 options={options2} selected={language} onSelectedChange={setLanguage}/>
    {/* // same as conSelectedChange={(options)=>setLanguage(options)}!! x={(y)=>setSelected(y)} same as x={setSelected}! updater function passed as props*/}

  </>
  )
  }

const Dropdown = ({ options, selected, onSelectedChange }) => {
  // ref is reference to dom element 1)creat const x= useRef() 2) <h1 ref={x}> 3) x.current is the h1 element
  const [open, setOpen]= useState(false)
  const ref1= useRef();
  useEffect(()=>{
    const Onbodyclick=(event)=>{   if(ref1.current.contains(event.target)){return;} setOpen(false);}
    document.addEventListener('click', Onbodyclick)
    return()=>
    { document.removeEventListener('click', Onbodyclick)}// to prevent null for the toggle button

},[])// setOpen (false) not runned when return is added!!! filtered
  //manual eventlsiten always output first, then react child compoent, then parent, use event=>console.log(event.target)to find out whats been clicked
  const renderedOptions = options.map((option) => {
    if (option.value===selected.value){return null}
    //render nothing conditionally, filter out selected during map
    // or use options.filter((option)=>!option===selected).map(.....)
    // filter(option=>option.value!==selected.value).map
    return (
      <div key={option.value} className="item" onClick={()=>onSelectedChange(option)}>
{/*  set (option)as variable so when onselectdchange={setSelected} setSelect = {option} , both selected and onSeleted are updater function passed as props*/}

        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref1} className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div onClick={()=> setOpen(!open)} className= {`ui selection dropdown ${open?'visible active':''}`}>
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open?'visible transition':''}`}>
            {renderedOptions}</div>
        </div>
      </div>
    </div>
  );
};

const Dropdown2 = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen]= useState(false)
  const ref1= useRef();
  const [texx,setTexx]= useState('');
  const apikey='AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
  const [trans,setTrans]= useState('');
  const [debouncedTxt,SetDebouncedtxt]=useState(texx);
  
  useEffect(()=>{
    const Onbodyclick=(event)=>{   if(ref1.current.contains(event.target)){return;} setOpen(false);}
    document.addEventListener('click', Onbodyclick)
},[])
// useEffect(()=>{axios.post( 'https://translation.googleapis.com/language/translate/v2', {},{
//     params: {
//       q: texx,
//       target: options.value,
//       key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
//     },
//   });}, [options, texx]);



useEffect(() => {
  const translate=async()=>
  await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {params: {q: texx,  target: selected.value, key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',  }, } )
      .then(res=>setTrans(res.data.data.translations[0].translatedText))

     translate();
     
     
  }, [debouncedTxt, selected])
  // useEffect(()=>{const xx=async()=>{await axios().then()} if(){xx()} return(){}
  // ,[])
useEffect(()=>{
  const x= setTimeout(()=>{SetDebouncedtxt(texx)},5000)
  return()=>{clearTimeout(x)}
}, [texx])



  
  const renderedOptions = options.map((option) => {
    if (option.value===selected.value){return null}
    return (
      <div key={option.value} className="item" onClick={()=>onSelectedChange(option)}>
        {option.label}
      </div>
    );
  });
  return (
    
    <div ref={ref1} className="ui form">
      <div className="field">
        <input placeholder="type something here" value={texx}onChange={(e)=>setTexx(e.target.value)}></input>translation: {trans}</div>
      <div className="field">
        <label className="label">Select a language</label>
        <div onClick={()=> setOpen(!open)} className= {`ui selection dropdown ${open?'visible active':''}`}>
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open?'visible transition':''}`}>
            {renderedOptions}</div>
        </div>
      </div>
    </div>
  );
};



//window.location to set pathname lower case!!! pathname /reactor router(route mapping)
// const showComponent= ()=>{if (window.location.pathname==='/Search'){return<Search/>} return<div>{showComponent}</div>


// ========================================
ReactDOM.createRoot(document.querySelector('#rootiii')).render(<App/>)  


//this.props in Class, props in object
// class or object name must be Capitallize
//component/state/ props
//useEffect(()=>{setCounter(100);},[])independcy rate/only set at the 1st load, [x,y ] for two times changes
// currently run fucntion when count change

//api key:  1f2d39e0
//omdb api : http://www.omdbapi.com/?i=tt3896198&apikey=1f2d39e0

//import { useState} from 'react'; const[a,setB]=useState('c')
//function setB output into variable a, c is original

//ReactDOM.createRoot(document.getElementById("a")).render(<b />);

// import * as xx from 'x1';// console.log(xx.cube(3));
// import all as object * as their parent

//import { useEffect} from 'react'; useEffect(()=>{});run every render
// useEffect(()=>{},[])run once only useEffect(()=>{},[x])runs every x changes
// useEffect(()=>{ return()={x}},[]) run x when component unmounted

// let myPromise= new Promise((a,b)=>{a(x);b(y)})if true,function a pass x,
//if false, function B ass y
// myPromise.then(c(x)).catch(d(y)) function c pass x, function d pass y
// Promise.all([myProm1,myProm2..]). then((x)=>console.log(x);)//console.log([x1,x2,x3]);
//promise.race(myprom1,myprom2..).then(x)=>console.log(x);return first done

// const search= async(x)=>{const response=await fetch();
//   const data=await response.json();console.log(data.search)}; //awai only used inside async

// There are three options to make request:
// Search(s=): Retrieves you all possible options.
// Title(t=): A movie title.
// ID(i=): a valid IMDB ID (e.g. tt1234567).

// const delete=(taskName)=>{ cons newList= todoList.filter((x)=>{ return x!==taskName})}
// delete item in an array

//const add=()=>{setTodoList([...todoList.new Task])} //add to array

//destructing
// const vehicles = ['mustang', 'f-150', 'expedition'];
// const [car, truck, suv] = vehicles;

// const colors=['red','blue']
// const [firstElement, secondElement]=colors; ojbect destructing. no element is created, this's a quick way to assign variable names(frstE, second) to two element
// const [x setX]=useState(y);x is piece of state, setX is fucntion to change this peice of state, y is initial value for this piece of state
// SetX function always use => !!! not = or ++ or just (x+1), you can change value but you dnt reassign it!!

// custom Hook 1)extracing hook related code, no jsx 2 has one purpose 3)know clearly input(default input) and output (default result and function for the new input)

//vercel to deploy,  link; https://vercel.com/lajan2012/app2/EyqzSRuRASzXMWwYrHLBuedbHPCx  Run `vercel --prod` to overwrite later 
//git add . then git commit -m "ready for deploy"