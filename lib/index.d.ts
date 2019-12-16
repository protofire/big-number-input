/// <reference types="react" />
import { BigNumber } from 'ethers/utils';
export interface BigNumberInputReturn {
    name: string;
    value: BigNumber;
}
export interface BigNumberInputProps {
    decimals: number;
    name: string;
    autofocus?: boolean;
    className?: string;
    placeholder?: string;
    max?: BigNumber;
    min?: BigNumber;
    onChange: (value: BigNumberInputReturn) => void;
    step?: BigNumber;
    value?: BigNumber;
    disabled?: boolean;
}
export declare const BigNumberInput: (props: BigNumberInputProps) => JSX.Element;
