"use client";
import { Spinner } from "@/components/Spinner";
import Toast, { ToastType } from "@/components/Toast";
import { useMutationCreateProject } from "@/mutations/createProject";
import { useState } from "react";

export default function Points() {
  const [id, setId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [isToastVisible, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  const { mutateAsync } = useMutationCreateProject();

  async function createProject() {
    try {
      setIsLoading(true);
      const response = await mutateAsync({ id });
      console.log({ response });
      setApiKey(response?.apiKey);
      setShowToast(true);
      setToastMessage("Project created");
      setToastType("success");
      setIsLoading(false);
    } catch (e: any) {
      console.error(e);
      setIsLoading(false);

      setShowToast(true);
      setToastMessage("An error happened. Please try again");
      setToastType("error");
    }
  }

  return (
    <div>
      <Toast
        type={toastType}
        message={toastMessage}
        visibleFunction={setShowToast}
        visible={isToastVisible}
      />
      {!apiKey ? (
        <div className="flex flex-col py-4">
          <p className="font-bold mb-2">Create a Project</p>
          <p>Project identifier</p>
          <input
            type="text"
            defaultValue={id}
            value={id}
            onChange={(event) => setId(event.target.value)}
            className="mt-1 rounded-md shadow-md text-center font-bold text-2xl"
          />
        </div>
      ) : (
        <div>
          <span className="text-2xl my-2">
            This is your apiKey, do not loose it or your project will be lost
          </span>
          <div className="shadow shadow-md text-sm text-center my-10 bg-orange-200 bg-opacity-70 p-1 rounded-s-lg self-center truncate">
            {apiKey}
          </div>
          <button
            className={`w-full self-end text-center my-1 text-2xl rounded-lg bg-blue-500 py-1 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
            onClick={() => {
              navigator.clipboard.writeText(apiKey);
            }}
          >
            COPY
          </button>
        </div>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm my-1">{errorMessage}</p>
      )}

      {!apiKey && (
        <button
          className={`w-full self-end text-center ${
            errorMessage ? "my-1" : "my-4"
          }  text-2xl rounded-lg bg-blue-500 py-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
          color="primary"
          onClick={createProject}
        >
          {isLoading ? (
            <div className="flex self-center justify-center">
              <Spinner height={32} />
            </div>
          ) : (
            <div>CREATE</div>
          )}
        </button>
      )}
    </div>
  );
}
