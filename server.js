import express from "express";
import cors from "cors";

const taskList = [
  {
    id: 1,
    title: "Weekly grocery run & meal prep supplies",
    description:
      "Full shop for the week: potatoes, eggs, milk, sugar, dogfood, olive oil, pasta, chicken breast, greek yogurt. Check the fridge before leaving — last time we doubled up on milk.",
    completed: false,
    priority: "high",
    dueDate: "2026-04-20",
  },
  {
    id: 2,
    title: "Collect  dry cleaner",
    description:
      "Ticket number 988800. They close at 7pm on weekdays and 4pm on Saturdays. The grey blazer and two dress shirts are in there — needed for the Amsterdam trip.",
    completed: false,
    priority: "medium",
    dueDate: "2026-04-18",
  },
  {
    id: 3,
    title: "Submit class project — Venezuelan fauna",
    description:
      "Final presentation on endemic animal species of Venezuela. Slides need to cover at least 5 species with habitat maps. Submit via the faculty portal before midnight. Peer review component also due same day.",
    completed: true,
    priority: "medium",
    dueDate: "2026-04-24",
  },
  {
    id: 4,
    title: "Plan Amsterdam trip — itinerary & budget",
    description:
      "Build a day-by-day itinerary covering 5 nights. Research transport options from Schiphol, shortlist 3 hotels in the Jordaan district, estimate daily spend including museums and food. Book the Anne Frank House in advance — it sells out weeks ahead.",
    completed: false,
    priority: "medium",
    dueDate: "2026-05-18",
  },
  {
    id: 5,
    title: "Research freelance opportunities & outreach strategy",
    description:
      "Identify 10 potential clients on LinkedIn and Upwork. Draft a cold outreach message template for frontend dev services. Look into Portuguese freelance platforms as well. Set a goal of 3 proposals sent per week starting next month.",
    completed: true,
    priority: "high",
    dueDate: "2026-10-27",
  },
  {
    id: 6,
    title: "Build Umbrella — React SPA task manager",
    description:
      "Full React SPA built from scratch as a portfolio project. Covers components, state lifting, CRUD, routing, useEffect, Context API and a custom Node/Express backend. The irony of using a task manager to track building a task manager is not lost.",
    completed: false,
    priority: "high",
    dueDate: "2026-04-20",
  },
  {
    id: 7,
    title: "Overhaul portfolio site — projects & layout",
    description:
      "Update the projects section with Umbrella and any other recent work. Rewrite the about section — it's outdated. Make sure the site is mobile responsive and loads fast. Add a contact form that actually works. Consider switching to a dark theme to match the new project aesthetic.",
    completed: false,
    priority: "high",
    dueDate: "2026-05-01",
  },
  {
    id: 8,
    title: "Deep dive into React docs — hooks & advanced patterns",
    description:
      "Work through the official React docs on useEffect, useContext, useReducer and custom hooks. Take notes on the why behind each hook, not just the API. Focus especially on the rules of hooks and common pitfalls with stale closures in useEffect.",
    completed: false,
    priority: "low",
    dueDate: "2026-05-10",
  },
  {
    id: 9,
    title: "Rebuild CV with updated tech stack",
    description:
      "Add React, Node.js, Express, REST APIs and Git to the skills section. Replace old project descriptions with quantifiable outcomes where possible. Export as both PDF and a hosted link. Get it reviewed by at least one senior dev before sending to companies.",
    completed: true,
    priority: "high",
    dueDate: "2026-04-15",
  },
  {
    id: 10,
    title: "Set up GitHub profile for job applications",
    description:
      "Write a proper profile README with a short bio, tech stack badges and links to live projects. Pin the top 4 repos — Umbrella should be one of them. Make sure all pinned repos have a proper README, live demo link and clean commit history.",
    completed: true,
    priority: "medium",
    dueDate: "2026-04-10",
  },
  {
    id: 11,
    title: "Buy a proper desk lamp for the home office",
    description:
      "Current lamp is too cold and causes eye strain after an hour. Looking for something warm toned around 2700K-3000K, dimmable, ideally with a USB charging port on the base. Budget around €60. Check IKEA Ranarp and BenQ ScreenBar alternatives.",
    completed: false,
    priority: "low",
    dueDate: "2026-05-20",
  },
  {
    id: 12,
    title: "Call bank — resolve direct debit failure",
    description:
      "The gym membership direct debit has failed twice. The bank flagged it as suspicious and froze the mandate. Need to call and verify the transaction manually. Also ask about upgrading to a multicurrency account for freelance payments from abroad.",
    completed: false,
    priority: "high",
    dueDate: "2026-04-22",
  },
  {
    id: 13,
    title: "Study Node.js & Express before backend phase",
    description:
      "Go through the Express getting started guide and build a small practice API with 3-4 endpoints before starting the Umbrella backend. Understand middleware, routing, req/res objects and how CORS works. Watch at least one full tutorial on REST API design principles.",
    completed: false,
    priority: "medium",
    dueDate: "2026-05-05",
  },
  {
    id: 14,
    title: "Book overdue dentist appointment",
    description:
      "Last checkup was over 3 months ago. There's a slight sensitivity on the lower left molar that should get looked at. Call the clinic on Rua Augusta — they usually have slots on Thursday mornings. Bring the insurance card this time.",
    completed: true,
    priority: "low",
    dueDate: "2026-04-28",
  },
];

const app = express();

//all cors routes
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json());
//res cors
app.get("/", (req, res) => {
  res.send("CORS enabled for all origins");
});

//get tasklist
app.get("/tasks", (req, res) => {
  res.json(taskList);
});

//post new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;

  //get maxID
  const maxId = taskList.reduce(
    (max, task) => (task.id > max ? task.id : max),
    0,
  );

  newTask.id = maxId + 1;

  taskList.push(newTask);

  //status 201 for creating
  res.status(201).json(newTask);
});

//edit tasks

app.patch("/tasks/:id", (req, res) => {
  //get the id of the task
  const editedTaskId = Number(req.params.id);

  const updatedFields = req.body;

  const editedTask = taskList.find((task) => task.id === editedTaskId);

  //if not found an id for the task, return error
  if (!editedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  //modified directly in the array -- tasklist is a const cant be reassigned
  Object.assign(editedTask, updatedFields);

  //status 200 for updating
  res.status(200).json(editedTask);
});

//delete tasks

app.delete("/tasks/:id", (req, res) => {
  //get the id of the task
  const selectedTaskId = Number(req.params.id);

  if (!selectedTaskId) {
    return res.status(404).json({ error: "No task found" });
  }

  //filter out the task
  const updatedTaskList = taskList.filter((task) => task.id !== selectedTaskId);

  taskList.splice(0, taskList.length, ...updatedTaskList)
  
  res.status(204).send();
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
