import { filterResources, resources } from "@/src/data/resources";
test("filters resources to relevant course mappings", () => {
  const results = filterResources("", "Web Development");
  expect(results.some((item) => item.id === "mdn")).toBe(true);
  expect(results.some((item) => item.id === "phet")).toBe(false);
});
test("commercial resources are never mislabeled free", () => {
  const commercial = resources.filter((item) =>
    ["Fiveable", "Quizlet", "Albert"].includes(item.name),
  );
  expect(commercial.map((item) => item.pricingModel)).toEqual([
    "Freemium",
    "Freemium",
    "Paid",
  ]);
});
