import IssuesData from "@/data/issues.json";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";

type IssuesProps = {
  data: number[] | undefined;
};

export default function Issues(props: IssuesProps) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Issues experienced</div>

      <div className="mt-3 flex flex-wrap gap-4 sm:gap-3">
        {props.data?.length ? (
          props.data.map((issue) => {
            const tag = IssuesData.find((i) => i.id === issue)?.tag;

            return (
              <Badge key={issue} color="indigo">
                {tag}
              </Badge>
            );
          })
        ) : (
          <Text>No issues reported</Text>
        )}
      </div>
    </div>
  );
}
