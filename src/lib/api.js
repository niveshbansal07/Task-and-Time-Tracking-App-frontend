const API_URL = "https://task-and-time-tracking-app-backend.onrender.com/api";

export async function signup(data) {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}

export async function login({ email, password }) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
}



export async function getTasks() {
  const token = localStorage.getItem("token"); 
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch tasks");
  }

  const tasks = await res.json();
  return tasks;
}

