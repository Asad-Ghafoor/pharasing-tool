import{u as v,r as p,x as y,a as N,c as C,b as l,d as S,j as e,C as P,B as j,G as a,I as n,e as I,V as O,f as q,g as E,h as V,A,i as k}from"./index-BNpRjPpr.js";const R=()=>{var m,h;v();const[d,u]=p.useState(!1),[c,t]=p.useState(!1),{user:r}=y(({auth:o})=>o),b=N(),f={email:((m=r==null?void 0:r.userObject)==null?void 0:m.email)||"",password:"",userName:((h=r==null?void 0:r.userObject)==null?void 0:h.userName)||""},g=C().shape({email:l().email("Invalid email address").required("Email is required"),password:l().required("Password is required"),userName:l().required("User Name is required")}),s=S({initialValues:f,validationSchema:g,onSubmit:o=>{var x;t(!0);const w=(x=r==null?void 0:r.userObject)==null?void 0:x.id;A.updateUser(JSON.stringify({...o,_id:w})).then(i=>{t(!1),i.code===200&&b(k(i.data))}).catch(i=>{console.log(i),t(!1)})}});return e.jsx(P,{children:e.jsx(j,{sx:{boxShadow:2,padding:"2rem",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:"10px",mt:"20vh",mx:"auto",width:"80%"},children:e.jsx("form",{style:{width:"100%"},onSubmit:s.handleSubmit,children:e.jsxs(a,{container:!0,spacing:2,children:[e.jsx(a,{item:!0,xs:12,md:6,children:e.jsx(n,{label:"User Name",placeholder:"Your user Name",name:"userName",value:s.values.userName,onChange:s.handleChange,error:s.touched.userName&&s.errors.userName&&s.errors.userName})}),e.jsx(a,{item:!0,xs:12,md:6,children:e.jsx(n,{label:"Email",placeholder:"Your email address",type:"email",name:"email",value:s.values.email,onChange:s.handleChange,error:s.touched.email&&s.errors.email&&s.errors.email})}),e.jsx(a,{item:!0,xs:12,children:e.jsx(j,{sx:{position:"relative"},children:e.jsx(n,{label:"Password",name:"password",placeholder:"Your password",type:d?"text":"password",value:s.values.password,onChange:s.handleChange,error:s.touched.password&&s.errors.password&&s.errors.password,endAdornment:e.jsx(I,{position:"end",sx:{paddingRight:"0.5rem"},children:d?e.jsx(O,{onClick:()=>u(!1),sx:{color:"primary.grey",cursor:"pointer"}}):e.jsx(q,{onClick:()=>u(!0),sx:{color:"primary.grey",cursor:"pointer"}})})})})}),e.jsx(a,{item:!0,xs:12,children:e.jsx(E,{variant:"contained",disableElevation:!0,fullWidth:!0,disabled:c,type:"submit",children:c?e.jsx(V,{size:30,sx:{color:"white"}}):"Edit Profile"})})]})})})})};export{R as default};
