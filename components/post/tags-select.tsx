import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const allTags = [
  { name: "经济", vale: "经济" },

  { name: "明星八卦", vale: "明星八卦" },

  { name: "科技", vale: "科技" },

  { name: "职场", vale: "职场" },

  { name: "时事", vale: "时事" },

  { name: "体育", vale: "体育" },

  { name: "教育", vale: "教育" },

  { name: "娱乐", vale: "娱乐" },
];

interface SelectProps {
  selected: { name: string }[];
  onChange: (v: { name: string }[]) => void;
}
export default function Select({ selected, onChange }: SelectProps) {
  return (
    <div className="w-full">
      <Listbox value={selected} multiple onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button
            placeholder="请选择标签"
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate">
              {selected.map((i) => "#" + i.name).join(",")}
            </span>
            {selected.length === 0 && (
              <span className="block truncate text-gray-400">请选择标签</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {allTags.map((tag, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={tag}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        #{tag.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
