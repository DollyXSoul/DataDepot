import { FileType } from "@/types";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  return (
    <div>
      <Button variant="outline">Sort by ...</Button>

      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  );
};

export default TableWrapper;
