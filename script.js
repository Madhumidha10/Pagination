//create container
var div1=CreateTag('div',['class'],['container border rounded table-responsive']);
document.body.append(div1);
//create heading tag
var h1=CreateTag('h1',['id','class'],['title','text-center text-dark'],'Pagination Task');
div1.append(h1);
//create description
var p=CreateTag('p',['id','class'],['description','text-center'],'Ten data per page');
div1.append(p);
 //**************************************************create table 
 var tb=CreateTag('table',['class','id'],['table table-bordered table-striped','table']);
 var thd=CreateTag('thead',['class'],['thead-dark']);
 var tr=CreateTag('tr');
 var th1=CreateTag('th',['scope'],['col'],'Id');
 var th2=CreateTag('th',['scope'],['col'],'Name');
 var th3=CreateTag('th',['scope'],['col'],'Email');
 tr.append(th1,th2,th3);
 thd.append(tr);
 tb.append(thd);
 var tbd=CreateTag('tbody');
 
//***************************************************create 10 rows
 for(let i=0;i<10;i++)
 
   {
   
     var tr=CreateTag('tr',['id'],[`tr${i}`]);
     var th=CreateTag('th',['scope','id'],['row',`data${i}_id`]);
     var td1=CreateTag('td',['id'],[`data${i}_name`]);
     var td2=CreateTag('td',['id'],[`data${i}_email`]);
     tr.append(th,td1,td2);
     tbd.append(tr);
 
   }
   tb.append(tbd);
   div1.append(tb);

   
   //*****************************************************create Pagination Button
var pg_div=CreateTag('div',['class','id'],['pagination  d-flex justify-content-center','buttons']);
var b_first=CreateTag('button',['type','class','id'],['button','btn-secondary mr-1','btn_first'],'First');
b_first.addEventListener('click',First);

var b_prev=CreateTag('button',['type','class','id'],['button','btn-secondary mr-1','btn_prev'],'Previous');
b_prev.addEventListener('click',Prev);   
var btn_div=CreateTag('div',['class','role'],['btn-group mr-2','group']);
for(let j=0;j<10;j++)
{
  var btn=CreateTag('button',['type','class','id'],['button','btn-dark',`btn_${j+1}`],j+1);
  btn.addEventListener('click',display);
  btn_div.append(btn);
}

var b_next=CreateTag('button',['type','class','id'],['button','btn-secondary mr-1','btn_next'],'Next');
b_next.addEventListener('click',Next);
var b_last=CreateTag('button',['type','class','id'],['button','btn-secondary mr-1','btn_last'],'Last');
b_last.addEventListener('click',Last);   
pg_div.append(b_first,b_prev,btn_div,b_next,b_last)
div1.append(pg_div);

var current_id=0;
display();
// 


///****************************************************create element Function
function CreateTag(tagname,att_name=[],att_value=[],value='')
{
 var el=document.createElement(tagname);
 if(att_name.length>0)
 {
    for(let i=0;i<att_name.length;i++)
   {
     el.setAttribute(att_name[i],att_value[i]);
   }
 }

 if(value!=='')
  el.innerHTML=value;
return el;
}
//****************************************************Get data from API and display to the table */
//create data display function
async function display(event)
{
  try { 
    var res=await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
    var data=await res.json(); 
      var id=current_id;
      //check page number button event is clicked
      if(event !== undefined)
      {
       //then change id based on page number
        id=(parseInt(event.target.innerHTML)*10)-10; 
        
      }
      
      var btn=document.querySelectorAll('.btn-dark');
  
      if((id>=0)&&(id<data.length))
      {
        for(let i=0;i<10;i++)
        {
           
           document.getElementById(`data${i}_id`).innerHTML=data[i+id].id;
           document.getElementById(`data${i}_name`).innerHTML=data[i+id].name;
           document.getElementById(`data${i}_email`).innerHTML=data[i+id].email; 
           current_id =parseInt(data[i+id].id); 
           btn[i].classList.remove('active');  
        }
       
        document.getElementById(`btn_${(id/10)+1}`).classList.add('active');
        
      }

      if(current_id===10)
      {
        document.getElementById('btn_first').classList.add('disabled');
        document.getElementById('btn_prev').classList.add('disabled');
        document.getElementById('btn_next').classList.remove('disabled');
        document.getElementById('btn_last').classList.remove('disabled');
      }
      else if(current_id===100)
      {
        document.getElementById('btn_first').classList.remove('disabled');
        document.getElementById('btn_prev').classList.remove('disabled');
        document.getElementById('btn_next').classList.add('disabled');
        document.getElementById('btn_last').classList.add('disabled');
      }
      else{
        document.getElementById('btn_first').classList.remove('disabled');
        document.getElementById('btn_prev').classList.remove('disabled');
        document.getElementById('btn_next').classList.remove('disabled');
        document.getElementById('btn_last').classList.remove('disabled');
      } 
  } catch (error) {
    console.log(error);
  }
}

//**************************************** First ,previous, next and last  button click function*/
function First()
{
  current_id=0;
  display();
}
function Prev()
{
  if(current_id>10)   
  {
    current_id=current_id-20;
    display();
  }
}
function Next()
{ 
  if(current_id<=90)  
  {
    display();
  }
}
function Last()
{
  current_id=90;
  display();
}
  


