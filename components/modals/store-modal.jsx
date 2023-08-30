"use client";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modals";
import { Button } from "@/components/ui/button";
import useInput from "@/hooks/use-input";
import axios from "axios";
import { toast } from "react-hot-toast";

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();
  const validationRules = {
    name: [{ required: true }],
  };

  const { inputValues, inputErrors, handleInputChange, validateInputs } =
    useInput();

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = validateInputs(validationRules);
    if (!isValid) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/stores", inputValues);
      window.location.assign(`/${response.data.id}`);
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div>
          <form onSubmit={submitHandler} className="py-2">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="name"
                className={`${
                  inputErrors.name ? "text-red-500" : "text-black"
                } font-semibold`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter"
                onChange={(e) => handleInputChange("name", e.target.value)}
                value={inputValues.name || ""}
                disabled={loading}
                className="outline-0 border border-grey-500 rounded-md p-2 px-3"
              />
              {inputErrors.name ? (
                <div className="text-red-500 font-semibold text-sm">
                  Required
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                variant="outline"
                onClick={storeModal.onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
