import { CheckInStatType } from "@/types";
import { Divider } from "@/components/ui/divider";
import { Badge } from "@/components/ui/badge";

type StatProps = {
  data: CheckInStatType;
};

export default function Stat(props: StatProps) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{props.data.title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{props.data.primary}</div>

      <div className={`mt-3 text-sm/6 sm:text-xs/6 ${!props.data.secondary && "invisible"}`}>
        <Badge color="indigo">
          {props.data.secondary > 0 && "+"}
          {props.data.secondary}%
        </Badge>{" "}
        <span className="text-zinc-500">from last check-in</span>
      </div>
    </div>
  );
}
