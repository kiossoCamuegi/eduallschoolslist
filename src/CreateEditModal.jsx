import React, {useState} from 'react' 
import {Modal, Form, Button} from 'react-bootstrap' 
import axios from 'axios'; 
import Hoot from './Hoot';
import { toast } from 'react-toastify';


function CreateEditModal(props){
    const [show, setShow] = useState(false);
    const [RegisterStatus, setRegisterStatus] = useState(null);
    const [Founded, SetFounded] = useState(null);
    const [Name, setName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Location, setLocation] = useState(null);
    const [Type, setType] = useState(null);
    const [Phone, setPhone] = useState(null);

   
    const [showBox, SetshowBox]  = useState(false);
    const handleClose = () => {
      SetshowBox(false);
      setTimeout(() => {
        setShow(false);
      }, 1200);
    } 
  
    const handleShow = () => {
          SetshowBox(true);
          setShow(true);  
          setTimeout(() => {  
            GET_DATA(); 
         }, 1000);   
    };
  
  
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
   
    
    const FORMURL = [
      Hoot()+"postschool",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];
  
  
    let INPUTS = {};  
  
    function RefreshList(e){
      let btn = document.querySelectorAll(".RFS");
      for (let i = 0; i < btn.length; i++) {
          btn[i].click();
      }  
  }
    
    const GET_DATA = async()=>{
       if(props.update){
         try {
          const response = await axios.get(FORMURL[1]); 
          if(response.data !== null){

            console.log(response.data );

            setName(response.data.name); 
            document.querySelector("#name").value =  response.data.name;

            setEmail(response.data.email); 
            document.querySelector("#email").value =  response.data.email;

            setLocation(response.data.location);
            document.querySelector("#location").value =  response.data.location;

            setPhone(response.data.phone);
            document.querySelector("#phone").value =  response.data.phone;

            setType(response.data.type); 
            document.querySelector("#type").value =  response.data.type;
          }
         } catch (error) {
          
         }
       }
  }


    const setField = (field, value)  =>{
      setForm({
          ...form,
          [field]:value
      })
  
      if(!!errors[field]){
           setErrors({
              ...errors,
              [field]:null
           });  
      }
  }
   
  
    const validateForm = ()=>{
      const {name, email, phone, location, type} = form; 
      const NewErrors = {};
      console.log({Name, Email, Location, Type, Phone});

      setRegisterStatus(0); 
      if(INPUTS.name ===  "" || INPUTS.name ===  " "){
      if(!name || name === '') NewErrors.name = 'Nome invalido';}else{if(!name){setField("name", Name);}} 

      if(INPUTS.email ===  "" || INPUTS.email ===  " "){
      if(!email || email === '') NewErrors.email = 'Email invalido';}else{if(!email){setField("email", Email);}} 

      if(INPUTS.location ===  "" || INPUTS.location ===  " "){
      if(!location || location === '') NewErrors.location = 'Localização  invalida';}else{if(!location){setField("location", Location);}} 
  
      if(INPUTS.type ===  "" || INPUTS.type ===  " "){
      if(!type || type === '') NewErrors.type = 'Tipo de instituição invalida';}else{if(!type){setField("type", Type);}} 
      
      if(INPUTS.phne ===  "" || INPUTS.phone ===  " "){
      if(!phone || phone === '') NewErrors.phone = 'Telefone invalido';}else{if(!phone){setField("phone", Phone);}}   
       

      return NewErrors;
  }
  
  
    const FormSubmit = (e)=>{  
      
       e.preventDefault();   
       const formErrors = validateForm();
       alert("lest go baby")
      if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
            setRegisterStatus(1);   
        }else{  
          const SUBMIT_INPUTS = {name:Name, email:Email, phone:Phone, location:Location, type:Type}

  
          if(!props.update){
            alert("Making happen")
           try {
             axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Instituição registrada com sucesso !");
               setForm({}); 
               setRegisterStatus(2);  
               RefreshList();
             }).catch((error)=>{
             toast.error("Lamentamos mas não foi  possivel executar esta ação")
               setRegisterStatus(1);  
             }); 
           } catch (error) {
           toast.error("Lamentamos mas não foi  possivel executar esta ação")
            setRegisterStatus(1);  
           }
          } else {
           try {
            console.log(SUBMIT_INPUTS);
             axios.put(FORMURL[2] , SUBMIT_INPUTS).then(()=>{  
              toast.success("Instituição atualizada com sucesso !");
               setForm({}); 
               setRegisterStatus(2);  
               RefreshList();
               setTimeout(() => { 
                   handleClose();
               }, 1000);
             }).catch((error)=>{
              console.log(error)
               setRegisterStatus(1);  
               toast.error("Lamentamos mas não foi  possivel executar esta ação")
             }); 
           } catch (error) {
            console.log(error)
            toast.error("Lamentamos mas não foi  possivel executar esta ação")
            setRegisterStatus(1);  
           }
          } 
        }  
    };
  
      
    const handleInput = (e)=>{ 
      console.log("Hi black", e.target.value);

       switch (e.target.id) { 
          case "name":
            setField("name", e.target.value);
            INPUTS.name = e.target.value;
            setName(e.target.value); 
           break;
           case "type":
            setField("type", e.target.value);
            INPUTS.type = e.target.value;
            setType(e.target.value); 
           break;
           case "phone":
            setField("phone", e.target.value);
            INPUTS.phone = e.target.value;
            setPhone(e.target.value); 
           break;
           case "email":
            setField("email", e.target.value);
            INPUTS.email = e.target.value;
            setEmail(e.target.value); 
           break;
           case "location":
            setField("location", e.target.value);
            INPUTS.location = e.target.value;
            setLocation(e.target.value); 
           break;  
           default:
       }
    }
  
  
    return (
      <div>
           <div>
           <div onClick={handleShow}>
              {
                props.toggle_btn ? props.toggle_btn :   <button className='btn bg-main'> Registrar instituição</button>  
              }
         </div>
     <Modal size='md'   centered   show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       <Modal.Title>
             <div className="ed-wrap align-center"> 
                <h5>{ props.title ? props.title : 'Registrar ' } instituição</h5>
            </div> 
        </Modal.Title>
       </Modal.Header>
       <Form onSubmit={FormSubmit}>
       <Modal.Body className='scrollLimit'>
           <Form.Group className="mb-3"  >
             <Form.Label>Nome<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text"  onChange={handleInput} className={!!errors.name && 'is-invalid'} value={form.name} 
              isInvalid={!!errors.name} id="name"  />
              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback> 
           </Form.Group>  
           <Form.Group className="mb-3"  >
             <Form.Label>Localização<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text"  onChange={handleInput} className={!!errors.location && 'is-invalid'} value={form.location} 
              isInvalid={!!errors.location} id="location"  />
              <Form.Control.Feedback type='invalid'>{errors.location}</Form.Control.Feedback> 
           </Form.Group>  
           <Form.Group className="mb-3"  >
             <Form.Label>Email<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text"  onChange={handleInput} className={!!errors.email && 'is-invalid'} value={form.email} 
              isInvalid={!!errors.email} id="email"  />
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback> 
           </Form.Group>  
           <Form.Group className="mb-3"  >
             <Form.Label>Telefone<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text"  onChange={handleInput} className={!!errors.phone && 'is-invalid'} value={form.phone} 
              isInvalid={!!errors.phone} id="phone"  />
              <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback> 
           </Form.Group>  
           <Form.Group className="mb-3"  >
             <Form.Label>Tipo de instituição<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Select type="text"  onChange={handleInput} className={!!errors.type && 'is-invalid'} value={form.type} 
              isInvalid={!!errors.type} id="type"  >
                   <option value="0">Escola privada</option> 
                   <option value="1">Escola publica</option>
                   <option value="2">Colégio</option>
                   <option value="3">Universidade Privada</option>
                   <option value="4">Universidade Publica</option>
                   <option value="5">Creche</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.type}</Form.Control.Feedback> 
           </Form.Group>    
       </Modal.Body>
       <Modal.Footer>
         <div className="ed-space">
             <div className="ed-flex"></div>
             <div className="d-flex">
                <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button> 
                 <div className="ml-2"> <Button onClick={FormSubmit} className='bg-main'>Salvar</Button></div>
              </div> 
         </div>
       </Modal.Footer>
       </Form>
     </Modal>
   </div>
      </div>
    )
}

export default CreateEditModal