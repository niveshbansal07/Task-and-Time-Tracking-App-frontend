const API_URL = "https://task-and-time-tracking-app-backend.onrender.com/api";
  import { onMount } from "svelte";

  

  onMount(async () => {
    try {
      const res = await fetch(`${API_URL}/db-test`);
      const data = await res.json();
      console.log("Backend test response:", data);
    } catch (err) {
      console.error("Failed to connect to backend:", err);
    }
  });

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
