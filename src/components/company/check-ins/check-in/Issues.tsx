import IssuesData from "@/data/issues.json";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Subheading } from "@/components/ui/heading";

type IssuesProps = {
  data: number[] | undefined;
};

export default function Issues(props: IssuesProps) {
  return (
    <div className="mt-12">
      <Subheading>Issues experienced</Subheading>

      <div className="mt-4 flex flex-wrap gap-4 sm:gap-3">
        {props.data?.length ? (
          props.data.map((issue) => {
            const tag = IssuesData.find((i) => i.id === issue)?.tag;

            return <Badge key={issue}>{tag}</Badge>;
          })
        ) : (
          <Text>No issues reported</Text>
        )}
      </div>
    </div>
  );
}
