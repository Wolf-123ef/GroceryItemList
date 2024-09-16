let editIndex = -1;
    document.getElementById('btn').addEventListener("click",()=>{
          var input_value=document.getElementById("Input").value;
          if(input_value){
            const received_data=JSON.parse(localStorage.getItem('InputValues'))||[];
            if(editIndex === -1){
            received_data.push(input_value);
            }else{
                received_data[editIndex]=input_value;
                editIndex = -1;
            }
            localStorage.setItem('InputValues',JSON.stringify(received_data));
            document.getElementById("Input").value="";
            show();
        }
    });
          function show(){
            let Data=JSON.parse(localStorage.getItem('InputValues'))||[];
            let result_container=document.getElementById("div");
            result_container.innerHTML="";
            var result=``;
            Data.forEach((value,index) => {
                result +=`
                <div>
                 <li>${value}
                 <i class="fas fa-edit" id="edit" data-index="${index}"></i><i class="fas fa-trash" id="delete" data-index="${index}"></i></li>
                `; 
            });
            result_container.innerHTML=result;
            icons();
          }
          document.getElementById("Clear").addEventListener("click",()=>{
            localStorage.removeItem("InputValues");
            show();
          })
          function icons(){
               const edit=document.querySelectorAll(".fa-edit");
               const trash=document.querySelectorAll(".fa-trash");

              edit.forEach(icon=>{
                icon.addEventListener("click",function(){
                    const index = this.getAttribute("data-index");
                    editData(index);
                });
               });

              trash.forEach(icon=>{
                icon.addEventListener("click",function(){
                    const index = this.getAttribute("data-index");
                    deleteData(index);
                });
               });
          }
          function editData(index){
            var Value=JSON.parse(localStorage.getItem("InputValues"))||[];
            document.getElementById("Input").value=Value[index];
            editIndex=index;
          }
          function deleteData(index){
            var DataValue=JSON.parse(localStorage.getItem("InputValues"))||[];
            DataValue.splice(index,1);
            localStorage.setItem("InputValues",JSON.stringify(DataValue));
            show();
          }
    window.onload=show;