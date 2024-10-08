import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        paramValue="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <Sort
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sort by regularPrice (low first)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by regularPrice (high first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by maxCapacity (low first)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by maxCapacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
