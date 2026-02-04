import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function StepButtons({
    nextStep,
    prevStep,
    currentStep,
}: {
    nextStep: () => void;
    prevStep: () => void;
    currentStep: number;
}) {
    return (
        <div className="flex flex-row gap-4 place-content-between mt-8">
            <Button
                type="button"
                className="grow"
                variant={"outline"}
                onClick={prevStep}
                disabled={currentStep <= 1 ? true : false}
            >
                <ChevronLeft></ChevronLeft> Tilbage
            </Button>
            <Button
                type="button"
                className="grow"
                onClick={nextStep}
                disabled={currentStep >= 4 ? true : false}
            >
                Næste <ChevronRight></ChevronRight>
            </Button>
        </div>
    );
}