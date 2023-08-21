"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";

export function InfoModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <HelpCircle className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About This Project</DialogTitle>
          </DialogHeader>

          <div className="text-neutral-600 leading-relaxed">
            User-curated social platform, Your voice, your power Predict to Earn
            by
            <a
              href="https://twitter.com/flaredapp"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="link"
                className="px-[3px] text-base w-auto py-0 h-auto"
              >
                flaredapp
              </Button>
            </a>{" "}
          </div>
          <div className="text-neutral-600 leading-relaxed">
            Our goal is to create a trusted, free, and high-value social
            network. Through mechanisms such as staking, predictions, and token
            incentives, Flare provides you with the ability to express
            themselves and prevents the spread of meaningless information.
          </div>
          <DialogFooter>
            <a
              href="https://www.github.com/FlareZone/flare-dapp.io"
              target="_blank"
              rel="noreferrer"
              className="w-full mt-2"
            >
              <Button className="w-full" variant="outline">
                <Github className="w-5 h-5 mr-2" /> GitHub
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
