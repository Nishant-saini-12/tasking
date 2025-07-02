window.onload=()=>{
    fetchTask()
}


const openDialog=()=>{
    new swal({
        html:`
        <div class="flex flex-col">
            <h1 class="text-2xl font-semibold text-black">"new list "</h1>
             <form onsubmit="createtask(event)">
            <input id="task"class="border rounded bold p-2 m-3" placeholder="Enter the list">
            <input id="date" type="date" class="border rounded bold p-2 m-3" >
            <button class="bg-indigo-400 hover:bg-rose-500 border rounded p-3 flex flex-center text-white flex justify-center">add</button>
             </form>
        </div> 
        `,
         showConfirmButton:false
    })
}


const createtask=(e)=>{
    e.preventDefault()
    const taskinput=document.getElementById("task")
    const dateinput=document.getElementById("date")
    const task=taskinput.value.trim()
    const status = "scheduled"
    const payload=JSON.stringify({
        task:task,
        date: dateinput.value,
       status: "scheduled"
    })
    localStorage.setItem(Date.now(),payload)
    new swal({
        icon:"success",
        title:"Task is Created...!"

    }) 
}


const fetchTask=()=>{
    const keys=Object.keys(localStorage)
    // console.log(keys)
    const uicontainer=document.getElementById("ui-container")
    // console.log(uicontainer)
    //  const india=uicontainer.innerHTML 
     let index = 1;
    for(var key of keys){
       const data = JSON.parse(localStorage.getItem(key))  
        const ui=`
         <tr class="border-b border-black gap-3">
            <td class="p-3.5">${index++} </td>
            <td class="text-gray-600 capitalize ">${data.task}</td>   
            <td class="text-gray-600">${data.date}</td>
           <td class="text-gray-600">
           <select class="border border-black bold bg-rose-300 p-1" onchange="updateStatus(event)" >
           <option value="scheduled" selected="${data.status === "scheduled"}">Scheduled</option>
           <option value="inprocess"  selected="${data.status === "inprogress"}" >inprocess</option>
           <option value="cancelled"  selected="${data.status === "canceled"}" >cancelled</option>
           <option value="complete">complete</option>          
           </selected>  
           </td>
            <td>
                <div class="flex item center gap-3">
                    <button onclick="editt('${data.task}','${key}')" class="hover:bg-violet-500 bg-green-400 w-8 h-8 rounded full item-center justify-center text-white">
                        <i class="ri-edit-box-fill"></i>
                    </button>
                       <button onclick="deleteTask('${key}')" class="hover:bg-amber-500 bg-green-400 w-8 h-8 rounded full item-center justify-center text-white">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>
                </div>
            </td>
        </tr>
        `


        uicontainer.innerHTML += ui


    }
} 
  
const deleteTask=(key)=>{
     localStorage.removeItem(key);
    location.reload();
}

const editt=(task,key)=>{
      new swal({
        html:`
        <div class="flex flex-col">
            <h1 class="text-2xl font-semibold text-black">"Edit task"</h1>
             <form  onsubmit="save(event,'${key}')">
            <input id="edited-task"value="${task}" class="border rounded bold p-2 m-3" placeholder="Enter the list">
            <button class="bg-indigo-400 hover:bg-rose-500 border rounded p-3 flex flex-center text-white">save</button>
             </form>
        </div> 
        `,
         showConfirmButton:false
    })
}


const save=(e,key)=>{
    e.preventDefault()
    const  editedtask=document.getElementById("edited-task")
    const newtaskkkkk=editedtask.value.trim()
    // window.alert(newtaskkkkk)
    const oldData = JSON.parse(localStorage.getItem(key))
    oldData.task = newtaskkkkk
    localStorage.setItem(key, JSON.stringify(oldData))

    new swal({
        icon: 'success',
        title: 'Task Saved !'
    })


}


const updateStatus=(e,key)=>{
   const status = e.target.value
   const payload = JSON.parse(localStorage.getItem(key))
   payload.status= status
   console.log(payload)
}

const filter = () => {
    const input = document.querySelector("input[placeholder='search this list']");
    const keyword = input.value.trim().toLowerCase();
    const keys = Object.keys(localStorage);
    const filteredTasks = [];

    for (let key of keys) {
        const data = JSON.parse(localStorage.getItem(key));
        // agar task exist karta hai
        if (data && data.task && data.task.toLowerCase().includes(keyword)) {
            filteredTasks.push({ ...data, key });  // ✅ store key
            console.log(filteredTasks)
        }
    }

    const uicontainer = document.getElementById("ui-container");
    uicontainer.innerHTML = "";  // ✅ Clear previous list
    let index = 1;

    for (let item of filteredTasks) {
        const ui = `
            <tr class="border-b border-black gap-3">
                <td class="p-3.5">${index++}</td>
                <td class="text-gray-600 capitalize">${item.task}</td>
                <td class="text-gray-600">${item.date}</td>
                <td class="text-gray-600">
                    <select class="border border-black bold bg-rose-300 p-1" onchange="updateStatus(event, '${item.key}')">
                        <option value="scheduled" ${item.status === "scheduled" ? "selected" : ""}>Scheduled</option>
                        <option value="inprocess" ${item.status === "inprocess" ? "selected" : ""}>inprocess</option>
                        <option value="cancelled" ${item.status === "cancelled" ? "selected" : ""}>cancelled</option>
                        <option value="complete" ${item.status === "complete" ? "selected" : ""}>complete</option>
                    </select>
                </td>
                <td>
                    <div class="flex item center gap-3">
                        <button onclick="editt('${item.task}','${item.key}')" class="hover:bg-violet-500 bg-green-400 w-8 h-8 rounded full item-center justify-center text-white">
                            <i class="ri-edit-box-fill"></i>
                        </button>
                        <button onclick="deleteTask('${item.key}')" class="hover:bg-amber-500 bg-green-400 w-8 h-8 rounded full item-center justify-center text-white">
                            <i class="ri-delete-bin-6-line"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        uicontainer.innerHTML += ui;
    }
};
