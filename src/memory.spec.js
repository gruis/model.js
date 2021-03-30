import Memory from "./memory";

test("it works", () => {
  const memory = new Memory({
    id: 1,
    title: "A memory",
    status: "draft",
    date: "1967-01-01"
  }).valueOf();

  expect(memory.id).toEqual(1);
  expect(memory.title).toEqual("A memory");
  expect(memory.status).toEqual("draft");
  expect(memory.date).toEqual(new Date("1967-01-01"));
  expect(memory.author.id).toEqual(0);
});
