let json = "{ 'age': 15 }";

function readData() {
  try {
    let user = JSON.parse(json);
    alert(user.name);
  } catch (err){
    if (err instanceof ReferenceError) {
      alert("JSON Error:" + e.message);
    } else {
      throw err;
    }
  }
}

// rethrow
try {
  readData();
} catch (err) {
  alert("External Catch got: " + err.message)
}
