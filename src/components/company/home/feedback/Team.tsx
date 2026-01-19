"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import { Description, Field, Label } from "@/components/ui/fieldset";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/ui/listbox";
import { Divider } from "@/components/ui/divider";

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
  const router = useRouter();
  const { company } = useCompanyContext();
  const [teams, setTeams] = useState<TeamType[]>([]);

  const getTeamsData = async (companyID: number, pin: number) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin }),
      });

      const json = await response.json();
      json.status = response.status;
      return json;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

  useEffect(() => {
    if (!company) return;

    const getTeams = async () => {
      const pin = sessionStorage.getItem(`company_access_${company.slug}`);
      const result = await getTeamsData(company.id, Number(pin));

      if (result.error && result.status === 401) {
        // Pin invalid
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company.slug}/error`); // Redirect
      } else if (result.error) {
        console.error(result.error);
        return;
      }

      setTeams(result.data);
    };

    getTeams();
  }, [company]);

  return (
    <Field
      disabled={!props.sentiment || !teams.length || props.disabled}
      className={`transition-opacity duration-300 ease-in ${!props.sentiment || !teams.length ? "h-0 overflow-hidden opacity-0" : "opacity-100"}`}
    >
      <Divider className="my-8" soft />
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
