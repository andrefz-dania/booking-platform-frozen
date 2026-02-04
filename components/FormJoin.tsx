"use client";
import {
    EventType,
    FormJoinGroupData,
    FormJoinPersonData,
    FormJoinValidationErrors,
    StepType,
} from "@/types/types";
import { useState } from "react";
import Step1 from "./join-steps/Step1";
import Step2 from "./join-steps/Step2";
import Step3 from "./join-steps/Step3";
import { validateJoin } from "@/lib/validation";
import LoadingSpinner from "./LoadingSpinner";
import { joinEvent } from "@/lib/requests.client";
import { redirect } from "next/navigation";
import { useToken } from "@/lib/providers";

export default function FormJoin({
    event,
}: {
    event: EventType;
}) {
    const [groupFormData, setGroupFormData] = useState<FormJoinGroupData>({
        groupName: null,
        groupLeader: null,
    });

    const tokenHandler = useToken();

    const groupSize = event.groupSize ? event.groupSize : 1;

    function fillArrays() {
        const newArray = []
        while (newArray.length < groupSize) {
            
            newArray.push({ firstName: "", lastName: "" });
            
        }
        return newArray
    };



    const [pFormData, setPFormData] = useState<FormJoinPersonData[]>(fillArrays());

    //const isGroupEvent: boolean = !!(event.groupSize && event.groupSize >= 2);

    const [step, setStep] = useState<number>(1);
    const [busy, setBusy] = useState(false)
    const [validationErrors, setValidationErrors] = useState<FormJoinValidationErrors>({
        groupErrors: {},
        personErrors: []
    });





    let steps: StepType[] = [
        { id: 1, title: "Hold info" },
        { id: 2, title: "Deltagere" },
        { id: 3, title: "Bekræftelse" },
        { id: 4, title: "Betaling" },
    ];

    if (groupSize == 1) {
        steps = [
            { id: 1, title: "Deltagere" },
            { id: 2, title: "Bekræftelse" },
            { id: 3, title: "Betaling" },
        ];
    }

    function validateData() {
        setBusy(true);
        const data = {
            groupFormData: groupFormData,
            participants: pFormData
        }
        validateJoin(data)
        .then(r => {
            setValidationErrors(r)
            const noPersonErrors = r.personErrors.every(element => {
                return Boolean(element && typeof element === 'object') && !Object.keys(element).length;
              }); 
            
            setBusy(false);
            if (noPersonErrors) {
                setStep((prev) => prev + 1);
            }
        });
        ;
    }

    function goToPayment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!event.id) {
            return;
        }
        setBusy(true);
        const data = {
            groupFormData: groupFormData,
            participants: pFormData
        }
        joinEvent(data, event.id, tokenHandler.token).then(r => {
            if (r.checkoutURL) {
                redirect(r.checkoutURL.toString());
            }
            setBusy(false);
            
        })
    }

    function nextStep() {
        if (step == steps.length - 2) {
            validateData();
        } else if (step < steps.length) setStep((prev) => prev + 1);
    }

    function prevStep() {
        if (step > 1) setStep((prev) => prev - 1);
    }
    return (
        <div>
            <ul className="flex flex-row gap-4 w-full place-content-between list-none mt-8">
                {steps.map((s) => {
                    return (
                        <div key={s.id}>
                            <StepIndicator
                                id={s.id}
                                title={s.title}
                                currentStep={step}
                            />
                        </div>
                    );
                })}
            </ul>
            {busy ? <LoadingSpinner></LoadingSpinner> : 
            <form onSubmit={goToPayment}>
                {/* if the event has multiple participants, show step 1 for group leader and group name */}
                {groupSize > 1 ? (
                    <>
                        {step == 1 && (
                            <Step1
                                prevStep={prevStep}
                                nextStep={nextStep}
                                groupFormData={groupFormData}
                                setGroupFormData={setGroupFormData}
                                validationErrors={validationErrors}
                                setValidationErrors={setValidationErrors}
                            />
                        )}
                        {step == 2 && (
                            <Step2
                                prevStep={prevStep}
                                nextStep={nextStep}
                                groupSize={groupSize}
                                pFormData={pFormData}
                                setPFormData={setPFormData}
                                validationErrors={validationErrors}
                                setValidationErrors={setValidationErrors}
                            />
                        )}
                        {step == 3 && (
                            <Step3
                                prevStep={prevStep}
                                groupSize={groupSize}
                                groupFormData={groupFormData}
                                pFormData={pFormData}
                            />
                        )}
                    </>
                ) : (
                    // if the event only supports 1 participant, skip step 1
                    <>
                        {step == 1 && (
                            <Step2
                                prevStep={prevStep}
                                nextStep={nextStep}
                                groupSize={groupSize}
                                pFormData={pFormData}
                                setPFormData={setPFormData}
                                validationErrors={validationErrors}
                                setValidationErrors={setValidationErrors}
                            />
                        )}
                        {step == 2 && (
                            <Step3
                                prevStep={prevStep}
                                groupSize={groupSize}
                                groupFormData={groupFormData}
                                pFormData={pFormData}
                            />
                        )}
                    </>
                )}
            </form>
            }
        </div>
    );
}

function StepIndicator({
    id,
    title,
    currentStep,
}: {
    id: number;
    title: string;
    currentStep: number;
}) {
    if (currentStep >= id) {
        return (
            <li className="flex flex-col items-center place-content-center">
                <div className="flex items-center text-center rounded-full bg-primary text-primary-foreground aspect-square h-12 sm:h-16 place-content-center text-bold text-3xl">
                    {id}
                </div>
                <h3 className="font-bold md:text-lg sm:w-auto w-0 invisible sm:visible">
                    {title}
                </h3>
            </li>
        );
    } else {
        return (
            <li className="flex flex-col items-center place-content-center">
                <div className="flex items-center text-center rounded-full bg-transparent border-primary border-2 text-primary aspect-square h-12 sm:h-16 place-content-center text-bold text-3xl">
                    {id}
                </div>
                <h3 className="font-bold md:text-lg sm:w-auto w-0 invisible sm:visible text-muted-foreground">
                    {title}
                </h3>
            </li>
        );
    }
}
