const users = [
    {
        "email": "emils.lecinskis@gmail.com",
        "username": "EmilsLielaisAdmins",
        "tasks_added": 4,
        "tasks_completed": 7
    },
    {
        "email": "bom@g",
        "username": "tomasins",
        "tasks_added": 4,
        "tasks_completed": 7
    }
]

const db = [
    {
        "task_id": 1,
        "task_name": "Saskaiti",
        "task_text": "5 + 3 = ?",
        "task_answer": "8",
        "task_level": 1,
        "theme_id": 1,
        "user_email": "emils.lecinskis@gmail.com"
    },
    {
        "task_id": 16,
        "task_name": "Atments divus naturalsus skaitsl",
        "task_text": "5 - 3 = ?",
        "task_answer": "2",
        "task_level": 1,
        "theme_id": 1,
        "user_email": "bom@g"
    },
    {
        "task_id": 17,
        "task_name": "Atments divus naturalsus skaitsl",
        "task_text": "5 - 3 = ?",
        "task_answer": "2",
        "task_level": 1,
        "theme_id": 1,
        "user_email": "bom@g"
    },
    {
        "task_id": 69,
        "task_name": "Saskatiti divus skaitlus (தமிழ்)",
        "task_text": "5 + 2 = ?",
        "task_answer": "7",
        "task_level": 1,
        "theme_id": 1,
        "user_email": "bom@g"
    },
    {
        "task_id": 70,
        "task_name": "Saskatiti divus skaitlus (தமிழ்)",
        "task_text": "5 + 2 = ?",
        "task_answer": "7",
        "task_level": 1,
        "theme_id": 1,
        "user_email": "bom@g"
    }
]


const handleTasks = () => {
    const userss = users;
    let goodtask = []
   db.forEach((task, i)=> {
    let name = userss.filter(user=>{
         return "a"
        })
        goodtask.push({...task,user_email:name})
   })
   return(goodtask)
};
console.log(handleTasks())