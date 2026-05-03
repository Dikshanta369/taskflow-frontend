import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// ================= STYLES =================
const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    background: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid #333",
    display: "flex",
    alignItems: "center",
    padding: "0 40px",
    zIndex: 1000,
  },
  logo: {
    fontSize: "28px",
    fontWeight: "900",
    letterSpacing: "-1px",
    color: "#fff",
  },
  userSection: {
    marginLeft: "auto",
    position: "relative",
  },
  userAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff0040, #ff6666)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    border: "2px solid #222",
  },
  dropdown: {
    position: "absolute",
    top: "58px",
    right: "0",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "12px",
    width: "180px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    zIndex: 1100,
  },
  dropdownItem: {
    padding: "14px 20px",
    cursor: "pointer",
    color: "#ddd",
  },

  loginContainer: {
    minHeight: "100vh",
    background: "#050505",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  loginBox: {
    background: "#111",
    padding: "60px 50px",
    borderRadius: "20px",
    width: "400px",
    border: "1px solid #222",
  },

  dashboard: {
    paddingTop: "90px",
    background: "#050505",
    minHeight: "100vh",
    color: "#fff",
  },
  statsRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  statCard: {
    background: "#111",
    padding: "24px 32px",
    borderRadius: "16px",
    minWidth: "170px",
    textAlign: "center",
  },
  board: {
    display: "flex",
    gap: "28px",
    padding: "0 40px",
    overflowX: "auto",
    paddingBottom: "60px",
  },
  column: {
    background: "#111",
    borderRadius: "20px",
    width: "340px",
    minHeight: "600px",
    padding: "24px",
    flexShrink: 0,
  },
  card: {
    background: "#1a1a1a",
    padding: "20px",
    marginBottom: "16px",
    borderRadius: "16px",
    border: "1px solid #222",
  },
  btnPrimary: {
    padding: "12px 28px",
    background: "#ff0040",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    fontWeight: "600",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "14px 18px",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "12px",
    color: "white",
    marginBottom: "16px",
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modalContent: {
    background: "#111",
    padding: "40px",
    borderRadius: "20px",
    width: "440px",
    border: "1px solid #333",
  },
};

// ================= NAVBAR =================
function Navbar({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const initials = user?.name 
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) 
    : "U";

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>TaskFlow</div>

      <div style={styles.userSection}>
        <div style={styles.userAvatar} onClick={() => setShowDropdown(!showDropdown)}>
          {initials}
        </div>

        {showDropdown && (
          <div style={styles.dropdown} onClick={() => setShowDropdown(false)}>
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #222", color: "#aaa" }}>
              {user?.name || "User"}<br />
              <span style={{ fontSize: "13px" }}>{user?.role || ""}</span>
            </div>
            <div 
              style={styles.dropdownItem} 
              onClick={onLogout}
              onMouseOver={(e) => e.target.style.backgroundColor = "#ff0040"}
              onMouseOut={(e) => e.target.style.backgroundColor = ""}
            >
              Log Off
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ================= LOGIN =================
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px" }}>TaskFlow</h1>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Welcome Back</h2>

        <input 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          style={styles.input} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input} 
        />

        <button 
          onClick={handleLogin} 
          style={{ ...styles.btnPrimary, width: "100%", padding: "14px", fontSize: "16px" }}
        >
          Sign In
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
  Don't have an account?{" "}
  <span
    style={{ color: "#ff0040", cursor: "pointer" }}
    onClick={() => navigate("/signup")}
  >
    Signup
  </span>
</p>
      </div>
    </div>
  );
}

// ================= SIGNUP =================
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role: "Member"
      });

      alert("Signup successful! Now login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "30px" }}>
          Create Account
        </h1>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleSignup}
          style={{ ...styles.btnPrimary, width: "100%", padding: "14px" }}
        >
          Signup
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#ff0040", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}


