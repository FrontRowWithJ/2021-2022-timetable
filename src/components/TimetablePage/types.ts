import { module } from "../../timetableData";

export interface TimetablePageProps {
  curr: number;
  index: number;
  date: string;
  hour: number;
  tableRef: React.RefObject<HTMLDivElement>;
  schedule: (module | module[])[];
}
