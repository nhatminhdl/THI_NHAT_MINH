import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";

import tokenPricesApi from "../../api/tokenPricesApi";
import images from "../../asset/imgs";

const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
        <img src={images[`${label}.svg`]} alt={label} style={{ width: 20, height: 20, marginRight: 10 }} />
        <span>{label}</span>
    </div>
);

const FancyForm = () => {
    const [tokens, setTokens] = useState([]);
    const [fromToken, setFromToken] = useState("");
    const [toToken, setToToken] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const tokenPrices = await tokenPricesApi.getTokenPrice();

                setTokens(
                    tokenPrices.map((token, index) => ({
                        label: token.currency,
                        value: token.price,
                    }))
                );
            } catch (error) {
                console.error("Error fetching token prices:", error);
            }
        };

        fetchTokens();
    }, []);

    const handleSwap = (e) => {
        e.preventDefault();
        let result;
        if (!fromToken || !toToken || !amount) {
            setError("(*) All fields are required.");
            return;
        }

        const fromPrice = fromToken["value"];
        const toPrice = toToken["value"];

        if (fromPrice === toPrice) {
            result = amount * fromPrice;
            setResult(result);
            setError("");
            return;
        }

        result = (amount * fromPrice) / toPrice;
        setResult(result);
        setError("");
    };

    return (
        <FormContainer>
            <HeaderFormContainer>
                <img className="currency-logo" src={images[`currency_exchange.svg`]} alt="Currency Swap" />
                <span className="title-text">Currency Swap</span>
                <Separator />
            </HeaderFormContainer>

            <form onSubmit={handleSwap}>
                <div>
                    <label>From:</label>
                    <CustomSelect
                        options={tokens}
                        value={fromToken}
                        onChange={setFromToken}
                        placeholder="--- Select Currency ---"
                        formatOptionLabel={formatOptionLabel}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        autoFocus
                    />
                </div>
                <div>
                    <label>To:</label>
                    <CustomSelect
                        options={tokens}
                        value={toToken}
                        onChange={setToToken}
                        placeholder="--- Select Currency ---"
                        formatOptionLabel={formatOptionLabel}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        autoFocus
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                </div>
                <button type="submit" style={{ textAlign: "center", alignItems: "center" }}>
                    <img style={{ width: "15px", height: "15px" }} src={images["convert.svg"]} alt="convert" /> Swap
                </button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {result !== null && <ResultMessage>Result: {result.toFixed(4)}</ResultMessage>}
            </form>
        </FormContainer>
    );
};

export default FancyForm;

const FormContainer = styled.div`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    h1 {
        margin-bottom: 20px;
    }

    form > div {
        margin-bottom: 10px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    select,
    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.div`
    margin-top: 10px;
    color: red;
`;

const ResultMessage = styled.div`
    margin-top: 10px;
    color: green;
`;

const CustomSelect = styled(Select)`
    .react-select__menu {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .react-select__menu-list {
        /* width */
        &::-webkit-scrollbar {
            width: 5px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #888;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }

    .react-select__option {
        &:hover {
            cursor: pointer;
        }
    }
`;

const Input = styled.input`
    align-items: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-height: 38px;
    outline: 0 !important;
    position: relative;
    -webkit-transition: all 100ms;
    transition: all 100ms;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
`;

const HeaderFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .currency-logo {
        width: 50px;
        height: 50px;
        
    }

    .title-text {
        font-size: larger;
        font-weight: 700;
    }

`;

const Separator = styled.div`
    width: 60%;
    border-bottom: 1px solid hsl(0, 0%, 80%);
    margin: 10px 0;
`;
