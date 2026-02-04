import { FormJoinGroupData, FormJoinValidationErrors } from "@/types/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { UserIcon, UsersIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import StepButtons from "./StepButtons";
import FormErrorMessage from "../FormErrorMessage";

export default function Step1({
    nextStep,
    prevStep,
    groupFormData,
    setGroupFormData,
    validationErrors,
    setValidationErrors
}: {
    nextStep: () => void;
    prevStep: () => void;
    groupFormData: FormJoinGroupData;
    setGroupFormData: Dispatch<SetStateAction<FormJoinGroupData>>;
    validationErrors: FormJoinValidationErrors,
    setValidationErrors: Dispatch<SetStateAction<FormJoinValidationErrors>>;
}) {
    function updateGroupName(e: ChangeEvent<HTMLInputElement>) {
        setGroupFormData((prev) => {
            return {
                ...prev,
                groupName: e.target.value,
            };
        });
    }

    function clearErrorFromField(e: ChangeEvent<HTMLInputElement>) {
        setValidationErrors((prev) => {
            const newErrors = { ...prev };
            Reflect.deleteProperty(newErrors.groupErrors, e.target.id)
            return newErrors;})}
    

    function updateGroupLeader(e: ChangeEvent<HTMLInputElement>) {
        setGroupFormData((prev) => {
            return {
                ...prev,
                groupLeader: e.target.value,
            };
        });
    }

    // client side validation to prevent going to next page if these fields are required
    // this is because they are optional when sending to the API, as some events do not require groups
    function advance() {
        if (groupFormData.groupLeader && groupFormData.groupName)
        {nextStep()}
        else {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                if (!groupFormData.groupLeader) newErrors.groupErrors = { groupLeader: "Hold leder er påkrævet", }
                if (!groupFormData.groupName) newErrors.groupErrors = { ...newErrors.groupErrors, groupName: "Hold navn er påkrævet", }
                return newErrors;}
            );
        }
    }
    return (
        <Card className="max-w-xl p-4 mx-auto my-8">
            <CardHeader>
                <div className="w-full flex flex-row gap-4 pt-4">
                    <UsersIcon
                        strokeWidth={3}
                        size={32}
                        className="text-primary"
                    />
                    <h3 className="text-center text-2xl font-bold text-primary mb-4">
                        Hold info
                    </h3>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <InputGroup>
                    <InputGroupInput
                        id="groupName"
                        name="groupName"
                        placeholder="Holdnavn"
                        value={groupFormData.groupName || ""}
                        onFocus={(e)=>{clearErrorFromField(e)}}
                        onChange={(e) => updateGroupName(e)}
                        aria-invalid={validationErrors.groupErrors.groupName ? true : false}
                    />
                    <InputGroupAddon>
                        <UserIcon />
                    </InputGroupAddon>
                </InputGroup>
                {validationErrors.groupErrors.groupName &&
                <FormErrorMessage message={validationErrors.groupErrors.groupName}></FormErrorMessage> }

                <InputGroup>
                    <InputGroupInput
                        id="groupLeader"
                        name="groupLeader"
                        placeholder="Hold kaptajn"
                        value={groupFormData.groupLeader || ""}
                        onFocus={(e)=>{clearErrorFromField(e)}}
                        onChange={(e) => updateGroupLeader(e)}
                        aria-invalid={validationErrors.groupErrors.groupLeader ? true : false}

                    />
                    <InputGroupAddon>
                        <UserIcon />
                    </InputGroupAddon>
                </InputGroup>
                {validationErrors.groupErrors.groupLeader &&
                <FormErrorMessage message={validationErrors.groupErrors.groupLeader}></FormErrorMessage> }


                <StepButtons
                    nextStep={advance}
                    prevStep={prevStep}
                    currentStep={1}
                ></StepButtons>
            </CardContent>
        </Card>
    );
}