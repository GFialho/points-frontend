import * as ToastPrimitive from "@radix-ui/react-toast";
import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export type ToastType = "success" | "error" | "warning" | "info";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const toastStylesMap: { [key in ToastType]: string } = {
  info: "text-gray-500",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-yellow-500",
};

const Toast = ({
  title,
  message,
  type = "info",
  visibleFunction,
  visible,
}: {
  message?: string;
  title?: string;
  visible: boolean;
  visibleFunction?: (event: boolean) => void;
  type?: ToastType;
}) => {
  const getDefaultErrorMessage = (type: string | undefined) => {
    switch (type) {
      case "error":
        return "An Error ocurred. Please try again later";
      case "success":
        return "Success";
      case "warning":
        return "Warning";
      default:
        return "Warning";
    }
  };

  const displayMessage = message || getDefaultErrorMessage(type);

  return (
    <ToastPrimitive.Provider swipeDirection={"right"}>
      <ToastPrimitive.Root
        aria-label="Toast Dialog"
        open={visible}
        onOpenChange={visibleFunction}
        className={cn(
          "z-50 fixed top-2 inset-x-2 md:right-2 md:left-auto shadow-lg w-full md:2xl:w-[800px] rounded-lg bg-black bg-opacity-70",
          "dark:bg-gray2",
          "border border-gray6",
          "radix-state-open:animate-toast-slide-in-top md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x",
          "radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x",
          "radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y",
          "radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-5000 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          toastStylesMap[type]
        )}
      >
        <div className="flex items-center z-[100]">
          <div className="w-0 flex-1 flex items-center pl-5 py-4">
            <div className="w-full radix">
              {!title && (
                <ToastPrimitive.Title className="text-sm font-medium">
                  {title}
                </ToastPrimitive.Title>
              )}
              <ToastPrimitive.Description className="mt-1 text-sm ">
                {displayMessage}
              </ToastPrimitive.Description>
            </div>
          </div>
          <div className="flex pr-2">
            <ToastPrimitive.Close asChild>
              <button color="secondary">Dismiss</button>
            </ToastPrimitive.Close>
          </div>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default Toast;
