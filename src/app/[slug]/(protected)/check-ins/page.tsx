"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCompanyContext } from "@/hooks/useCompanyContext";
import type { CheckInType } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "@/components/TablePagination";
import CheckIn from "@/components/company/check-ins/CheckIn";

export default function CheckIns() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { company } = useCompanyContext();
  const [checkIns, setCheckIns] = useState<CheckInType[]>();
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 25;
  const page = Number(searchParams.get("page")) || 1; // Default to page 1

  const getCheckInsData = async (companyID: number, pin: number, from: number, to: number) => {
    try {
      const response = await fetch("/api/check-ins", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ companyID, pin, from, to }),
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

    const getCheckIns = async () => {
      const pin = sessionStorage.getItem(`company_access_${company.slug}`);

      // Pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const result = await getCheckInsData(company.id, Number(pin), from, to);

      if (result.error && result.status === 401) {
        // Pin invalid
        sessionStorage.removeItem(`company_access_${company.slug}`); // Remove stored pin
        router.push(`/${company.slug}/error`); // Redirect
        return;
      } else if (result.error) {
        console.error(result.error);
        return;
      }

      // Success
      setCheckIns(result.data);
      setPageCount(Math.max(1, Math.ceil(result.count / pageSize)));
    };

    getCheckIns();
  }, [company, page]);

  return (
    <div className="mx-auto max-w-6xl">
      <Heading>Check-ins with {company?.name}</Heading>

      {checkIns && (
        <div className="fade-in">
          <Table striped className="mt-8 [--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]">
            <TableHead>
              <TableRow>
                <TableHeader>Date</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {checkIns?.map((checkIn) => (
                <CheckIn key={checkIn.start} data={checkIn} timezone={company?.timezone} />
              ))}
            </TableBody>
          </Table>

          <TablePagination page={page} pageCount={pageCount} route={`/${company?.slug}/check-ins`} />
        </div>
      )}
    </div>
  );
}