// ================= DASHBOARD =================
function Dashboard() {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": []
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [stats, setStats] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const projectId = "69f5fdd64fe62c6acf275e22";
  const user = token ? JSON.parse(atob(token.split(".")[1])) : {};

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const grouped = { "To Do": [], "In Progress": [], "Done": [] };

    res.data.forEach(task => {
      if (user.role === "Member" && task.assignedTo?._id !== user.id) return;
      grouped[task.status].push(task);
    });

    setTasks(grouped);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  const fetchStats = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/dashboard/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStats(res.data);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
    fetchUsers();
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const addMember = async () => {
    await axios.put(
      `http://localhost:5000/api/projects/${projectId}/add-member`,
      { userId: selectedUser },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Member added");
  };

  const createTask = async () => {
    if (isEditing) {
      await axios.put(
        `http://localhost:5000/api/tasks/${editTaskId}`,
        { title, description, assignedTo, priority, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, project: projectId, assignedTo, priority, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setShowModal(false);
    setIsEditing(false);
    setEditTaskId(null);
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setDueDate("");

    fetchTasks();
    fetchStats();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
    fetchStats();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const source = result.source.droppableId;
    const dest = result.destination.droppableId;
    if (source === dest) return;

    const task = tasks[source][result.source.index];

    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { status: dest },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchTasks();
  };

  const openEdit = (task) => {
    setShowModal(true);
    setIsEditing(true);
    setEditTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    setAssignedTo(task.assignedTo?._id || "");
    setPriority(task.priority || "Medium");
    setDueDate(task.dueDate?.split("T")[0] || "");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <div style={styles.dashboard}>
        <h1 style={{ textAlign: "center", fontSize: "38px", marginBottom: "40px" }}>Task Board</h1>

        {stats && (
          <div style={styles.statsRow}>
            <div style={styles.statCard}>Total: {stats.totalTasks}</div>
            <div style={styles.statCard}>To Do: {stats.status.todo}</div>
            <div style={styles.statCard}>In Progress: {stats.status.inProgress}</div>
            <div style={styles.statCard}>Done: {stats.status.done}</div>
            <div style={{ ...styles.statCard, color: "#ff4d4d" }}>Overdue: {stats.overdueTasks}</div>
          </div>
        )}

        {stats && (
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h3>Tasks Per User</h3>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "12px" }}>
              {Object.entries(stats.tasksPerUser || {}).map(([id, count]) => {
                const u = users.find(x => x._id === id);
                return (
                  <div key={id} style={styles.statCard}>
                    <strong>{u ? u.name : "User"}</strong>
                    <p>{count} tasks</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {user.role === "Admin" && (
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "30px" }}>
            <select onChange={(e) => setSelectedUser(e.target.value)} style={styles.input} value={selectedUser}>
              <option value="">Select User</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
            <button onClick={addMember} style={styles.btnPrimary}>Add Member</button>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <button onClick={() => setShowModal(true)} style={styles.btnPrimary}>+ New Task</button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div style={styles.board}>
            {Object.keys(tasks).map(col => (
              <Droppable droppableId={col} key={col}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={styles.column}>
                    <h3 style={{ marginBottom: "20px", paddingBottom: "10px", borderBottom: "1px solid #222" }}>
                      {col}
                    </h3>

                    {tasks[col].map((task, index) => {
                      const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";

                      return (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...styles.card,
                                ...provided.draggableProps.style,
                                border: isOverdue ? "2px solid #ff4d4d" : "1px solid #222"
                              }}
                            >
                              <strong>{task.title}</strong>
                              <p style={{ margin: "12px 0", color: "#ccc" }}>{task.description}</p>
                              <p>Priority: {task.priority}</p>
                              <p>Assigned: {task.assignedTo?.name || "None"}</p>

                              <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                                <button onClick={() => openEdit(task)} style={styles.btnPrimary}>Edit</button>
                                <button 
                                  onClick={() => deleteTask(task._id)} 
                                  style={{ ...styles.btnPrimary, background: "#ff4d4d" }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={{ marginBottom: "20px" }}>{isEditing ? "Edit Task" : "Create Task"}</h3>

            <input 
              value={title} 
              placeholder="Title" 
              onChange={(e) => setTitle(e.target.value)} 
              style={styles.input} 
            />
            <textarea 
              value={description} 
              placeholder="Description" 
              onChange={(e) => setDescription(e.target.value)} 
              style={{ ...styles.input, minHeight: "80px", resize: "vertical" }} 
            />

            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} style={styles.input}>
              <option value="">Assign User</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>

            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input 
              value={dueDate} 
              type="date" 
              onChange={(e) => setDueDate(e.target.value)} 
              style={styles.input} 
            />

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button onClick={createTask} style={{ ...styles.btnPrimary, flex: 1 }}>
                {isEditing ? "Update" : "Create"}
              </button>
              <button 
                onClick={() => { setShowModal(false); setIsEditing(false); }} 
                style={{ flex: 1, padding: "12px", background: "#333", color: "white", border: "none", borderRadius: "9999px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ================= APP =================
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;