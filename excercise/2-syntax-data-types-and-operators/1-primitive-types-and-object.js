// 1. Primitive: pass-by-value (independen)
let titleA = "Dashboard";
let titleB = titleA;
titleB = "Settings";
console.log(titleA); // Dashboard (titleA tidak terpengaruh)

// 2. Object: pass-by-reference (berbagi referensi memori)
const userProfile = { name: "Ari", role: "Developer" };
const editProfile = userProfile;
editProfile.role = "Lead";
console.log(userProfile.role); // Lead (userProfile ikut berubah!)
