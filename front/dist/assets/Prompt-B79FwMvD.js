import{r as o,j as e,B as d,W as f,T as v,g as m,U as h}from"./index-BNpRjPpr.js";const j=()=>{const[x,s]=o.useState(""),[r,n]=o.useState(""),[i,c]=o.useState(!1),p=new FormData,u=async()=>{var t;try{const a=await h.get("https://findoc.abark.tech/view_prompt"),l=(t=a==null?void 0:a.data)==null?void 0:t.current_compliance_prompt;s(l),n(l)}catch(a){console.log(a)}},g=async()=>{try{p.append("prompt_value",r),(await h.post("https://findoc.abark.tech/edit_prompt",p)).data&&(s(r),c(!1))}catch(t){console.log(t)}};return o.useEffect(()=>{u()},[]),e.jsxs(d,{sx:{p:3},children:[i?e.jsx(d,{sx:{display:"flex",alignItems:"center"},children:e.jsx(f,{variant:"outlined",value:r,onChange:t=>n(t.target.value),style:{width:"100vw",height:"50vh",border:"2px solid gray"}})}):e.jsx(v,{variant:"h6",children:x}),i?e.jsx(m,{variant:"outlined",color:"secondary",onClick:g,sx:{mt:2},children:"Save"}):e.jsx(m,{variant:"outlined",color:"secondary",onClick:()=>c(!0),sx:{mt:2},children:"Edit"})]})};export{j as default};
