import { DateTime } from "luxon";
import { HandRaisedIcon, CheckIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import StatusData from "@/data/status.json";
import type { ConcernActivityType } from "@/types";
import { Text } from "@/components/ui/text";

type EventProps = {
  data: ConcernActivityType;
};

const icons = {
  start: HandRaisedIcon,
  status: CheckIcon,
  comment: ChatBubbleOvalLeftEllipsisIcon,
};

export default function Event(props: EventProps) {
  const date = DateTime.fromISO(props.data.created_at); // Convert to date object
  const status = props.data.status ?? null;
  const Icon = status === 0 ? icons["start"] : icons[props.data.type as keyof typeof icons];

  return (
    <div className="flex gap-3">
      <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-zinc-800 dark:ring-zinc-900">
        <Icon className="size-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
      </div>

      <div className="flex flex-1 justify-between gap-4 pt-1">
        <Text>
          {status === 0 ? (
            "Concern was raised"
          ) : status ? (
            <>
              Status was updated to{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {StatusData.find((i) => i.id === status)?.title}
              </span>
            </>
          ) : (
            props.data.comment
          )}
        </Text>

        <Text className="whitespace-nowrap">
          {date
            .toLocal()
            .toRelative()
            ?.replace(/ days?/, "d")
            .replace(/ weeks?/, "w")
            .replace(/ months?/, "mo")
            .replace(/ years?/, "y")
            .replace(/ hours?/, "h")
            .replace(/ minutes?/, "m")
            .replace(/ seconds?/, "s")}
        </Text>
      </div>
    </div>
  );
}
