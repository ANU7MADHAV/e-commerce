import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

export function ButtonAsChild({ children }: PropsWithChildren) {
  return (
    <Button asChild>
      <Link href="/auth/signup">{children}</Link>
    </Button>
  );
}
