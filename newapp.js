//fetch("tasks.json")
//.then(response => response.json())
//.then(json => 
//json.forEach(task => {
//    console.log(task.name);
//}));
        tasksUL = document.querySelector(".task-list ul");
        categories = document.querySelector(".category ul")
        document.addEventListener("DOMContentLoaded", () => {
            fetch("tasks.json")
            .then(response => response.json())
            .then(json => 
            json.forEach(task => {
                let LI = document.createElement('LI');
                LI.innerHTML=GenerateTaskLi(task); 
                tasksUL.appendChild(LI);
            }));
        // ----- Search ----- //
            let searchDOM = document.querySelector(".nav-left .search input[type='text']");
            searchDOM.addEventListener("keyup", function (e) {
                searchText = e.target.value;
                tasksUL.innerHTML = "";
                fetch("tasks.json")
                .then((respone) => {
                    return respone.json();
                })
                .then((data) => {
                    data.forEach((task) => {
                        LI = document.createElement("LI");
                        if(task["name"].includes(searchText)){
                            LI.innerHTML = GenerateTaskLi(task);
                            tasksUL.appendChild(LI);
                        }
                    })
                })
            }
        )});
        // ----- Add Task ----- //
        let btnAddNewTask = document.querySelector("#add-new");
        btnAddNewTask.addEventListener("click", function (e){
            btnAddNewTask.innerHTML = "";
            let inptTaskName = document.createElement("input");
            let inptTaskChecked = document.createElement("input");
            let inptTaskCat = document.createElement("form");

            inptTaskCat.setAttribute("action","");
        //---
            fetch("category.json")
            .then(response => response.json())
            .then(json => 
            json.forEach(cat => {
                let OPTION = document.createElement('OPTION');
                OPTION.innerHTML= GenerateTaskCat(cat);
                inptTaskCat.appendChild(OPTION);
        }));
        //---            
            inptTaskChecked.setAttribute("type", "checkbox");
            inptTaskName.setAttribute("type", "text");
            inptTaskName.setAttribute("placeholder", "enter new task name ...");
            btnAddNewTask.appendChild(inptTaskChecked);
            btnAddNewTask.appendChild(inptTaskName);

            inptTaskName.focus();
            inptTaskName.addEventListener("keyup", function (e) {
                if (e.key == "Enter"){
                    const currentDate = "07-Dec-2022";
                    let new_task_name = e.target.value;
                    let task = {
                        name: new_task_name,
                        category: "N/A",
                        create_at: currentDate
                    };

                    let LI = document.createElement("LI");
                    LI.innerHTML = GenerateTaskLi(task);
                    tasksUL.appendChild(LI);

                    inptTaskName.value = "";
                }
            });
            

        });
        // --- Filter Task --- //
        function filter_task(name){
            tasksUL.innerHTML = "";
            fetch("tasks.json")
                .then ((respone) => {
                    return respone.json();
                })
                .then((data) => {
                    data.forEach((task) => {
                        if (task.category == name){
                            //console.log(`name = ` + name)
                            //console.log(`task = `+task.category)
                            LI = document.createElement("LI");
                            LI.innerHTML = GenerateTaskLi(task);
                            tasksUL.appendChild(LI);
                        }
                        if (name == "All Task"){
                            //console.log(`name = ` + name)
                            //console.log(`task = `+task.category)
                            LI = document.createElement("LI");
                            LI.innerHTML = GenerateTaskLi(task);
                            tasksUL.appendChild(LI);
                        }

                    })
                })
        };

        function GenerateTaskLi (task){
            let li = `
            <div class="subtask-list"><form action="">
            <label class="form-control">
              <input type="checkbox" name="checkbox" />
              ${task.name}
            </label>
            <div class="desc">
                <span>${task.category}</span>
                <span>${task.create_at}</span>
            </div>
            </div>`;
            return li;
        };
        function GenerateTaskCat (cat){
            let option = `<option>${cat.title}</option>`
        }