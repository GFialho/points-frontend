"use client";
import { Spinner } from "@/components/Spinner";
import { useState } from "react";
import * as Select from "@/components/Selector";
import Toast, { ToastType } from "@/components/Toast";
import { useMutationAddPoints } from "@/mutations/addPoints";
import { getSdkInstance } from "@/sdk";

// Utility function to validate Ethereum addresses
const isValidAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export default function Points() {
  const [address, setAddress] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiType, setApiType] = useState<string>("get");
  const [isToastVisible, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");
  const [eventName, setEventName] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);

  const { mutateAsync } = useMutationAddPoints();

  const getPoints = async () => {
    if (!isValidAddress(address)) {
      setShowToast(true);
      setToastMessage("Invalid wallet address");
      setToastType("error");
      return;
    }

    try {
      setIsLoading(true);
      const sdkClient = getSdkInstance();
      const response = await sdkClient?.getPoints(address, apiKey, eventName);
      setBalance(response.balance);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setShowToast(true);
      setToastMessage("An error happened. Please try again");
      setToastType("error");
      setIsLoading(false);
    }
  };

  const addPoints = async () => {
    if (!isValidAddress(address)) {
      setShowToast(true);
      setToastMessage("Invalid wallet address");
      setToastType("error");
      return;
    }

    if (!amount) {
      setShowToast(true);
      setToastMessage("Amount must be higher than 0");
      setToastType("error");
      return;
    }

    try {
      setIsLoading(true);
      console.log({ address, amount, eventName });
      await mutateAsync({ address, amount, eventName, apiKey });
      setShowToast(true);
      setToastMessage("You successfully added the points");
      setToastType("success");
      setIsLoading(false);
    } catch (e: any) {
      console.error(e);
      setShowToast(true);
      setToastMessage("An error happened. Please try again");
      setToastType("error");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toast
        type={toastType}
        message={toastMessage}
        visibleFunction={setShowToast}
        visible={isToastVisible}
      />
      <span>Choose the endpoint type:</span>
      <Select.Root
        defaultValue={apiType}
        onValueChange={setApiType}
        value={apiType}
      >
        <Select.Trigger aria-label="Endpoint Menu">
          <Select.Value placeholder="Select the endpoint type" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Item value={"get"} key={"get"}>
              <div className="flex flex-row">
                <p className="ml-2 text-black ">Get Points</p>
              </div>
            </Select.Item>
            <Select.Item value={"add"} key={"add"}>
              <div className="flex flex-row">
                <p className="ml-2 text-black ">Add Points</p>
              </div>
            </Select.Item>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <div className="flex flex-col pb-2 mt-2">
        <p className="font-bold">Api Key</p>
        <input
          type="text"
          min="0"
          defaultValue={apiKey}
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          className="rounded-md shadow-md text-center font-bold text-md"
        />
      </div>
      {apiType === "get" && (
        <div>
          <div className="flex flex-col py-1">
            <p className="font-bold">Event Name</p>
            <input
              type="text"
              min="0"
              defaultValue={eventName}
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
              className="rounded-md shadow-md text-center font-bold text-md"
            />
          </div>
          <div className="flex flex-col py-1">
            <p className="font-bold">Address</p>
            <input
              type="text"
              min="0"
              defaultValue={address}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="rounded-md shadow-md text-center font-bold text-md px-2"
            />
          </div>

          <button
            className={`w-full mt-10 shadow shadow-md self-center text-center my-1 text-2xl rounded-lg bg-blue-500 py-1 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
            color="primary"
            onClick={getPoints}
          >
            {isLoading ? (
              <div className="flex self-center justify-center">
                <Spinner height={32} />
              </div>
            ) : (
              <div>GET POINTS</div>
            )}
          </button>
          <div className="flex flex-col py-1 my-4">
            <p className="font-bold text-center text-2xl">Balance</p>
            <span className="rounded-md shadow-md text-center font-bold text-4xl">
              {balance === null ? "-" : balance}
            </span>
          </div>
        </div>
      )}

      {apiType === "add" && (
        <div>
          <div className="flex flex-col py-1">
            <p className="font-bold">Address</p>
            <input
              type="text"
              min="0"
              defaultValue={address}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="rounded-md shadow-md text-center font-bold text-ms"
            />
          </div>
          <div className="flex flex-col py-1">
            <p className="font-bold">Event Name</p>
            <input
              type="text"
              min="0"
              defaultValue={eventName}
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
              className="rounded-md shadow-md text-center font-bold text-ms"
            />
          </div>
          <p className="font-bold self-center py-1">Amount</p>
          <input
            type="number"
            min="0"
            defaultValue={amount}
            value={amount}
            onChange={(event) => setAmount(+event.target.value)}
            className="rounded-md shadow-md text-center font-bold text-2xl w-full"
          />

          <button
            className={`w-full my-10 self-end text-center my-1 text-2xl rounded-lg bg-blue-500 py-1 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
            color="primary"
            onClick={addPoints}
          >
            {isLoading ? (
              <div className="flex self-center justify-center">
                <Spinner height={32} />
              </div>
            ) : (
              <div>ADD POINTS</div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
