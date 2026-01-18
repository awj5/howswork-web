"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { getTeams } from "@/app/[slug]/(protected)/home/actions";
import { Description, Field, Label } from "@/components/ui/fieldset";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/ui/listbox";

type TeamProps = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
  sentiment: number;
  disabled: boolean;
};

type TeamType = {
  id: number;
  name: string;
};

export default function Team(props: TeamProps) {
  const { company } = useCompanyContext();
  const [teams, setTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    if (!company) return;

    const getTeamsData = async () => {
      const result = await getTeams(company.id);

      if (result.error) {
        console.error(result.error);
        return;
      }

      setTeams(result.data ?? []);
    };

    getTeamsData();
  }, [company]);

  return (
    <Field disabled={!props.sentiment || !teams.length || props.disabled}>
      <Label>Team (optional)</Label>
      <Description>Helps identify patterns within teams.</Description>

      <Listbox placeholder="Select your team" onChange={(e) => props.setVal(Number(e))}>
        {teams.map((team) => (
          <ListboxOption key={team.id} value={team.id}>
            <ListboxLabel>{team.name}</ListboxLabel>
          </ListboxOption>
        ))}

        <ListboxOption value={0}>
          <ListboxLabel>Rather not say</ListboxLabel>
        </ListboxOption>
      </Listbox>
    </Field>
  );
}
