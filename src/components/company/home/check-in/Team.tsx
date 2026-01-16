"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Description, Field, Label } from "@/components/ui/fieldset";
import { Combobox, ComboboxLabel, ComboboxOption } from "@/components/ui/combobox";

type TeamProps = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
  sentiment: number;
};

type TeamType = {
  id: number;
  name: string;
};

export default function Team(props: TeamProps) {
  const [teams, setTeams] = useState<TeamType[]>([]);

  return (
    <Field disabled={!props.sentiment}>
      <Label>Team (optional)</Label>
      <Description>Used only to spot trends across teams.</Description>

      <Combobox options={teams} displayValue={(team) => team?.name} placeholder="Select your team">
        {(team) => (
          <ComboboxOption value={team.id}>
            <ComboboxLabel>{team.name}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    </Field>
  );
}
