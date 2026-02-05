import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/16/solid";
import { CheckInStatType } from "@/types";
import { Divider } from "@/components/ui/divider";
import { Badge } from "@/components/ui/badge";

type StatProps = {
  data: CheckInStatType;
};

export default function Stat(props: StatProps) {
  const trend = props.data.secondary && props.data.secondary > 0 ? "up" : "down";

  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{props.data.title}</div>

      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
        {props.data.primary}
        {props.data.percentage && "%"}
      </div>

      {props.data.secondary ? (
        <div className="mt-3 flex items-center gap-1">
          {!props.data.percentage ? (
            <Badge>
              {trend === "up" && "+"}
              {props.data.secondary}%
            </Badge>
          ) : trend === "up" ? (
            <ArrowTrendingUpIcon className="size-7 text-green-500 sm:size-6" />
          ) : (
            <ArrowTrendingDownIcon className="size-7 text-red-500 sm:size-6" />
          )}

          <span className="text-sm/6 text-zinc-500 sm:text-xs/6">from last check-in</span>
        </div>
      ) : null}
    </div>
  );
}
