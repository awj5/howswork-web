import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

type ResultsProps = {
  id: number;
};

export default function Results(props: ResultsProps) {
  return (
    <>
      <Heading>Check-in {props.id}</Heading>
      <Divider className="mt-6" />
    </>
  );
}
