"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { getTeams } from "@/app/[slug]/(protected)/home/actions";
import type { TeamType } from "@/types";
import { Description, Field, Label } from "@/components/ui/fieldset";
import { Combobox, ComboboxLabel, ComboboxOption } from "@/components/ui/combobox";

type TeamProps = {
  val: TeamType | null;
  setVal: Dispatch<SetStateAction<TeamType | null>>;
  sentiment: number;
};

export default function Team(props: TeamProps) {
  const { company } = useCompanyContext();
  const [teams, setTeams] = useState<TeamType[]>([]);
  const options = [...teams, { id: 0, name: "Rather not say" }]; // Add so users can select if they change their mind

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
    <Field disabled={!props.sentiment || !teams.length}>
      <Label>Team (optional)</Label>
      <Description>Used to identify team-specific issues.</Description>

      <Combobox
        options={options}
        displayValue={(t) => t?.name}
        placeholder="Select your team"
        value={props.val}
        onChange={(e) => props.setVal(e)}
      >
        {(team) => (
          <ComboboxOption value={team}>
            <ComboboxLabel>{team.name}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    </Field>
  );
}
