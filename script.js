temp1 =
  "INSERT INTO User (id_user, first_name, last_name, age, fk_id_country, fk_id_gender, fk_id_age_group) VALUES (";
temp2 = ");";

data1 = ["'Ante'", "'Mate'", "'Ivan'", "'Ivana'", "'Matea'"];
for (let index = 0; index < 2; index++) {
  let query = temp1 + index + ", " + data1[index] + temp2;
  console.log(query);
}
