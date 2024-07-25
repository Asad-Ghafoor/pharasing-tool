import{u as y,a as b,r as p,c as w,b as x,d as v,j as e,G as u,C as S,B as a,T as t,I as h,e as C,V as k,f as I,g as B,h as P,s as n,A as z,i as E,k as V}from"./index-BNpRjPpr.js";const N=()=>{const l=y(),r=b(),[d,c]=p.useState(!1),[m,i]=p.useState(!1),f={email:"",password:""},g=w().shape({email:x().email("Invalid email address").required("Email is required"),password:x().required("Password is required")}),s=v({initialValues:f,validationSchema:g,onSubmit:j=>{i(!0),r(n(!0)),z.login(JSON.stringify(j)).then(o=>{i(!1),r(n(!1)),o.code==200?(localStorage.setItem("accessToken",o.data.token),r(E(o.data)),r(V(!0)),r(n(!1)),i(!1)):(i(!1),r(n(!1)))}).catch(o=>{console.log(o),i(!1),r(n(!1))})}});return e.jsx(u,{container:!0,sx:{height:"100%"},children:e.jsx(u,{item:!0,md:12,sm:12,xs:12,sx:{height:"100vh"},children:e.jsx(S,{maxWidth:"sm",sx:{minHeight:"100%",display:"flex",flexDirection:"column",justifyContent:"center"},children:e.jsxs(a,{sx:{display:"flex",flexFlow:"column",width:{md:"60%",xs:"100%"},marginX:"auto",justifyContent:"center"},children:[e.jsx(a,{sx:{display:"flex",alignItems:"center",justifyContent:"start",gap:"0.8rem",paddingBottom:"1rem"},children:e.jsx(t,{component:"h3",variant:"h3",sx:{color:"#3b90b2",fontSize:"32px",fontWeight:600},children:"Welcome Back"})}),e.jsx(a,{sx:{display:"flex",alignItems:"center",justifyContent:"start",gap:"0.8rem",paddingBottom:"3rem"},children:e.jsx(t,{sx:{color:"primary.black",fontSize:"14px"},children:"Enter your email and password to sign in"})}),e.jsxs("form",{style:{width:"100% !important"},onSubmit:s.handleSubmit,children:[e.jsx(a,{sx:{paddingBottom:"1rem"},children:e.jsx(h,{label:"Email",placeholder:"Your email address",type:"email",name:"email",value:s.values.email,onChange:s.handleChange,error:s.touched.email&&s.errors.email&&s.errors.email})}),e.jsx(a,{sx:{paddingBottom:"1rem"},children:e.jsx(h,{label:"Password",name:"password",placeholder:"Your password",type:d?"text":"password",value:s.values.password,onChange:s.handleChange,error:s.touched.password&&s.errors.password&&s.errors.password,endAdornment:e.jsx(C,{position:"end",sx:{paddingRight:"0.5rem"},children:d?e.jsx(k,{onClick:()=>c(!1),sx:{color:"primary.grey",cursor:"pointer"}}):e.jsx(I,{onClick:()=>c(!0),sx:{color:"primary.grey",cursor:"pointer"}})})})}),e.jsxs(a,{sx:{display:"flex",alignItems:"center",mb:2},children:[e.jsx(t,{component:"p",sx:{color:"black",fontSize:"12px",":hover":{cursor:"pointer",color:"black"}},children:"don't have an account?"}),e.jsx(t,{onClick:()=>l("/auth/sign-up"),sx:{color:"primary.main",fontSize:"12px",ml:1,":hover":{cursor:"pointer",color:"primary.main"}},children:"SignUp"}),e.jsx(t,{onClick:()=>l("/auth/forget-password"),sx:{color:"primary.main",fontSize:"12px",ml:3,":hover":{cursor:"pointer",color:"primary.main"}},children:"forgot Password?"})]}),e.jsx(B,{variant:"contained",disableElevation:!0,fullWidth:!0,disabled:m,type:"submit",children:m?e.jsx(P,{size:30,sx:{color:"white"}}):"SIGN IN"})]})]})})})})};export{N as default};