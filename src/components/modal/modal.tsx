import { Fragment } from "react";

export function Modal({
  children,
  isOpen,
  onClose,
  title,
  onSave,
  showSaveButton,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSave?: () => void;
  showSaveButton?: boolean;
}) {
  const handleSave = () => {
    onSave && onSave();
    onClose();
  };
  return (
    <Fragment>
      {isOpen ? (
        <>
          {/*  This is the modal overlay */}
          <div className="fixed inset-0 z-10 bg-black bg-opacity-70 transition duration-300 ease-in-out backdrop-blur-md">
            {/* This is the modal */}
            <div className="fixed inset-0 z-20 flex items-center justify-center">
              <div className="bg-white w-10/12 md:w-1/2 lg:w-4/12  h-auto rounded-md shadow-lg ">
                {/* This is the modal header */}
                <div className="flex justify-between items-center p-4">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* This is the modal body */}
                <div className="p-4">{children}</div>
                {/* This is the modal footer */}
                <div className="flex justify-center items-center p-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {showSaveButton && (
                    <button
                      className="px-4 py-2 bg-orange-500 rounded-md text-white hover:bg-orange-600 ml-2"
                      onClick={() => handleSave()}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
}
