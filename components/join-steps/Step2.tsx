import { MapIcon, UserIcon, UsersIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FieldLabel } from "../ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";
import StepButtons from "./StepButtons";
import { FormJoinPersonData, FormJoinValidationErrors } from "@/types/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import FormErrorMessage from "../FormErrorMessage";
import { useDebouncedCallback } from "use-debounce";
import { getUserData } from "@/lib/requests.client";
import { useToken } from "@/lib/providers";

export default function Step2({
    nextStep,
    prevStep,
    groupSize,
    pFormData,
    setPFormData,
    validationErrors,
    setValidationErrors,
}: {
    nextStep: () => void;
    prevStep: () => void;
    groupSize: number;
    pFormData: FormJoinPersonData[];
    setPFormData: Dispatch<SetStateAction<FormJoinPersonData[]>>;
    validationErrors: FormJoinValidationErrors;
    setValidationErrors: Dispatch<SetStateAction<FormJoinValidationErrors>>;
}) {
    // pass the data of any field into the correct position in the data array
    // function required as the amount of fields is dynamic
    function updateArray(
        e: ChangeEvent<HTMLInputElement>,
        index: number,
        field: string
    ) {
        const newArray = [...pFormData];
        // make sure array length matches index, so that data gets assigned to that index
        while (newArray.length - 1 < index) {
            newArray.push({ firstName: "", lastName: "" });
        }
        // rebuild the object at that array index using the ChangeEvents value, while keeping the old data
        newArray[index] = {
            ...pFormData[index],
            [field]: e.target.value,
        };
        setPFormData(newArray);
    }

    function clearErrorFromField(e: ChangeEvent<HTMLInputElement>, i: number) {
        setValidationErrors((prev) => {
            const newErrors = { ...prev };
            if (newErrors.personErrors && newErrors.personErrors[i]) {
                Reflect.deleteProperty(newErrors.personErrors[i], e.target.id);
            }
            return newErrors;
        });
    }

    const tokenHandler = useToken();

    const autofillData = useDebouncedCallback(
        (e: ChangeEvent<HTMLInputElement>, index) => {
            //console.log("attempting autofill");
            const memberNo = parseInt(e.target.value);
            getUserData(memberNo, tokenHandler.token).then((data) => {
                const newArray = [...pFormData];
                // while (newArray.length - 1 < index) {
                //     newArray.push({ firstName: "", lastName: "" });
                // }
                if (data[0]  && data[0].name && data[0].surname) {
                newArray[index] = {
                    ...newArray[index],
                    firstName: data[0].name || "",
                    lastName: data[0].surname || "",
                };
            }
                setPFormData(newArray);
            });
        },
        300
    );

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
                        Deltagere
                    </h3>
                </div>
            </CardHeader>

            <CardContent className="flex gap-8 flex-col">
                {/* create duplicate fields for each participant */}
                {[...Array(groupSize).keys()].map((i) => (
                    <div className="flex flex-col gap-4" key={i}>
                        <FieldLabel htmlFor="firstName">
                            Deltager {i + 1}
                        </FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="memberNo"
                                name="memberNo"
                                placeholder="Medlemsnummer"
                                value={pFormData[i]?.memberNo || ""}
                                onChange={(e) => {
                                    updateArray(e, i, "memberNo");
                                    autofillData(e, i);
                                }}
                                onFocus={(e) => {
                                    clearErrorFromField(e, i);
                                }}
                                aria-invalid={
                                    validationErrors.personErrors[i]?.memberNo
                                        ? true
                                        : false
                                }
                            />
                            <InputGroupAddon>
                                <UserIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        {validationErrors.personErrors[i]?.memberNo && (
                            <FormErrorMessage
                                message={
                                    validationErrors.personErrors[i].memberNo
                                }
                            ></FormErrorMessage>
                        )}

                        <InputGroup>
                            <InputGroupInput
                                id="postCode"
                                name="postCode"
                                placeholder="Postnummer"
                                value={pFormData[i]?.postCode || ""}
                                onChange={(e) => updateArray(e, i, "postCode")}
                                onFocus={(e) => {
                                    clearErrorFromField(e, i);
                                }}
                                aria-invalid={
                                    validationErrors.personErrors[i]?.postCode
                                        ? true
                                        : false
                                }
                            />
                            <InputGroupAddon>
                                <MapIcon />
                            </InputGroupAddon>
                            {validationErrors.personErrors[i]?.postCode && (
                                <FormErrorMessage
                                    message={
                                        validationErrors.personErrors[i]
                                            .postCode
                                    }
                                ></FormErrorMessage>
                            )}
                        </InputGroup>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <InputGroup>
                                <InputGroupInput
                                    id="firstName"
                                    name="firstName"
                                    className="capitalize"
                                    placeholder="Fornavn"
                                    value={pFormData[i]?.firstName || ""}
                                    onChange={(e) =>
                                        updateArray(e, i, "firstName")
                                    }
                                    onFocus={(e) => {
                                        clearErrorFromField(e, i);
                                    }}
                                    aria-invalid={
                                        validationErrors.personErrors[i]
                                            ?.firstName
                                            ? true
                                            : false
                                    }
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupInput
                                    id="lastName"
                                    name="lastName"
                                    className="capitalize"
                                    placeholder="Efternavn"
                                    value={pFormData[i]?.lastName || ""}
                                    onChange={(e) =>
                                        updateArray(e, i, "lastName")
                                    }
                                    onFocus={(e) => {
                                        clearErrorFromField(e, i);
                                    }}
                                    aria-invalid={
                                        validationErrors.personErrors[i]
                                            ?.lastName
                                            ? true
                                            : false
                                    }
                                />
                            </InputGroup>
                        </div>
                        {validationErrors.personErrors[i]?.firstName && (
                            <FormErrorMessage
                                message={
                                    validationErrors.personErrors[i].firstName
                                }
                            ></FormErrorMessage>
                        )}
                        {validationErrors.personErrors[i]?.lastName && (
                            <FormErrorMessage
                                message={
                                    validationErrors.personErrors[i].lastName
                                }
                            ></FormErrorMessage>
                        )}
                    </div>
                ))}

                <StepButtons
                    nextStep={nextStep}
                    prevStep={prevStep}
                    currentStep={groupSize > 1 ? 2 : 1}
                ></StepButtons>
            </CardContent>
        </Card>
    );
}
