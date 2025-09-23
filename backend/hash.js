import bcrypt from "bcryptjs";

async function generateHashes() {
  const users = {
    "Silva-ADM-001": "SilvaADM@123",
    "PERERA-SECOPS-001": "PereraOfficer@123",
    "Fernando-IT-001": "FernandoIT@123",
  };

  for (let [username, password] of Object.entries(users)) {
    const hash = await bcrypt.hash(password, 10); // 10 = salt rounds
    console.log(`${username} => ${password} => ${hash}`);
  }
}

generateHashes();