import { useSearchParams } from "next/navigation";
import { DateTime } from "luxon";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import type { CheckInType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type CheckInProps = {
  data: CheckInType;
  timezone: string | undefined;
};

export default function CheckIn(props: CheckInProps) {
  const searchParams = useSearchParams();
  const { company } = useCompanyContext();
  const startDT = DateTime.fromISO(props.data.start).toUTC(); // Convert to date object (UTC)
  const isScheduled = props.data.status === "Scheduled" || props.data.status === "Upcoming";

  return (
    <TableRow
      href={
        isScheduled
          ? undefined
          : `/${company?.slug}/check-ins/${props.data.id}${searchParams.size ? `?${searchParams.toString()}` : ""}`
      }
    >
      <TableCell className={`font-medium ${isScheduled && "text-zinc-500"}`}>
        <time className="sm:hidden">{startDT.setZone(props.timezone).toFormat("ccc, dd LLL yyyy")}</time>
        <time className="hidden sm:inline">{startDT.setZone(props.timezone).toFormat("cccc, dd LLLL yyyy")}</time>
      </TableCell>

      <TableCell>
        <Badge color={props.data.status === "Closed" ? "green" : isScheduled ? "zinc" : "amber"}>
          {props.data.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
