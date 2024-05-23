import Input from "@/components/home/account/Input";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";

type ProfileProps = {
  id?: string;
  isActive: boolean;
};

export default function Profile({ id, isActive }: ProfileProps) {
  return (
    isActive && (
      <div className="bg-black h-full rounded-xl p-8">
        <div className="grid lg:grid-cols-2 gap-10 grid-cols-1">
          <div className="col-span-1 space-y-6">
            <Input disabled name="Name" placeholder="Đặng Hoàng Nguyên">
              <FontAwesomeIcon className="size-4 text-white" icon={faUser} />
            </Input>
            <Input
              disabled
              name="Email"
              placeholder="hoangnguyen241003@gmail.com"
            >
              <FontAwesomeIcon
                className="size-4 text-white"
                icon={faEnvelope}
              />
            </Input>
          </div>
          <div className="col-span-1 space-y-6">
            <Input disabled name="Phone" placeholder="0941295687">
              <FontAwesomeIcon className="size-4 text-white" icon={faPhone} />
            </Input>
            <Input name="Birthday" placeholder="24/10/2003">
              <FontAwesomeIcon
                className="size-4 text-white"
                icon={faCakeCandles}
              />
            </Input>
            <div className="flex justify-end items-center">
              <button
                type="button"
                className="bg-purple-500 py-3 px-4 font-bold text-xl rounded-xl border-2 border-solid border-purple-600 duration-500 transition-all ease-in-out hover:bg-transparent hover:text-white "
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
