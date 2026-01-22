import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Subheading } from "@/components/ui/heading";
import EmptyState from "@/components/EmptyState";
import { Input, InputGroup } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Concerns() {
  return (
    <div className="mx-auto max-w-6xl">
      <EmptyState>
        <Subheading>Look up your concern</Subheading>
        <Text className="mt-1 text-center">Enter your tracking number to view updates.</Text>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input placeholder="HW-XXXXXXXX" aria-label="Search" />
          </InputGroup>

          <Button color="indigo">Search</Button>
        </div>
      </EmptyState>
    </div>
  );
}
