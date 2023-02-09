import fetch from "node-fetch";
import fs from "fs";

// users from https://dummyjson.com/users

async function fetchUser(id) {
  const res = await fetch('https://dummyjson.com/users/'+id);
  const jsn = await res.json();
  return jsn;
}

function saveUserToOwnFile(user) {
  const path = "./users/" + user.id + ".json";
  fs.writeFile(path, JSON.stringify(user), (err) => (console.log(err ?? 'Saved ' + user.id)));
}

async function fetchAndSaveUsers() {
  for(let i=0; i<100; i++) {
    const user = await fetchUser(i+1);
    saveUserToOwnFile(user);
  }
}

fetchAndSaveUsers()